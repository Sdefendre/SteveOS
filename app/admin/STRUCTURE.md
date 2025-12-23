# Admin Dashboard Structure

```
app/admin/
├── layout.tsx                 # Main layout with auth check & sidebar
├── page.tsx                   # Dashboard overview
├── README.md                  # Documentation
├── STRUCTURE.md              # This file
├── feedback/
│   └── page.tsx              # Feedback management page
├── users/
│   └── page.tsx              # User management page
└── subscriptions/
    └── page.tsx              # Subscription management page

components/admin/
├── index.ts                  # Component exports
├── AdminSidebar.tsx          # Navigation sidebar
├── StatsCard.tsx             # Statistics card
├── PageHeader.tsx            # Page header component
├── EmptyState.tsx            # Empty state placeholder
└── LoadingState.tsx          # Loading skeletons

lib/
└── admin-auth.ts             # Admin authentication helper

app/api/admin/
└── feedback/
    └── route.ts              # Feedback update API endpoint

supabase/migrations/
└── 005_feedback_table.sql    # Feedback table schema
```

## Component Hierarchy

```
AdminLayout
├── AdminSidebar
│   ├── Navigation Links
│   └── Sign Out Button
└── Main Content Area
    └── Page Components
        ├── Dashboard (page.tsx)
        │   ├── StatsCard × 4
        │   └── Recent Feedback Card
        ├── Feedback (feedback/page.tsx)
        │   ├── PageHeader
        │   ├── Filters Card
        │   └── Data Table
        ├── Users (users/page.tsx)
        │   ├── PageHeader
        │   ├── Search Card
        │   └── Data Table
        └── Subscriptions (subscriptions/page.tsx)
            ├── PageHeader
            ├── Stats Cards × 5
            ├── Filters Card
            └── Data Table
```

## Data Flow

```
User Request
    ↓
Admin Layout (auth check)
    ↓
isAdmin() from admin-auth.ts
    ↓
Check email against ADMIN_EMAILS
    ↓
If authorized: Render page
If not: Redirect to /
    ↓
Page Component (client or server)
    ↓
Supabase Query (via createClient or createAdminClient)
    ↓
Render UI with data
```

## Color Coding

### Status Badges

- **New**: Blue (default)
- **In Progress**: Yellow/Orange (secondary)
- **Resolved**: Green (outline)
- **Closed**: Gray (outline)

### Type Badges

- **Bug**: Red
- **Feature**: Blue
- **General**: Gray
- **Complaint**: Orange

### Subscription Tiers

- **Lifetime**: Primary (olive green)
- **Premium**: Secondary (khaki)
- **Free**: Outline (gray)

### Subscription Status

- **Active**: Green (default)
- **Cancelled**: Red (destructive)
- **Expired**: Gray (outline)
- **Past Due**: Orange (destructive variant)
