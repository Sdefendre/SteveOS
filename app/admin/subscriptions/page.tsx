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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

interface Subscription {
  id: string
  user_id: string
  subscription_type: string
  status: string
  stripe_subscription_id: string | null
  stripe_customer_id: string | null
  starts_at: string | null
  expires_at: string | null
  created_at: string
  updated_at: string
}

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [tierFilter, setTierFilter] = useState<string>('all')
  const supabase = createClient()

  useEffect(() => {
    loadSubscriptions()
  }, [statusFilter, tierFilter])

  async function loadSubscriptions() {
    setLoading(true)
    let query = supabase
      .from('user_subscriptions')
      .select('*')
      .order('created_at', { ascending: false })

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter)
    }

    if (tierFilter !== 'all') {
      query = query.eq('subscription_type', tierFilter)
    }

    const { data: subs, error } = await query

    if (error) {
      console.error('Error loading subscriptions:', error)
      setLoading(false)
      return
    }

    setSubscriptions((subs || []) as Subscription[])
    setLoading(false)
  }

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'lifetime':
        return (
          <Badge variant="default" className="bg-primary">
            Lifetime
          </Badge>
        )
      case 'premium':
        return <Badge variant="secondary">Premium</Badge>
      case 'free':
        return <Badge variant="outline">Free</Badge>
      default:
        return <Badge variant="outline">{tier}</Badge>
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
      case 'past_due':
        return (
          <Badge variant="destructive" className="bg-orange-500">
            Past Due
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const stats = {
    total: subscriptions.length,
    active: subscriptions.filter((s) => s.status === 'active').length,
    premium: subscriptions.filter((s) => s.subscription_type === 'premium' && s.status === 'active')
      .length,
    lifetime: subscriptions.filter(
      (s) => s.subscription_type === 'lifetime' && s.status === 'active'
    ).length,
    free: subscriptions.filter((s) => s.subscription_type === 'free' && s.status === 'active')
      .length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Subscription Management</h1>
          <p className="text-muted-foreground">View and manage user subscriptions</p>
        </div>
        <Button onClick={loadSubscriptions} variant="outline">
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Premium</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.premium}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Lifetime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.lifetime}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Free</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.free}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
                <SelectItem value="past_due">Past Due</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Tier</label>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="free">Free</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="lifetime">Lifetime</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscriptions ({subscriptions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : subscriptions.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No subscriptions found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Starts At</TableHead>
                  <TableHead>Expires At</TableHead>
                  <TableHead>Stripe ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subscriptions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium font-mono text-xs">
                      {sub.user_id.slice(0, 8)}...
                    </TableCell>
                    <TableCell>{getTierBadge(sub.subscription_type)}</TableCell>
                    <TableCell>{getStatusBadge(sub.status)}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      {new Date(sub.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {sub.starts_at ? new Date(sub.starts_at).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      {sub.expires_at ? new Date(sub.expires_at).toLocaleDateString() : 'Never'}
                    </TableCell>
                    <TableCell>
                      {sub.stripe_subscription_id ? (
                        <span className="font-mono text-xs">
                          {sub.stripe_subscription_id.slice(0, 12)}...
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-sm">N/A</span>
                      )}
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
