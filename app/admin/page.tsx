import { createAdminClient } from '@/lib/supabase/server'
import { StatsCard } from '@/components/admin/StatsCard'
import { Users, MessageSquare, CreditCard, MessageCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

async function getStats() {
  const supabase = await createAdminClient()
  if (!supabase) return null

  // Get total users
  const { count: totalUsers } = await supabase
    .from('user_subscriptions')
    .select('*', { count: 'exact', head: true })

  // Get total feedback
  const { count: totalFeedback } = await supabase
    .from('feedback')
    .select('*', { count: 'exact', head: true })

  // Get active subscriptions
  const { count: activeSubscriptions } = await supabase
    .from('user_subscriptions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  // Get conversations today
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { count: conversationsToday } = await supabase
    .from('ai_agent_conversations')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', today.toISOString())

  // Get recent feedback
  const { data: recentFeedback } = await supabase
    .from('feedback')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)

  // Get new feedback count
  const { count: newFeedback } = await supabase
    .from('feedback')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'new')

  return {
    totalUsers: totalUsers || 0,
    totalFeedback: totalFeedback || 0,
    activeSubscriptions: activeSubscriptions || 0,
    conversationsToday: conversationsToday || 0,
    recentFeedback: recentFeedback || [],
    newFeedback: newFeedback || 0,
  }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  if (!stats) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Failed to load dashboard data</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Monitor your platform's key metrics and activity</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          description="Registered users with subscriptions"
          icon={Users}
        />
        <StatsCard
          title="Feedback Submissions"
          value={stats.totalFeedback}
          description={`${stats.newFeedback} new feedback items`}
          icon={MessageSquare}
        />
        <StatsCard
          title="Active Subscriptions"
          value={stats.activeSubscriptions}
          description="Currently active paid subscriptions"
          icon={CreditCard}
        />
        <StatsCard
          title="Conversations Today"
          value={stats.conversationsToday}
          description="AI chat messages sent today"
          icon={MessageCircle}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.recentFeedback.length === 0 ? (
            <p className="text-sm text-muted-foreground">No feedback yet</p>
          ) : (
            <div className="space-y-4">
              {stats.recentFeedback.map((feedback: any) => (
                <div
                  key={feedback.id}
                  className="flex items-start justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {feedback.type.charAt(0).toUpperCase() + feedback.type.slice(1)} Feedback
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{feedback.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(feedback.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      feedback.status === 'new'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : feedback.status === 'in-progress'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}
                  >
                    {feedback.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
