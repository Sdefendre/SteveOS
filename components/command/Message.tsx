'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, User, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import type { UIMessage } from 'ai'
import { cn } from '@/lib/utils'

interface MessageProps {
  message: UIMessage
  isLoading?: boolean
}

function PureMessage({ message, isLoading }: MessageProps) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  // Extract text content from message parts
  const content =
    (message as any).content ||
    (message as any).parts
      ?.filter((part: any) => part.type === 'text')
      .map((part: any) => ('text' in part ? part.text : ''))
      .join('') ||
    ''

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'group flex w-full items-start gap-3',
        isUser ? 'justify-end' : 'justify-start'
      )}
      data-role={message.role}
    >
      {/* Assistant Avatar */}
      {!isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-background ring-1 ring-border flex items-center justify-center">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
      )}

      {/* Message Content */}
      <div
        className={cn(
          'flex flex-col',
          isUser ? 'items-end max-w-[80%]' : 'items-start flex-1 max-w-full'
        )}
      >
        <div
          className={cn(
            'relative rounded-2xl px-4 py-2.5',
            isUser ? 'bg-[#006cff] text-white' : 'bg-transparent text-foreground'
          )}
        >
          {isUser ? (
            <p className="text-sm md:text-base whitespace-pre-wrap break-words">{content}</p>
          ) : (
            <div className="prose prose-invert prose-sm md:prose-base max-w-none">
              <MarkdownRenderer content={content} />
            </div>
          )}
        </div>

        {/* Message Actions - Only for assistant messages */}
        {!isUser && !isLoading && content && (
          <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Copy message"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-zinc-700 flex items-center justify-center">
          <User className="h-4 w-4 text-zinc-300" />
        </div>
      )}
    </motion.div>
  )
}

export const Message = memo(PureMessage, (prevProps, nextProps) => {
  if (prevProps.isLoading !== nextProps.isLoading) return false
  if (prevProps.message.id !== nextProps.message.id) return false

  const prevContent = (prevProps.message as any).content || ''
  const nextContent = (nextProps.message as any).content || ''
  if (prevContent !== nextContent) return false

  return true
})
