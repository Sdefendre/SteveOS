import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { addSubscriber } from '@/lib/subscribers'

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'steve.defendre12@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD, // App-specific password
  },
  // Add timeout and connection options
  connectionTimeout: 10000, // 10 seconds
  greetingTimeout: 5000, // 5 seconds
  socketTimeout: 10000, // 10 seconds
})

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 })
    }

    // Check if email configuration is available
    if (!process.env.GMAIL_APP_PASSWORD) {
      console.log(`Newsletter subscription (no email config): ${email}`)
      return NextResponse.json(
        {
          message: 'Successfully subscribed to newsletter!',
          email: email,
        },
        { status: 200 }
      )
    }

    console.log(`Attempting to send newsletter emails for: ${email}`)

    // Store subscriber in our system
    const added = addSubscriber(email)
    if (!added) {
      console.log(`Subscriber ${email} already exists`)
    }

    // Send welcome email to subscriber with glass morphism aesthetic
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://steve-os.vercel.app'
    const welcomeEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to SteveOS</title>
      </head>
      <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #000000 0%, #0c1e3d 50%, #000000 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 24px; overflow: hidden;">
          
          <!-- Header with gradient -->
          <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%); padding: 40px 30px; text-align: center; position: relative;">
            <!-- Floating dots decoration -->
            <div style="position: absolute; top: 20px; right: 20px; width: 8px; height: 8px; background: rgba(59, 130, 246, 0.4); border-radius: 50%; animation: pulse 2s infinite;"></div>
            <div style="position: absolute; top: 35px; right: 35px; width: 4px; height: 4px; background: rgba(147, 51, 234, 0.4); border-radius: 50%; animation: pulse 2s infinite 0.5s;"></div>
            
            <!-- Logo/Icon -->
            <div style="display: inline-block; background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%); backdrop-filter: blur(10px); border: 1px solid rgba(59, 130, 246, 0.3); border-radius: 50%; padding: 16px; margin-bottom: 20px;">
              <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #3b82f6 0%, #9333ea 100%); border-radius: 4px; display: inline-block; position: relative;">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-weight: bold; font-size: 18px;">S</div>
              </div>
            </div>
            
            <h1 style="background: linear-gradient(135deg, #ffffff 0%, #3b82f6 50%, #ffffff 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0; font-size: 36px; font-weight: 700; line-height: 1.2;">
              Welcome to SteveOS!
            </h1>
            <p style="color: #9ca3af; margin: 15px 0 0 0; font-size: 18px; font-weight: 500;">Discipline, Precision, Resilience</p>
          </div>
          
          <!-- Main content -->
          <div style="padding: 40px 30px;">
            <!-- Welcome message -->
            <div style="background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 30px; margin-bottom: 30px;">
              <h2 style="color: #ffffff; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Thanks for subscribing, ${email.split('@')[0]}!</h2>
              <p style="color: #d1d5db; line-height: 1.7; margin: 0 0 20px 0; font-size: 16px;">
                You're now part of the SteveOS community. You'll receive exclusive insights on:
              </p>
              <ul style="color: #d1d5db; line-height: 1.8; margin: 0; padding-left: 0; list-style: none;">
                <li style="padding: 8px 0; position: relative; padding-left: 25px;">
                  <span style="position: absolute; left: 0; top: 14px; width: 6px; height: 6px; background: linear-gradient(135deg, #3b82f6, #9333ea); border-radius: 50%;"></span>
                  AI-powered development tools and techniques
                </li>
                <li style="padding: 8px 0; position: relative; padding-left: 25px;">
                  <span style="position: absolute; left: 0; top: 14px; width: 6px; height: 6px; background: linear-gradient(135deg, #3b82f6, #9333ea); border-radius: 50%;"></span>
                  Real-world case studies and projects
                </li>
                <li style="padding: 8px 0; position: relative; padding-left: 25px;">
                  <span style="position: absolute; left: 0; top: 14px; width: 6px; height: 6px; background: linear-gradient(135deg, #3b82f6, #9333ea); border-radius: 50%;"></span>
                  Technical tutorials on full-stack development
                </li>
              </ul>
            </div>
            
            <!-- About section -->
            <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%); backdrop-filter: blur(10px); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 16px; padding: 30px; margin-bottom: 30px;">
              <h3 style="color: #3b82f6; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">About Steve Defendre</h3>
              <p style="color: #d1d5db; line-height: 1.7; margin: 0; font-size: 16px;">
                Veteran, full-stack engineer, and creator of SteveOS. I combine military discipline 
                with modern software engineering to help businesses scale.
              </p>
            </div>
            
            <!-- CTA Button -->
            <div style="text-align: center; margin: 40px 0;">
              <div style="display: inline-block; position: relative;">
                <div style="position: absolute; inset: 0; background: linear-gradient(135deg, #3b82f6, #9333ea); border-radius: 50px; filter: blur(8px); opacity: 0.6;"></div>
                <a href="${siteUrl}/blog" 
                   style="position: relative; background: linear-gradient(135deg, #3b82f6, #9333ea); color: #fff; padding: 16px 32px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);">
                  Read the Latest Posts →
                </a>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="border-top: 1px solid rgba(55, 65, 81, 0.5); padding: 30px; text-align: center; background: rgba(0, 0, 0, 0.3);">
            <div style="display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 15px; flex-wrap: wrap;">
              <div style="width: 4px; height: 4px; background: rgba(59, 130, 246, 0.5); border-radius: 50%;"></div>
              <span style="color: #6b7280; font-size: 12px;">No spam, ever</span>
              <div style="width: 4px; height: 4px; background: rgba(59, 130, 246, 0.5); border-radius: 50%;"></div>
              <span style="color: #6b7280; font-size: 12px;">Unsubscribe anytime</span>
            </div>
            <p style="color: #6b7280; font-size: 14px; margin: 0; font-weight: 500;">
              SteveOS • Personal Operating System
            </p>
          </div>
        </div>
        
        <!-- Inline CSS for animations -->
        <style>
          @keyframes pulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
        </style>
      </body>
      </html>
    `

    const welcomeEmailText = `
Welcome to SteveOS Newsletter!

Thanks for subscribing, ${email.split('@')[0]}!

You're now part of the SteveOS community. You'll receive exclusive insights on:
• AI-powered development tools and techniques
• Real-world case studies
• Technical tutorials on full-stack development

About Steve Defendre:
Veteran, full-stack engineer, and creator of SteveOS. I combine military discipline with modern software engineering.

Read the latest posts: ${siteUrl}/blog

You can unsubscribe at any time by replying to any email.

SteveOS • Personal Operating System
    `

    // Send welcome email
    console.log('Sending welcome email...')
    await transporter.sendMail({
      from: `"SteveOS" <${process.env.GMAIL_USER || 'steve.defendre12@gmail.com'}>`,
      to: email,
      subject: '🚀 Welcome to SteveOS Newsletter!',
      text: welcomeEmailText,
      html: welcomeEmailHtml,
    })
    console.log('Welcome email sent successfully')

    // Send notification to yourself
    console.log('Sending admin notification...')
    await transporter.sendMail({
      from: `"Newsletter Bot" <${process.env.GMAIL_USER || 'steve.defendre12@gmail.com'}>`,
      to: process.env.GMAIL_USER || 'steve.defendre12@gmail.com',
      subject: `New Newsletter Subscription: ${email}`,
      text: `New subscriber: ${email}\n\nSubscribed at: ${new Date().toISOString()}`,
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
      `,
    })
    console.log('Admin notification sent successfully')

    console.log(`Newsletter subscription completed: ${email}`)

    return NextResponse.json(
      {
        message: 'Successfully subscribed to newsletter!',
        email: email,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
