'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  Mic,
  Plus,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  User,
  MessageSquare,
  Sparkles,
  Zap,
  MicOff,
  Menu,
  Loader2,
  Terminal,
  Home,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { CommandMessage, CommandMessageLoading } from './CommandMessage'
import { VoiceAgent } from '@/components/VoiceAgent'
import { MODEL_OPTIONS, type ModelOption } from '@/constants/ai'

interface CommandChatProps {
  userId?: string
}

export function CommandChat({ userId }: CommandChatProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [selectedModel, setSelectedModel] = useState<ModelOption>('gpt-4o-mini')
  const [isVoiceMode, setIsVoiceMode] = useState(false)
  const [rateLimit, setRateLimit] = useState<{ remaining: number; limit: number } | null>(null)

  // Generate conversation ID
  const [conversationId, setConversationId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem('ai-conversation-id')
      if (stored) return stored
      const newId = `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      sessionStorage.setItem('ai-conversation-id', newId)
      return newId
    }
    return `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  })

  // Update sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && conversationId) {
      sessionStorage.setItem('ai-conversation-id', conversationId)
    }
  }, [conversationId])

  const { messages, input, handleInputChange, handleSubmit, status, setMessages, error } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/ai-agent',
      body: {
        userId,
        model: selectedModel,
        conversationId: conversationId || undefined,
      },
      onResponse: async (response) => {
        const remaining = response.headers.get('X-Rate-Limit-Remaining')
        const limit = response.headers.get('X-Rate-Limit-Limit')
        if (remaining && limit) {
          setRateLimit({
            remaining: parseInt(remaining, 10),
            limit: parseInt(limit, 10),
          })
        }
      },
    }),
  })

  // Load rate limit
  useEffect(() => {
    async function loadRateLimit() {
      if (!userId) {
        setRateLimit({ remaining: 5, limit: 5 })
        return
      }
      try {
        const response = await fetch(`/api/ai-agent/rate-limit?userId=${userId}`)
        if (response.ok) {
          const data = await response.json()
          setRateLimit({
            remaining: data.remaining,
            limit: data.limit,
          })
        }
      } catch (err) {
        console.error('Failed to load rate limit:', err)
      }
    }
    loadRateLimit()
  }, [userId, messages])

  const isLoading = status === 'submitted' || status === 'streaming'
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`
    }
  }, [input])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      handleSubmit(e as any)
    }
  }

  const toggleVoiceMode = () => setIsVoiceMode(!isVoiceMode)

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-background/40 backdrop-blur-md border-r border-border/50">
      <div className="p-4 border-b border-border/50">
        <Button
          variant="outline"
          className="w-full justify-start gap-2 bg-background/20 hover:bg-primary/20 border-primary/20 hover:border-primary/50 transition-all duration-300"
          onClick={() => {
            setMessages([])
            const newId = `conv-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
            setConversationId(newId)
          }}
        >
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
          <Terminal className="h-3 w-3" />
          Recent Sessions
        </div>
        <div className="space-y-1">
          {/* Visual placeholders for history */}
          <Button
            variant="ghost"
            className="w-full justify-start text-sm font-normal text-muted-foreground truncate h-auto py-2 hover:bg-primary/10 hover:text-primary transition-colors"
          >
            VA Benefits Explained
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-sm font-normal text-muted-foreground truncate h-auto py-2 hover:bg-primary/10 hover:text-primary transition-colors"
          >
            Disability Rating Check
          </Button>
        </div>
      </div>

      <div className="p-4 border-t border-border/50 mt-auto bg-background/20">
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10 transition-colors cursor-pointer group">
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
            <User className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
              {userId ? 'Veteran' : 'Guest User'}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {userId ? 'Pro Plan' : 'Free Tier'}
            </p>
          </div>
          <Settings className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-[100vh] overflow-hidden">
      {/* Desktop Sidebar */}
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="hidden md:block flex-shrink-0 z-20"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative h-full">
        {/* Header */}
        <header className="flex items-center justify-between p-4 border-b border-border/50 bg-background/60 backdrop-blur-md z-10 sticky top-0">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                title="Back to Home"
              >
                <Home className="h-5 w-5" />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex text-muted-foreground hover:text-primary hover:bg-primary/10"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="h-5 w-5" />
              ) : (
                <PanelLeftOpen className="h-5 w-5" />
              )}
            </Button>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="p-0 w-[280px] border-r-border/50 bg-background/80 backdrop-blur-xl"
              >
                <SidebarContent />
              </SheetContent>
            </Sheet>

            <div className="flex items-center gap-2">
              <Select
                value={selectedModel}
                onValueChange={(value) => setSelectedModel(value as ModelOption)}
              >
                <SelectTrigger className="h-9 min-w-[140px] border-primary/20 bg-background/30 hover:bg-primary/10 focus:ring-primary/30 transition-all gap-2">
                  <Sparkles className="h-3 w-3 text-primary" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-background/90 backdrop-blur-xl border-primary/20">
                  {MODEL_OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="focus:bg-primary/20"
                    >
                      <span className="font-medium">{option.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {rateLimit && (
              <Badge
                variant="outline"
                className={`hidden sm:flex items-center gap-1.5 font-medium border-primary/20 bg-primary/5 ${
                  rateLimit.remaining <= 2
                    ? 'text-destructive border-destructive/30 bg-destructive/5'
                    : 'text-primary'
                }`}
              >
                <Zap className="h-3 w-3" />
                <span>
                  {rateLimit.remaining}/{rateLimit.limit}
                </span>
              </Badge>
            )}
            <Button
              variant={isVoiceMode ? 'default' : 'outline'}
              size="icon"
              onClick={toggleVoiceMode}
              className={`transition-all duration-300 ${
                isVoiceMode
                  ? 'bg-red-500 hover:bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] border-transparent'
                  : 'border-primary/20 text-muted-foreground hover:text-primary hover:bg-primary/10'
              }`}
            >
              {isVoiceMode ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto relative scroll-smooth custom-scrollbar">
          {isVoiceMode ? (
            <div className="h-full flex flex-col items-center justify-center p-6 bg-background/20 backdrop-blur-sm">
              <div className="w-full max-w-md">
                <VoiceAgent userId={userId} />
              </div>
            </div>
          ) : (
            <>
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="h-24 w-24 rounded-full bg-gradient-to-tr from-primary/30 to-purple-500/30 flex items-center justify-center mb-8 ring-4 ring-background/50 backdrop-blur-md shadow-[0_0_30px_rgba(124,58,237,0.3)]"
                  >
                    <Sparkles className="h-10 w-10 text-primary" />
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-3 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
                    Command Interface Online
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-md mb-10 leading-relaxed">
                    Ready to assist with VA benefits, claims analysis, and transition guidance.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
                    {[
                      'Explain my VA disability benefits',
                      'How do I file a C&P claim?',
                      'What does my DD-214 code mean?',
                      'Find local veteran resources',
                    ].map((prompt, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                      >
                        <Button
                          variant="outline"
                          className="w-full h-auto py-4 px-5 justify-start text-left whitespace-normal bg-background/40 hover:bg-primary/20 border-primary/10 hover:border-primary/40 backdrop-blur-sm transition-all duration-300 group"
                          onClick={() => {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const event = { preventDefault: () => {} } as any
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            handleInputChange({ target: { value: prompt } } as any)
                            setTimeout(() => handleSubmit(event), 100)
                          }}
                        >
                          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                            <MessageSquare className="h-4 w-4 text-primary" />
                          </div>
                          <span className="group-hover:text-primary transition-colors">
                            {prompt}
                          </span>
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col py-6 pb-32">
                  {messages.map((message, i) => (
                    <CommandMessage
                      key={message.id}
                      message={message}
                      isLast={i === messages.length - 1}
                    />
                  ))}
                  {isLoading && <CommandMessageLoading />}
                  {error && (
                    <div className="max-w-3xl mx-auto w-full p-4">
                      <div className="p-4 rounded-xl bg-destructive/10 text-destructive text-sm border border-destructive/20 backdrop-blur-md shadow-lg">
                        Error: {error.message}
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} className="h-4" />
                </div>
              )}
            </>
          )}
        </div>

        {/* Input Area */}
        {!isVoiceMode && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent pt-20">
            <div className="max-w-3xl mx-auto relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-purple-600/30 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative bg-background/80 backdrop-blur-xl border border-primary/20 rounded-2xl shadow-2xl focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                <form onSubmit={handleSubmit} className="relative flex items-end p-2 gap-2">
                  <Textarea
                    ref={textareaRef}
                    value={input || ''}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter command or query..."
                    className="min-h-[50px] max-h-[200px] w-full resize-none border-0 shadow-none focus-visible:ring-0 bg-transparent py-3 pl-4 pr-10 text-base"
                    rows={1}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={!input || typeof input !== 'string' || !input.trim() || isLoading}
                    className="h-10 w-10 rounded-xl mb-1 shrink-0 bg-primary hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                    <span className="sr-only">Execute</span>
                  </Button>
                </form>
              </div>
            </div>
            <div className="text-center mt-3 text-[10px] text-muted-foreground font-mono">
              COMMAND OS v1.0.4 • SECURE CONNECTION ESTABLISHED
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
