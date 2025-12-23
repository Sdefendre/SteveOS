import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'
import { sendResponseToUser } from '@/lib/feedback-email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { feedbackId, response, sendEmail } = body

    // Validate required fields
    if (!feedbackId || typeof feedbackId !== 'number') {
      return NextResponse.json({ error: 'Feedback ID is required' }, { status: 400 })
    }

    if (!response || typeof response !== 'string' || response.trim().length === 0) {
      return NextResponse.json({ error: 'Response message is required' }, { status: 400 })
    }

    const supabase = getSupabaseClient()

    if (!supabase) {
      return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 })
    }

    // Get the feedback to check if email exists
    const { data: feedback, error: fetchError } = await supabase
      .from('site_feedback')
      .select('*')
      .eq('id', feedbackId)
      .single()

    if (fetchError || !feedback) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 })
    }

    // Update feedback with response
    const { data, error } = await supabase
      .from('site_feedback')
      .update({
        admin_response: response.trim(),
        responded_at: new Date().toISOString(),
        status: 'resolved',
      })
      .eq('id', feedbackId)
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to save response' }, { status: 500 })
    }

    // Send email to user if they provided an email and sendEmail is true
    let emailSent = false
    if (sendEmail && feedback.email) {
      try {
        emailSent = await sendResponseToUser(
          {
            id: feedback.id,
            type: feedback.type || 'general',
            message: feedback.message,
            rating: feedback.rating,
            email: feedback.email,
            path: feedback.path,
            created_at: feedback.created_at || new Date().toISOString(),
          },
          response.trim(),
          feedback.email
        )
      } catch (emailError) {
        console.error('Failed to send response email:', emailError)
        // Don't fail the whole request if email fails
      }
    }

    return NextResponse.json(
      {
        message: 'Response saved successfully',
        feedback: data,
        emailSent,
        emailNotSentReason: !feedback.email
          ? 'No email provided by user'
          : !sendEmail
            ? 'Email sending not requested'
            : !emailSent
              ? 'Email failed to send'
              : null,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Feedback response error:', error)
    return NextResponse.json(
      { error: 'Failed to submit response. Please try again later.' },
      { status: 500 }
    )
  }
}

// Handle CORS preflight
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
