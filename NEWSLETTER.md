# 📧 Automated Blog Newsletter System

## Overview

Automatically send beautiful newsletters to subscribers whenever you publish a new blog post. The system stores subscribers, creates professional HTML emails, and tracks engagement.

## Quick Start

### 1. Send Newsletter for New Blog Post

```bash
# Using npm script (recommended)
npm run send-newsletter your-blog-post-id
```

### 2. Available Blog Post IDs

Check `constants/blog.ts` for available blog post IDs.

## API Endpoints

### Subscribe to Newsletter

```
POST /api/newsletter
Content-Type: application/json

{
  "email": "user@example.com"
}
```

## Environment Variables

Required for email functionality:

```env
GMAIL_USER=steve.defendre12@gmail.com
GMAIL_APP_PASSWORD=your_app_password
NEXT_PUBLIC_SITE_URL=https://steve-os.vercel.app
```

---

**SteveOS Newsletter System**  
Built with Next.js, Nodemailer, and TypeScript
