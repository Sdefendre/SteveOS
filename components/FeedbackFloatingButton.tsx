'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'

export function FeedbackFloatingButton() {
  const pathname = usePathname()

  // Don't show on the command page since that's where the button links to
  if (pathname === '/command') {
    return null
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link href="/command">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Open Command AI"
        >
          <MessageSquare className="size-5 transition-transform group-hover:rotate-12" />
        </motion.button>
      </Link>
    </motion.div>
  )
}
