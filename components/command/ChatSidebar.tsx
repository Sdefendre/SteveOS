'use client'

import Link from 'next/link'
import { X, MessageSquare, Sparkles, Clock, Settings, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ChatSidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface NavItemProps {
  icon: React.ComponentType<{ className?: string }>
  label: string
  href?: string
  active?: boolean
  onClick?: () => void
}

function NavItem({ icon: Icon, label, href, active, onClick }: NavItemProps) {
  const content = (
    <div
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer',
        active
          ? 'bg-white/10 text-foreground'
          : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}

export function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed md:sticky top-0 left-0 z-50 h-screen w-[280px] flex flex-col bg-zinc-950/95 backdrop-blur-xl border-r border-white/10 transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-white/5">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">Command</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="md:hidden h-8 w-8 text-muted-foreground"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <NavItem icon={MessageSquare} label="Chat" active />
          <NavItem icon={Clock} label="History" />
          <NavItem icon={Settings} label="Settings" />
        </nav>

        {/* Chat History Placeholder */}
        <div className="px-3 pb-3">
          <div className="rounded-lg bg-white/5 p-3">
            <p className="text-xs text-muted-foreground text-center">Chat history coming soon</p>
          </div>
        </div>

        {/* User Section */}
        <div className="p-3 border-t border-white/5">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
            <div className="h-8 w-8 rounded-full bg-zinc-800 flex items-center justify-center">
              <User className="h-4 w-4 text-zinc-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Guest User</p>
              <p className="text-xs text-muted-foreground">Free Plan</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
