'use client'

import { Progress } from '@/components/ui/progress'
import { CheckCircle2 } from 'lucide-react'

interface ProgressBarProps {
  completed: number
  total: number
  className?: string
}

export function ProgressBar({ completed, total, className = '' }: ProgressBarProps) {
  const percentage = total > 0 ? (completed / total) * 100 : 0

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Course Progress</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {completed} of {total} completed
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
      <p className="text-xs text-muted-foreground text-right">{Math.round(percentage)}%</p>
    </div>
  )
}
