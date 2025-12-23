'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Feedback {
  id: number
  created_at: string | null
  type: 'general' | 'bug' | 'feature' | 'content' | null
  message: string
  rating: number | null
  email: string | null
  path: string | null
  user_agent: string | null
  status: 'new' | 'in-progress' | 'resolved' | null
  admin_response: string | null
  responded_at: string | null
}

export function FeedbackAdminPanel() {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [responseText, setResponseText] = useState<{ [key: number]: string }>({})
  const [sendingResponse, setSendingResponse] = useState<number | null>(null)

  useEffect(() => {
    fetchFeedback()
  }, [selectedType, selectedStatus])

  const fetchFeedback = async () => {
    try {
      setLoading(true)
      setError(null)

      const params = new URLSearchParams()
      if (selectedType !== 'all') {
        params.append('type', selectedType)
      }
      params.append('limit', '100')

      const response = await fetch(`/api/feedback?${params.toString()}`)

      if (!response.ok) {
        throw new Error('Failed to fetch feedback')
      }

      const data = await response.json()
      let feedback = data.feedback || []

      // Filter by status client-side
      if (selectedStatus !== 'all') {
        feedback = feedback.filter((f: Feedback) => (f.status || 'new') === selectedStatus)
      }

      setFeedbackList(feedback)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load feedback')
      console.error('Feedback fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: number, status: string) => {
    try {
      const response = await fetch('/api/feedback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      // Refresh feedback list
      await fetchFeedback()
    } catch (err) {
      console.error('Status update error:', err)
      alert('Failed to update status')
    }
  }

  const submitResponse = async (feedbackId: number, sendEmail: boolean = true) => {
    const response = responseText[feedbackId]?.trim()

    if (!response) {
      alert('Please enter a response message')
      return
    }

    try {
      setSendingResponse(feedbackId)

      const res = await fetch('/api/feedback/respond', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedbackId, response, sendEmail }),
      })

      if (!res.ok) {
        throw new Error('Failed to send response')
      }

      const data = await res.json()

      // Clear response text and collapse card
      setResponseText((prev) => ({ ...prev, [feedbackId]: '' }))
      setExpandedId(null)

      // Show success message
      alert(
        data.emailSent
          ? 'Response sent and user notified via email!'
          : `Response saved. ${data.emailNotSentReason || 'Email not sent.'}`
      )

      // Refresh feedback list
      await fetchFeedback()
    } catch (err) {
      console.error('Response submission error:', err)
      alert('Failed to submit response')
    } finally {
      setSendingResponse(null)
    }
  }

  const getTypeColor = (type: string) => {
    const colors = {
      general: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      bug: 'bg-red-500/10 text-red-500 border-red-500/20',
      feature: 'bg-green-500/10 text-green-500 border-green-500/20',
      content: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    }
    return colors[type as keyof typeof colors] || colors.general
  }

  const getStatusColor = (status: string) => {
    const colors = {
      new: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      'in-progress': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      resolved: 'bg-green-500/10 text-green-500 border-green-500/20',
    }
    return colors[status as keyof typeof colors] || colors.new
  }

  const filteredByStatus = (status: string) => {
    if (status === 'all') return feedbackList
    return feedbackList.filter((f) => (f.status || 'new') === status)
  }

  const renderFeedbackCard = (feedback: Feedback) => {
    const isExpanded = expandedId === feedback.id

    return (
      <Card
        key={feedback.id}
        className="border border-border/50 bg-card/50 backdrop-blur-sm p-6 hover:border-primary/50 transition-colors"
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getTypeColor(feedback.type || 'general')}`}
                >
                  {(feedback.type || 'general').toUpperCase()}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(feedback.status || 'new')}`}
                >
                  {(feedback.status || 'new').toUpperCase()}
                </span>
                {feedback.rating && (
                  <span className="text-sm text-muted-foreground">
                    {'⭐'.repeat(feedback.rating)}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                ID: #{feedback.id} • {new Date(feedback.created_at || '').toLocaleString()}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setExpandedId(isExpanded ? null : feedback.id)}
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>

          {/* Message */}
          <div className="bg-background/50 border border-border/30 rounded-lg p-4">
            <p className="text-sm text-foreground whitespace-pre-wrap">{feedback.message}</p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Page:</span>
              <span className="ml-2 text-foreground">{feedback.path || 'Unknown'}</span>
            </div>
            {feedback.email && (
              <div>
                <span className="text-muted-foreground">Email:</span>
                <a href={`mailto:${feedback.email}`} className="ml-2 text-primary hover:underline">
                  {feedback.email}
                </a>
              </div>
            )}
          </div>

          {/* Expanded Section */}
          {isExpanded && (
            <div className="space-y-4 pt-4 border-t border-border/50">
              {/* Status Update */}
              <div>
                <label className="text-sm font-medium mb-2 block">Update Status:</label>
                <Select
                  value={feedback.status || 'new'}
                  onValueChange={(value) => updateStatus(feedback.id, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Previous Response */}
              {feedback.admin_response && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Previous Response:</label>
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                      {feedback.admin_response}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Sent on {new Date(feedback.responded_at || '').toLocaleString()}
                    </p>
                  </div>
                </div>
              )}

              {/* Response Form */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {feedback.admin_response ? 'Send New Response:' : 'Send Response:'}
                </label>
                <textarea
                  className="w-full min-h-[120px] p-3 rounded-lg border border-border bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Type your response here..."
                  value={responseText[feedback.id] || ''}
                  onChange={(e) =>
                    setResponseText((prev) => ({ ...prev, [feedback.id]: e.target.value }))
                  }
                />
                <div className="flex gap-2 mt-2">
                  <Button
                    onClick={() => submitResponse(feedback.id, true)}
                    disabled={!responseText[feedback.id]?.trim() || sendingResponse === feedback.id}
                    className="flex-1"
                  >
                    {sendingResponse === feedback.id
                      ? 'Sending...'
                      : feedback.email
                        ? 'Send Response & Email User'
                        : 'Save Response (No Email)'}
                  </Button>
                  {feedback.email && (
                    <Button
                      variant="outline"
                      onClick={() => submitResponse(feedback.id, false)}
                      disabled={
                        !responseText[feedback.id]?.trim() || sendingResponse === feedback.id
                      }
                    >
                      Save Only
                    </Button>
                  )}
                </div>
                {!feedback.email && (
                  <p className="text-xs text-yellow-500 mt-2">
                    ⚠️ No email provided by user - response will be saved but not emailed
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-muted-foreground">Loading feedback...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 gap-4">
        <div className="text-red-500">Error: {error}</div>
        <Button onClick={fetchFeedback}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Feedback Management</h2>
          <p className="text-muted-foreground">
            Manage and respond to user feedback ({feedbackList.length} total)
          </p>
        </div>
        <Button onClick={fetchFeedback} variant="outline">
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-sm font-medium mb-2 block">Filter by Type:</label>
          <Select value={selectedType} onValueChange={setSelectedType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="bug">Bug Report</SelectItem>
              <SelectItem value="feature">Feature Request</SelectItem>
              <SelectItem value="content">Content Feedback</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs by Status */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({feedbackList.length})</TabsTrigger>
          <TabsTrigger value="new">New ({filteredByStatus('new').length})</TabsTrigger>
          <TabsTrigger value="in-progress">
            In Progress ({filteredByStatus('in-progress').length})
          </TabsTrigger>
          <TabsTrigger value="resolved">
            Resolved ({filteredByStatus('resolved').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {feedbackList.length === 0 ? (
            <Card className="p-12 text-center text-muted-foreground">No feedback found</Card>
          ) : (
            feedbackList.map(renderFeedbackCard)
          )}
        </TabsContent>

        <TabsContent value="new" className="space-y-4 mt-6">
          {filteredByStatus('new').length === 0 ? (
            <Card className="p-12 text-center text-muted-foreground">No new feedback</Card>
          ) : (
            filteredByStatus('new').map(renderFeedbackCard)
          )}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4 mt-6">
          {filteredByStatus('in-progress').length === 0 ? (
            <Card className="p-12 text-center text-muted-foreground">No feedback in progress</Card>
          ) : (
            filteredByStatus('in-progress').map(renderFeedbackCard)
          )}
        </TabsContent>

        <TabsContent value="resolved" className="space-y-4 mt-6">
          {filteredByStatus('resolved').length === 0 ? (
            <Card className="p-12 text-center text-muted-foreground">No resolved feedback</Card>
          ) : (
            filteredByStatus('resolved').map(renderFeedbackCard)
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
