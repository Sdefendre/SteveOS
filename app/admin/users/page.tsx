'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'

interface UserData {
  id: string
  user_id: string
  created_at: string
  subscription_type: string
  subscription_status: string
  conversation_count: number
  last_active: string | null
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const supabase = createClient()

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    setLoading(true)

    // Get all subscriptions with user data
    const { data: subscriptions, error: subError } = await supabase
      .from('user_subscriptions')
      .select('id, user_id, subscription_type, status, created_at')
      .order('created_at', { ascending: false })

    if (subError) {
      console.error('Error loading subscriptions:', subError)
      setLoading(false)
      return
    }

    // Type the subscription data
    type SubscriptionRow = {
      id: number
      user_id: string
      subscription_type: string
      status: string
      created_at: string | null
    }

    // Get conversation counts for each user
    const userDataPromises = ((subscriptions || []) as SubscriptionRow[]).map(async (sub) => {
      // Get conversation count
      const { count } = await supabase
        .from('ai_agent_conversations')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', sub.user_id)

      // Get last activity
      const { data: lastActivity } = await supabase
        .from('ai_agent_conversations')
        .select('created_at')
        .eq('user_id', sub.user_id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      return {
        id: String(sub.id),
        user_id: sub.user_id,
        created_at: sub.created_at || '',
        subscription_type: sub.subscription_type,
        subscription_status: sub.status,
        conversation_count: count || 0,
        last_active: (lastActivity as { created_at: string } | null)?.created_at || null,
      }
    })

    const userData = await Promise.all(userDataPromises)
    setUsers(userData)
    setLoading(false)
  }

  const filteredUsers = users.filter((user) =>
    user.user_id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getSubscriptionBadge = (type: string) => {
    switch (type) {
      case 'lifetime':
        return <Badge variant="default">Lifetime</Badge>
      case 'premium':
        return <Badge variant="secondary">Premium</Badge>
      default:
        return <Badge variant="outline">Free</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>
      case 'expired':
        return <Badge variant="outline">Expired</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">View and manage registered users</p>
        </div>
        <Button onClick={loadUsers} variant="outline">
          Refresh
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Search by user ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : filteredUsers.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No users found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Subscription Tier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Conversations</TableHead>
                  <TableHead>Last Active</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium font-mono text-xs">
                      {user.user_id.slice(0, 8)}...
                    </TableCell>
                    <TableCell>{getSubscriptionBadge(user.subscription_type)}</TableCell>
                    <TableCell>{getStatusBadge(user.subscription_status)}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell>{user.conversation_count}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {user.last_active ? new Date(user.last_active).toLocaleDateString() : 'Never'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
