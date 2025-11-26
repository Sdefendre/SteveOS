'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export function ThinkingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-3 w-full"
    >
      {/* Avatar */}
      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-background ring-1 ring-border flex items-center justify-center">
        <Sparkles className="h-4 w-4 text-primary" />
      </div>

      {/* Thinking animation */}
      <div className="flex items-center gap-1 py-2">
        <span className="text-sm text-muted-foreground">Thinking</span>
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="text-muted-foreground"
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          className="text-muted-foreground"
        >
          .
        </motion.span>
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          className="text-muted-foreground"
        >
          .
        </motion.span>
      </div>
    </motion.div>
  )
}
