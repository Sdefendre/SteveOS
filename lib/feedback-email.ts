import nodemailer from 'nodemailer'

// Create transporter for Gmail (same as newsletter)
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

interface FeedbackData {
  id: number
  type: string
  message: string
  rating: number | null
  email: string | null
  path: string | null
  created_at: string
}

export async function sendFeedbackNotificationToAdmin(feedback: FeedbackData) {
  if (!process.env.GMAIL_APP_PASSWORD) {
    console.log('Email not configured, skipping notification')
    return false
  }

  const typeEmoji =
    {
      general: '💬',
      bug: '🐛',
      feature: '✨',
      content: '📝',
    }[feedback.type] || '💬'

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  try {
    await transporter.sendMail({
      from: `"Command Feedback Bot" <${process.env.GMAIL_USER || 'steve.defendre12@gmail.com'}>`,
      to: process.env.GMAIL_USER || 'steve.defendre12@gmail.com',
      subject: `${typeEmoji} New Feedback: ${feedback.type}`,
      text: createAdminNotificationText(feedback),
      html: createAdminNotificationHtml(feedback, siteUrl),
    })

    console.log(`Feedback notification sent to admin for feedback #${feedback.id}`)
    return true
  } catch (error) {
    console.error('Failed to send feedback notification:', error)
    return false
  }
}

export async function sendResponseToUser(
  feedback: FeedbackData,
  response: string,
  userEmail: string
) {
  if (!process.env.GMAIL_APP_PASSWORD) {
    console.log('Email not configured, skipping response email')
    return false
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  try {
    await transporter.sendMail({
      from: `"Command Support" <${process.env.GMAIL_USER || 'steve.defendre12@gmail.com'}>`,
      to: userEmail,
      subject: `Response to your feedback - Command`,
      text: createUserResponseText(feedback, response),
      html: createUserResponseHtml(feedback, response, siteUrl),
    })

    console.log(`Response email sent to ${userEmail} for feedback #${feedback.id}`)
    return true
  } catch (error) {
    console.error('Failed to send response email:', error)
    return false
  }
}

function createAdminNotificationText(feedback: FeedbackData): string {
  return `
New Feedback Received

Type: ${feedback.type.toUpperCase()}
Rating: ${feedback.rating ? `${feedback.rating}/5 stars` : 'No rating'}
Page: ${feedback.path || 'Unknown'}
Date: ${new Date(feedback.created_at).toLocaleString()}

Message:
${feedback.message}

${feedback.email ? `User Email: ${feedback.email}` : 'No contact email provided'}

Feedback ID: #${feedback.id}

---
Command Feedback System
  `
}

function createAdminNotificationHtml(feedback: FeedbackData, siteUrl: string): string {
  const typeColors = {
    general: { bg: '#3b82f6', name: 'General' },
    bug: { bg: '#ef4444', name: 'Bug Report' },
    feature: { bg: '#10b981', name: 'Feature Request' },
    content: { bg: '#8b5cf6', name: 'Content Feedback' },
  }

  const typeInfo = typeColors[feedback.type as keyof typeof typeColors] || typeColors.general

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Feedback Received</title>
    </head>
    <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #000000 0%, #0c1e3d 50%, #000000 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <div style="max-width: 600px; margin: 40px auto; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 24px; overflow: hidden;">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%); padding: 40px 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
            New Feedback Received
          </h1>
          <p style="color: #9ca3af; margin: 10px 0 0 0; font-size: 14px;">Feedback ID: #${feedback.id}</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">

          <!-- Type Badge -->
          <div style="margin-bottom: 25px;">
            <span style="background: ${typeInfo.bg}; color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600;">
              ${typeInfo.name}
            </span>
          </div>

          <!-- Metadata -->
          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 25px;">
            <table style="width: 100%; color: #d1d5db; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600;">Date:</td>
                <td style="padding: 8px 0;">${new Date(feedback.created_at).toLocaleString()}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600;">Page:</td>
                <td style="padding: 8px 0;">${feedback.path || 'Unknown'}</td>
              </tr>
              ${
                feedback.rating
                  ? `
              <tr>
                <td style="padding: 8px 0; font-weight: 600;">Rating:</td>
                <td style="padding: 8px 0;">${'⭐'.repeat(feedback.rating)} (${feedback.rating}/5)</td>
              </tr>
              `
                  : ''
              }
              ${
                feedback.email
                  ? `
              <tr>
                <td style="padding: 8px 0; font-weight: 600;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${feedback.email}" style="color: #60a5fa; text-decoration: none;">${feedback.email}</a></td>
              </tr>
              `
                  : ''
              }
            </table>
          </div>

          <!-- Message -->
          <div style="background: rgba(255, 255, 255, 0.05); border-left: 4px solid ${typeInfo.bg}; padding: 20px; margin-bottom: 25px;">
            <h3 style="color: #ffffff; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Message:</h3>
            <p style="color: #d1d5db; margin: 0; line-height: 1.6; white-space: pre-wrap;">${feedback.message}</p>
          </div>

          ${
            feedback.email
              ? `
          <!-- CTA Button -->
          <div style="text-align: center; margin: 30px 0;">
            <a href="mailto:${feedback.email}?subject=Re: Your feedback on Command"
               style="background: linear-gradient(135deg, #3b82f6, #9333ea); color: #fff; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: 600; font-size: 14px; display: inline-block;">
              Reply to User
            </a>
          </div>
          `
              : `
          <div style="background: rgba(234, 179, 8, 0.1); border: 1px solid rgba(234, 179, 8, 0.3); border-radius: 12px; padding: 15px; text-align: center;">
            <p style="color: #fbbf24; margin: 0; font-size: 14px;">⚠️ No email provided - cannot respond directly</p>
          </div>
          `
          }
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid rgba(55, 65, 81, 0.5); padding: 20px 30px; text-align: center; background: rgba(0, 0, 0, 0.3);">
          <p style="color: #6b7280; font-size: 12px; margin: 0;">
            Command Feedback System • Automated Notification
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

function createUserResponseText(feedback: FeedbackData, response: string): string {
  return `
Thank you for your feedback!

We've reviewed your ${feedback.type} feedback and wanted to get back to you:

Original Message:
${feedback.message}

Our Response:
${response}

Thank you for helping us improve Command!

---
Command Support Team
${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}
  `
}

function createUserResponseHtml(feedback: FeedbackData, response: string, siteUrl: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Response to Your Feedback</title>
    </head>
    <body style="margin: 0; padding: 0; background: linear-gradient(135deg, #000000 0%, #0c1e3d 50%, #000000 100%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <div style="max-width: 600px; margin: 40px auto; background: rgba(0, 0, 0, 0.8); backdrop-filter: blur(20px); border: 1px solid rgba(59, 130, 246, 0.2); border-radius: 24px; overflow: hidden;">

        <!-- Header -->
        <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%); padding: 40px 30px; text-align: center;">
          <div style="display: inline-block; background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%); border-radius: 50%; padding: 16px; margin-bottom: 20px;">
            <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #3b82f6 0%, #9333ea 100%); border-radius: 4px; display: inline-block; position: relative;">
              <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-weight: bold; font-size: 18px;">✉️</div>
            </div>
          </div>

          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
            Thank You for Your Feedback!
          </h1>
          <p style="color: #9ca3af; margin: 15px 0 0 0; font-size: 16px;">We've reviewed your message</p>
        </div>

        <!-- Content -->
        <div style="padding: 40px 30px;">

          <!-- Original Feedback -->
          <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 20px; margin-bottom: 25px;">
            <h3 style="color: #9ca3af; margin: 0 0 10px 0; font-size: 12px; font-weight: 600; text-transform: uppercase;">Your Message:</h3>
            <p style="color: #d1d5db; margin: 0; line-height: 1.6; white-space: pre-wrap;">${feedback.message}</p>
          </div>

          <!-- Response -->
          <div style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%); border-left: 4px solid #3b82f6; padding: 20px; margin-bottom: 25px;">
            <h3 style="color: #60a5fa; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Our Response:</h3>
            <p style="color: #d1d5db; margin: 0; line-height: 1.6; white-space: pre-wrap;">${response}</p>
          </div>

          <!-- Additional Info -->
          <div style="background: rgba(255, 255, 255, 0.02); border-radius: 12px; padding: 20px; text-align: center;">
            <p style="color: #9ca3af; margin: 0 0 15px 0; font-size: 14px;">
              Have more questions or feedback?
            </p>
            <a href="mailto:${process.env.GMAIL_USER || 'steve.defendre12@gmail.com'}?subject=Re: Feedback Response"
               style="color: #60a5fa; text-decoration: none; font-weight: 500;">
              Reply to this email →
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="border-top: 1px solid rgba(55, 65, 81, 0.5); padding: 30px; text-align: center; background: rgba(0, 0, 0, 0.3);">
          <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0; font-weight: 500;">
            Command • Personal Operating System
          </p>
          <a href="${siteUrl}" style="color: #60a5fa; font-size: 12px; text-decoration: none;">
            Visit Command →
          </a>
        </div>
      </div>
    </body>
    </html>
  `
}
