import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { getActiveSubscribers } from '@/lib/subscribers'
import { BLOG_POSTS } from '@/constants/blog'

// Type for blog post based on BLOG_POSTS structure
type BlogPost = {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  tags: string[]
}

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'steve.defendre12@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 10000,
})

export async function POST(request: NextRequest) {
  try {
    const { blogPostId, secretKey } = await request.json()

    // Simple security check (in production, use proper authentication)
    if (!process.env.NEWSLETTER_SECRET_KEY) {
      return NextResponse.json({ error: 'Newsletter secret key not configured' }, { status: 500 })
    }

    if (secretKey !== process.env.NEWSLETTER_SECRET_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Validate blog post ID
    if (!blogPostId) {
      return NextResponse.json({ error: 'Blog post ID is required' }, { status: 400 })
    }

    // Find the blog post
    const blogPost = BLOG_POSTS.find((post) => post.id === blogPostId)
    if (!blogPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }

    // Check if email configuration is available
    if (!process.env.GMAIL_APP_PASSWORD) {
      console.log(`Blog newsletter request (no email config): ${blogPostId}`)
      return NextResponse.json(
        {
          message: 'Newsletter would be sent (email not configured)',
          blogPost: blogPost.title,
          subscriberCount: 0,
        },
        { status: 200 }
      )
    }

    // Get active subscribers
    const subscribers = getActiveSubscribers()

    if (subscribers.length === 0) {
      return NextResponse.json(
        {
          message: 'No active subscribers found',
          blogPost: blogPost.title,
        },
        { status: 200 }
      )
    }

    console.log(
      `Sending blog newsletter for "${blogPost.title}" to ${subscribers.length} subscribers`
    )

    // Create newsletter HTML
    const newsletterHtml = createBlogNewsletterHtml(blogPost)
    const newsletterText = createBlogNewsletterText(blogPost)

    // Send emails to all subscribers
    const emailPromises = subscribers.map((subscriber) =>
      transporter.sendMail({
        from: `"SteveOS" <${process.env.GMAIL_USER || 'steve.defendre12@gmail.com'}>`,
        to: subscriber.email,
        subject: `📚 New Blog Post: ${blogPost.title}`,
        text: newsletterText,
        html: newsletterHtml,
      })
    )

    await Promise.all(emailPromises)

    // Send notification to admin
    await transporter.sendMail({
      from: `"Newsletter Bot" <${process.env.GMAIL_USER || 'steve.defendre12@gmail.com'}>`,
      to: process.env.GMAIL_USER || 'steve.defendre12@gmail.com',
      subject: `Blog Newsletter Sent: ${blogPost.title}`,
      text: `Blog newsletter sent successfully!\n\nPost: ${blogPost.title}\nSubscribers: ${subscribers.length}\nSent at: ${new Date().toISOString()}`,
      html: `
        <h2>Blog Newsletter Sent Successfully</h2>
        <p><strong>Post:</strong> ${blogPost.title}</p>
        <p><strong>Subscribers:</strong> ${subscribers.length}</p>
        <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
      `,
    })

    console.log(`Blog newsletter sent successfully to ${subscribers.length} subscribers`)

    return NextResponse.json(
      {
        message: 'Blog newsletter sent successfully!',
        blogPost: blogPost.title,
        subscriberCount: subscribers.length,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Blog newsletter error:', error)
    return NextResponse.json(
      { error: 'Failed to send blog newsletter. Please try again later.' },
      { status: 500 }
    )
  }
}

function createBlogNewsletterHtml(blogPost: BlogPost) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://steve-os.vercel.app'
  const postUrl = `${siteUrl}/blog/${blogPost.id}`

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Blog Post: ${blogPost.title}</title>
    </head>
    <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #000000 0%, #0c1e3d 50%, #000000 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 24px; overflow: hidden;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%); padding: 40px 30px; text-align: center; position: relative;">
          <!-- Floating dots -->
          <div style="position: absolute; top: 20px; right: 20px; width: 8px; height: 8px; background: rgba(59, 130, 246, 0.4); border-radius: 50%;"></div>
          <div style="position: absolute; top: 35px; right: 35px; width: 4px; height: 4px; background: rgba(147, 51, 234, 0.4); border-radius: 50%;"></div>
          
          <!-- Logo -->
          <div style="display: inline-block; background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%); backdrop-filter: blur(10px); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 50%; padding: 16px; margin-bottom: 20px;">
            <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #3b82f6 0%, #9333ea 100%); border-radius: 4px; display: inline-block; position: relative;">
              <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-weight: bold; font-size: 18px;">📚</div>
            </div>
          </div>
          
          <h1 style="background: linear-gradient(135deg, #ffffff 0%, #3b82f6 50%, #ffffff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0; font-size: 28px; font-weight: 700; line-height: 1.2;">
            New Blog Post Published!
          </h1>
          <p style="color: #9ca3af; margin: 15px 0 0 0; font-size: 16px;">Fresh insights from SteveOS</p>
        </div>
        
        <!-- Main content -->
        <div style="padding: 40px 30px;">
          <!-- Blog post preview -->
          <div style="background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 30px; margin-bottom: 30px;">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px; flex-wrap: wrap;">
              ${blogPost.tags
                .map(
                  (tag) => `
                <span style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2)); border: 1px solid rgba(59, 130, 246, 0.3); color: #60a5fa; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 500;">${tag}</span>
              `
                )
                .join('')}
            </div>
            
            <h2 style="color: #ffffff; margin: 0 0 15px 0; font-size: 24px; font-weight: 600; line-height: 1.3;">
              ${blogPost.title}
            </h2>
            
            <p style="color: #d1d5db; line-height: 1.7; margin: 0 0 20px 0; font-size: 16px;">
              ${blogPost.excerpt}
            </p>
            
            <div style="display: flex; align-items: center; gap: 15px; color: #9ca3af; font-size: 14px; margin-bottom: 25px;">
              <span>📅 ${new Date(blogPost.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}</span>
              <span>⏱️ ${blogPost.readTime}</span>
              <span>👤 ${blogPost.author}</span>
            </div>
          </div>
          
          <!-- CTA Button -->
          <div style="text-align: center; margin: 40px 0;">
            <div style="display: inline-block; position: relative;">
              <div style="position: absolute; inset: 0; background: linear-gradient(135deg, #3b82f6, #9333ea); border-radius: 50px; filter: blur(8px); opacity: 0.6;"></div>
              <a href="${postUrl}" 
                 style="position: relative; background: linear-gradient(135deg, #3b82f6, #9333ea); color: #fff; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);">
                Read Full Article →
              </a>
            </div>
          </div>
          
          <!-- Additional blog promotion -->
          <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%); border: 1px solid rgba(59, 130, 246, 0.1); border-radius: 16px; padding: 25px; text-align: center;">
            <p style="color: #d1d5db; margin: 0 0 15px 0; font-size: 14px;">
              💡 Enjoying our content? 
            </p>
            <a href="${siteUrl}/blog" style="color: #60a5fa; text-decoration: none; font-weight: 500;">
              Browse all blog posts →
            </a>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="border-top: 1px solid rgba(55, 65, 81, 0.5); padding: 30px; text-align: center; background: rgba(0, 0, 0, 0.3);">
          <div style="margin-bottom: 15px;">
            <a href="mailto:${process.env.GMAIL_USER || 'steve.defendre12@gmail.com'}?subject=Unsubscribe" 
               style="color: #6b7280; font-size: 12px; text-decoration: none;">
              Unsubscribe by replying to this email
            </a>
          </div>
          <p style="color: #6b7280; font-size: 14px; margin: 0; font-weight: 500;">
            SteveOS • Personal Operating System
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

function createBlogNewsletterText(blogPost: BlogPost) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://steve-os.vercel.app'
  const postUrl = `${siteUrl}/blog/${blogPost.id}`

  return `
New Blog Post Published!

${blogPost.title}

${blogPost.excerpt}

Tags: ${blogPost.tags.join(', ')}
Published: ${new Date(blogPost.date).toLocaleDateString()}
Read time: ${blogPost.readTime}
Author: ${blogPost.author}

Read the full article: ${postUrl}

Browse all posts: ${siteUrl}/blog

---
SteveOS • Personal Operating System
Unsubscribe by replying to this email
  `
}
