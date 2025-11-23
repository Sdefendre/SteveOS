'use client'

import { forwardRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { MessageCircle } from 'lucide-react'
import { motion, type HTMLMotionProps } from 'framer-motion'

// Simple navigation button component
const ChatButton = forwardRef<HTMLButtonElement, HTMLMotionProps<'button'>>(
  ({ className, ...props }, ref) => {
    const router = useRouter()

    const handleClick = () => {
      router.push('/command')
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className={`group flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
          className || ''
        }`}
        aria-label="Chat with AI Benefits Navigator"
        {...props}
      >
        <MessageCircle className="size-5 transition-transform group-hover:rotate-12" />
      </motion.button>
    )
  }
)
ChatButton.displayName = 'ChatButton'

export function ChatFloatingButton() {
  const pathname = usePathname()

  // Don't show the floating button on the command page since it's the chat interface
  if (pathname === '/command') {
    return null
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed z-50 print:hidden"
      style={{
        bottom: 'max(1rem, calc(env(safe-area-inset-bottom) + 1rem))',
        right: 'max(1rem, calc(env(safe-area-inset-right) + 1rem))',
      }}
    >
      <ChatButton />
    </motion.div>
  )
}
