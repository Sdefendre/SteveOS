import { createClient } from '@/lib/supabase/server'

// List of admin email addresses
const ADMIN_EMAILS = [
  'stevedefendre@gmail.com',
  // Add more admin emails here
]

export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient()
  if (!supabase) return false

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user?.email) return false

  return ADMIN_EMAILS.includes(user.email)
}

export async function requireAdmin() {
  const admin = await isAdmin()
  if (!admin) {
    throw new Error('Unauthorized: Admin access required')
  }
  return true
}
