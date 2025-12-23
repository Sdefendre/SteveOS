# Feedback System Enhancement Guide

This guide explains the new features added to the feedback system and how to set them up.

## What's New

The feedback system has been enhanced with:

1. **Status Tracking**: Track feedback through its lifecycle (new → in-progress → resolved)
2. **Email Notifications**: Automatic email notifications to admin when feedback is submitted
3. **Response System**: Admins can respond to feedback with optional email notification to users
4. **Admin Panel**: Comprehensive admin interface for managing all feedback

## Setup Instructions

### 1. Database Migration

Run the SQL migration to add new columns to the `site_feedback` table:

```sql
-- Option A: Using Supabase CLI
supabase migration up

-- Option B: Run directly in Supabase SQL Editor
-- Copy and paste the contents of: supabase/migrations/add_feedback_status_response.sql
```

Or manually:

```sql
ALTER TABLE site_feedback
ADD COLUMN IF NOT EXISTS status text DEFAULT 'new' CHECK (status IN ('new', 'in-progress', 'resolved')),
ADD COLUMN IF NOT EXISTS admin_response text,
ADD COLUMN IF NOT EXISTS responded_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_site_feedback_status ON site_feedback(status);
CREATE INDEX IF NOT EXISTS idx_site_feedback_responded_at ON site_feedback(responded_at);

UPDATE site_feedback SET status = 'new' WHERE status IS NULL;
```

### 2. Environment Variables

Add email configuration to your `.env.local`:

```env
# Gmail configuration for email notifications
GMAIL_USER=your_gmail_address@gmail.com
GMAIL_APP_PASSWORD=your_16_character_app_password
```

To get a Gmail app password:

1. Go to your Google Account settings
2. Enable 2-factor authentication (required)
3. Visit https://myaccount.google.com/apppasswords
4. Generate a new app password for "Mail"
5. Copy the 16-character password (no spaces)
6. Add to `.env.local`

**Note**: Email is optional. The system works without it, but notifications won't be sent.

### 3. Update TypeScript Types

The database types have been updated in `/lib/types/database.ts` to include:

- `status: 'new' | 'in-progress' | 'resolved' | null`
- `admin_response: string | null`
- `responded_at: string | null`

No action needed - types are already updated.

### 4. Access the Admin Panel

Navigate to `/admin/feedback` to access the new admin panel.

**Security Note**: Currently, the admin panel is publicly accessible. You should add authentication before deploying to production. Recommended options:

- Add Supabase Auth with admin role check
- Use Next.js middleware to protect `/admin/*` routes
- Implement IP whitelisting for admin access

## New Features Overview

### Email Notifications

#### When Feedback is Submitted

Admins automatically receive an email containing:

- Feedback type and rating
- Full message
- User email (if provided)
- Page URL where feedback was submitted
- Timestamp

The email is sent asynchronously, so it doesn't slow down the feedback submission.

#### When Admin Responds

Users receive an email containing:

- Their original feedback
- Admin's response
- Links back to the site
- Option to reply for follow-up

### Admin Panel Features

Located at `/admin/feedback`, the admin panel provides:

#### Filtering & Organization

- Filter by type (general, bug, feature, content)
- Tabbed view by status (all, new, in-progress, resolved)
- Real-time filtering with instant updates
- Refresh button to manually reload data

#### Feedback Management

- Expand/collapse individual feedback items
- Update status with dropdown select
- View all metadata (date, page, email, rating)
- See response history

#### Response System

- Inline response editor
- "Send & Email" button (if user provided email)
- "Save Only" button (save without emailing)
- Warning when no email available
- Track when responses were sent

### API Endpoints

Three new/updated endpoints:

#### POST `/api/feedback`

Now includes:

- Automatic status set to "new"
- Email notification to admin

#### PATCH `/api/feedback`

Update feedback status:

```javascript
await fetch('/api/feedback', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 123,
    status: 'in-progress',
  }),
})
```

#### POST `/api/feedback/respond`

Submit admin response:

```javascript
await fetch('/api/feedback/respond', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    feedbackId: 123,
    response: 'Thank you for your feedback...',
    sendEmail: true,
  }),
})
```

## Email Templates

The system includes professionally designed HTML email templates:

### Admin Notification Template

- Dark gradient background matching Command branding
- Color-coded type badges (blue/red/green/purple)
- Star rating display
- Metadata table with all details
- Direct "Reply to User" button (if email provided)

### User Response Template

- Branded header with Command logo
- Original feedback quote
- Highlighted admin response
- Call-to-action to reply
- Footer with site link

Both templates are mobile-responsive and work across all major email clients.

## File Structure

New files created:

```
lib/
  feedback-email.ts                    # Email utilities and templates

app/
  api/
    feedback/
      route.ts                         # Updated with status & notifications
      respond/
        route.ts                       # New: Admin response endpoint

components/
  feedback/
    FeedbackAdminPanel.tsx             # New: Admin panel component

app/
  admin/
    feedback/
      page.tsx                         # Updated: Uses new admin panel

supabase/
  migrations/
    add_feedback_status_response.sql   # Database migration

FEEDBACK_ENHANCEMENT_GUIDE.md          # This file
```

## Testing

### Test Feedback Submission

1. Submit feedback via any feedback button on the site
2. Check that admin receives email notification (if configured)
3. Verify feedback appears in admin panel with "new" status

### Test Admin Response

1. Go to `/admin/feedback`
2. Expand a feedback item
3. Write a response
4. Click "Send Response & Email User" (if email provided)
5. Verify user receives email
6. Check that feedback status updates to "resolved"

### Test Status Updates

1. In admin panel, change feedback status
2. Verify status updates in database
3. Check that filtering by status works correctly

## Troubleshooting

### Emails Not Sending

**Problem**: Admin doesn't receive notification emails

**Solutions**:

- Check `GMAIL_APP_PASSWORD` is set correctly
- Verify Gmail 2FA is enabled
- Check console logs for error messages
- Ensure app password has no spaces
- Try generating a new app password

### Admin Panel Not Loading

**Problem**: Feedback list doesn't load

**Solutions**:

- Check Supabase connection
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set
- Check browser console for errors
- Ensure table migration ran successfully

### Status Not Updating

**Problem**: Status changes don't save

**Solutions**:

- Verify migration added `status` column
- Check RLS policies on `site_feedback` table
- Ensure service role key is used for updates

## Security Considerations

### Protect Admin Routes

Before production, add authentication:

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add your auth check here
  const isAdmin = checkAdminAuth(request)

  if (!isAdmin && request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: '/admin/:path*',
}
```

### Rate Limiting

Consider adding rate limiting to feedback submission to prevent spam.

### Email Security

- Never expose `GMAIL_APP_PASSWORD` in client-side code
- App passwords are server-side only
- Consider using a dedicated email service account

## Future Enhancements

Potential improvements to consider:

1. **Analytics Dashboard**
   - Feedback trends over time
   - Most common feedback types
   - Average response time
   - Rating distributions

2. **Bulk Operations**
   - Mark multiple items as resolved
   - Export to CSV
   - Batch status updates

3. **Integrations**
   - Linear/Jira issue creation
   - Slack notifications
   - Discord webhooks

4. **Advanced Filtering**
   - Search by message content
   - Filter by date range
   - Filter by rating
   - Sort by various criteria

5. **Response Templates**
   - Pre-defined response templates
   - Variables/placeholders
   - Template library

## Support

For questions or issues:

- Check README_FEEDBACK.md for API documentation
- Review DATABASE_SETUP.md for table structure
- Check console logs for error messages
- Verify environment variables are set correctly
