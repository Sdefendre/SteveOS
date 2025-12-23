'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CourseModule } from '@/constants/course'
import { CheckCircle2, Clock, BookOpen } from 'lucide-react'

interface CourseModuleCardProps {
  module: CourseModule
  isCompleted?: boolean
  isActive?: boolean
  onClick?: () => void
}

export function CourseModuleCard({
  module,
  isCompleted = false,
  isActive = false,
  onClick,
}: CourseModuleCardProps) {
  const completedLessons = module.lessons.filter((lesson) => isCompleted).length
  const totalLessons = module.lessons.length
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0

  return (
    <Card
      className={`glass hover:bg-white/10 dark:hover:bg-black/10 transition-all cursor-pointer ${
        isActive ? 'border-primary/50 shadow-lg' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {isCompleted && <CheckCircle2 className="h-5 w-5 text-green-500" />}
              <CardTitle className="text-lg">{module.title}</CardTitle>
            </div>
            <CardDescription>{module.description}</CardDescription>
          </div>
          <Badge variant="outline" className="shrink-0 ml-4">
            <Clock className="h-3 w-3 mr-1" />
            {module.duration}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BookOpen className="h-4 w-4" />
            <span>
              {totalLessons} {totalLessons === 1 ? 'lesson' : 'lessons'}
            </span>
          </div>
          {progressPercentage > 0 && (
            <span className="text-xs text-muted-foreground">
              {Math.round(progressPercentage)}% complete
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
