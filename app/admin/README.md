# Admin Dashboard

Complete admin dashboard for managing feedback, users, and subscriptions.

## Features

### Dashboard Overview (`/admin`)

- Total users count
- Feedback submissions count with new items indicator
- Active subscriptions count
- Conversations today count
- Recent feedback preview

### Feedback Management (`/admin/feedback`)

- View all user feedback submissions
- Filter by status (new, in-progress, resolved, closed)
- Filter by type (bug, feature, general, complaint)
- Update feedback status
- View feedback details including user email, priority, and message

### User Management (`/admin/users`)

- View all registered users
- Search users by email or ID
- See subscription tier for each user
- View conversation counts per user
- Track last active date
- View join date and account status

### Subscriptions Management (`/admin/subscriptions`)

- View all user subscriptions
- Filter by status (active, cancelled, expired, past_due)
- Filter by tier (free, premium, lifetime)
- See subscription statistics
- View billing periods and auto-renew status
- Track Stripe customer and subscription IDs

## Access Control

Admin access is controlled by email whitelist in `/lib/admin-auth.ts`.

To add admin users, edit the `ADMIN_EMAILS` array:

```typescript
const ADMIN_EMAILS = [
  'stevedefendre@gmail.com',
  // Add more admin emails here
]
```

Non-admin users are automatically redirected to the home page.

## Components

### Reusable Components (`/components/admin/`)

- `AdminSidebar` - Navigation sidebar with logout button
- `StatsCard` - Dashboard statistics card with icon and trend
- `PageHeader` - Consistent page header with title and actions
- `EmptyState` - Empty state placeholder with icon
- `LoadingState` - Skeleton loading states for tables and stats

## Database Tables

### Required Tables

The admin dashboard requires these Supabase tables:

1. **feedback** - User feedback and bug reports
   - id, user_id, user_email, type, message, status, priority, admin_notes
   - Created by migration: `005_feedback_table.sql`

2. **user_subscriptions** - User subscription information
   - id, user_id, subscription_type, status, stripe data, billing periods
   - Created by migration: `001_veteran_ed_tech_schema.sql`

3. **ai_agent_conversations** - Chat conversation history
   - id, user_id, conversation_id, role, message, metadata
   - Created by migration: `001_veteran_ed_tech_schema.sql`

4. **ai_agent_rate_limits** - Rate limiting data
   - id, user_id, date, query_count, tier
   - Created by migration: `001_veteran_ed_tech_schema.sql`

## Theme

The admin dashboard uses the military olive/khaki theme defined in `app/globals.css`:

- Primary colors: Olive green shades
- Secondary colors: Khaki/tan
- Accent colors: Military brown
- Fully supports light and dark modes

## Future Enhancements

Potential improvements:

- Export data to CSV
- Advanced analytics and charts
- User email notifications
- Bulk actions for feedback
- Custom date range filters
- Admin activity logs
- Feedback response system
- User impersonation for debugging
