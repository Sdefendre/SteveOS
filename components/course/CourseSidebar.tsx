'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CourseModule, CourseLesson } from '@/constants/course'
import { CheckCircle2, Circle, ChevronRight } from 'lucide-react'
import { ProgressBar } from './ProgressBar'

interface CourseSidebarProps {
  modules: CourseModule[]
  currentLessonId: string
  completedLessonIds: Set<string>
  onLessonSelect: (lessonId: string) => void
}

export function CourseSidebar({
  modules,
  currentLessonId,
  completedLessonIds,
  onLessonSelect,
}: CourseSidebarProps) {
  const allLessons = modules.flatMap((module) => module.lessons)
  const completedCount = allLessons.filter((lesson) => completedLessonIds.has(lesson.id)).length

  return (
    <Card className="glass h-full">
      <CardHeader>
        <CardTitle className="text-lg">Course Content</CardTitle>
        <ProgressBar completed={completedCount} total={allLessons.length} className="mt-4" />
      </CardHeader>
      <CardContent className="space-y-4">
        {modules.map((module) => (
          <div key={module.id} className="space-y-2">
            {/* Module Header */}
            <div className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              {module.title}
            </div>

            {/* Module Lessons */}
            <div className="space-y-1">
              {module.lessons.map((lesson) => {
                const isCompleted = completedLessonIds.has(lesson.id)
                const isCurrent = lesson.id === currentLessonId

                return (
                  <button
                    key={lesson.id}
                    onClick={() => onLessonSelect(lesson.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      isCurrent
                        ? 'bg-primary/20 border border-primary/30'
                        : 'hover:bg-muted/50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{lesson.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">{lesson.duration}</div>
                      </div>
                      {isCurrent && (
                        <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
