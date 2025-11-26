import { CommandPageClient } from '@/components/command/CommandPageClient'
import type { Viewport } from 'next'

export const metadata = {
  title: 'CommandAI - Life Command OS',
  description: 'Direct interface for CommandAI. Ask about VA benefits, claims, and transition.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function CommandPage() {
  return <CommandPageClient />
}
