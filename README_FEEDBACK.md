# Feedback System Documentation

## Overview

The feedback system allows users to submit feedback, bug reports, feature requests, and content feedback from anywhere on the Command website.

## Features

- **Multi-location Access**: Feedback buttons are available in:
  - Site header (desktop & mobile)
  - Blog post pages
  - Dashboard header
  - Floating button (bottom-right corner on all pages)

- **Feedback Types**:
  - General Feedback
  - Bug Report
  - Feature Request
  - Content Feedback

- **Rating System**: Optional 1-5 star rating
- **Optional Email**: Users can provide email for follow-up
- **Path Tracking**: Automatically tracks which page the feedback came from

- **Status Tracking**: Track feedback through lifecycle (new, in-progress, resolved)
- **Email Notifications**: Automatic notifications to admin when feedback is submitted
- **Response System**: Admins can respond to feedback with optional email notification to user
- **Admin Panel**: Comprehensive admin interface at `/admin/feedback` for managing all feedback

## Database Schema

The `site_feedback` table stores all feedback submissions:

```sql
site_feedback (
  id: bigint (primary key)
  created_at: timestamptz
  type: 'general' | 'bug' | 'feature' | 'content'
  message: text (required)
  rating: integer (1-5, optional)
  email: text (optional)
  path: text (optional - page URL)
  user_agent: text (optional - browser info)
  status: 'new' | 'in-progress' | 'resolved' (default: 'new')
  admin_response: text (optional)
  responded_at: timestamptz (optional)
)
```

### Database Migration

To add the new fields to your existing `site_feedback` table, run:

```sql
ALTER TABLE site_feedback
ADD COLUMN IF NOT EXISTS status text DEFAULT 'new' CHECK (status IN ('new', 'in-progress', 'resolved')),
ADD COLUMN IF NOT EXISTS admin_response text,
ADD COLUMN IF NOT EXISTS responded_at timestamptz;
```

## API Endpoints

### POST `/api/feedback`

Submit new feedback.

**Request Body:**

```json
{
  "type": "general" | "bug" | "feature" | "content",
  "message": "Feedback text (required)",
  "rating": 1-5 (optional),
  "email": "user@example.com" (optional),
  "path": "/blog/post-1" (optional, auto-detected),
  "userAgent": "browser info" (optional, auto-detected)
}
```

**Response:**

```json
{
  "message": "Feedback submitted successfully",
  "id": 123
}
```

### GET `/api/feedback`

Retrieve feedback (admin/service role only).

**Query Parameters:**

- `type`: Filter by feedback type
- `limit`: Number of results (default: 50)
- `offset`: Pagination offset (default: 0)
- `minRating`: Minimum rating filter

**Response:**

```json
{
  "feedback": [...],
  "total": 100,
  "limit": 50,
  "offset": 0
}
```

### PATCH `/api/feedback`

Update feedback status (admin/service role only).

**Request Body:**

```json
{
  "id": 123,
  "status": "new" | "in-progress" | "resolved"
}
```

**Response:**

```json
{
  "message": "Feedback status updated successfully",
  "feedback": { ... }
}
```

### POST `/api/feedback/respond`

Submit admin response to feedback with optional email notification.

**Request Body:**

```json
{
  "feedbackId": 123,
  "response": "Thank you for your feedback...",
  "sendEmail": true
}
```

**Response:**

```json
{
  "message": "Response saved successfully",
  "feedback": { ... },
  "emailSent": true,
  "emailNotSentReason": null
}
```

## Components

### FeedbackDialog

Main feedback dialog component.

```tsx
import { FeedbackDialog } from '@/components/FeedbackDialog'
;<FeedbackDialog path="/optional/path" trigger={<CustomButton />} />
```

### FeedbackFloatingButton

Floating feedback button (already included in root layout).

```tsx
import { FeedbackFloatingButton } from '@/components/FeedbackFloatingButton'
;<FeedbackFloatingButton path="/current/page" />
```

## Security

- **Row Level Security (RLS)** is enabled on `site_feedback` table
- Anyone (public) can insert feedback
- Only service role can view feedback (for admin/API access)
- Email addresses are optional and only used for follow-up

## Usage Examples

### Basic Usage

The feedback button is already integrated in:

- `components/SiteHeader.tsx` - Header navigation
- `app/blog/[id]/page.tsx` - Blog post pages
- `components/dashboard-header.tsx` - Dashboard header
- `app/layout.tsx` - Floating button (site-wide)

### Custom Integration

To add feedback to a custom page:

```tsx
'use client'

import { FeedbackDialog } from '@/components/FeedbackDialog'
import { Button } from '@/components/ui/button'

export default function MyPage() {
  return (
    <div>
      <FeedbackDialog path="/my-page" trigger={<Button variant="outline">Give Feedback</Button>} />
    </div>
  )
}
```

## Database Access

To view feedback in Supabase:

1. Log into Supabase Dashboard
2. Navigate to Table Editor
3. Select `site_feedback` table
4. View all submissions

Or use the API:

```bash
# Get all feedback (requires service role key)
curl https://your-site.com/api/feedback

# Get bug reports only
curl https://your-site.com/api/feedback?type=bug

# Get high-rated feedback
curl https://your-site.com/api/feedback?minRating=4
```

## Environment Variables

Ensure these are set in `.env.local`:

```env
# Required for database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Required for email notifications
GMAIL_USER=your_gmail_address
GMAIL_APP_PASSWORD=your_gmail_app_password

# Optional
NEXT_PUBLIC_SITE_URL=https://your-site.com
```

### Email Configuration

The feedback system uses Gmail for sending notifications. To set up:

1. Enable 2-factor authentication on your Gmail account
2. Generate an app-specific password: https://myaccount.google.com/apppasswords
3. Add the credentials to your `.env.local` file

**Note:** Email notifications are optional. If `GMAIL_APP_PASSWORD` is not set, feedback will still be saved but no emails will be sent.

## Admin Panel

Access the feedback admin panel at `/admin/feedback` to:

- View all feedback submissions
- Filter by type (general, bug, feature, content)
- Filter by status (new, in-progress, resolved)
- Update feedback status
- Respond to feedback with optional email notification
- Track response history

### Admin Panel Features

- **Real-time filtering**: Filter by type and status with instant updates
- **Tabbed interface**: Separate tabs for different status categories
- **Inline responses**: Respond to feedback directly in the panel
- **Email notifications**: Automatically notify users when you respond (if they provided email)
- **Status tracking**: Mark feedback as new, in-progress, or resolved
- **Response history**: View previous responses and when they were sent

## Email Notifications

The system automatically sends email notifications:

### Admin Notifications

When a user submits feedback, the admin receives an email with:

- Feedback type and rating
- Full message content
- User email (if provided)
- Page where feedback was submitted
- Direct link to respond

### User Notifications

When an admin responds to feedback, the user receives an email with:

- Their original feedback message
- Admin's response
- Link to the site
- Option to reply for follow-up questions

## Future Enhancements

Potential improvements:

- Feedback analytics dashboard (rating trends, popular pages)
- Auto-tagging based on content analysis
- Integration with issue tracking systems (Linear, Jira, etc.)
- Bulk operations (mark multiple as resolved, export to CSV)
- Email templates customization
- Slack/Discord webhook notifications
