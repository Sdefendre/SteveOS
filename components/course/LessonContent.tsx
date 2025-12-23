'use client'

import { CourseLesson } from '@/constants/course'
import { Badge } from '@/components/ui/badge'
import { PlayCircle, BookOpen } from 'lucide-react'

interface LessonContentProps {
  lesson: CourseLesson
}

export function LessonContent({ lesson }: LessonContentProps) {
  return (
    <div className="space-y-4">
      {/* Lesson Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {lesson.type === 'video' ? (
              <PlayCircle className="h-5 w-5 text-primary" />
            ) : (
              <BookOpen className="h-5 w-5 text-primary" />
            )}
            <Badge variant="outline" className="capitalize">
              {lesson.type}
            </Badge>
            <Badge variant="secondary">{lesson.duration}</Badge>
          </div>
          <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
          <p className="text-muted-foreground">{lesson.description}</p>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="prose prose-sm dark:prose-invert max-w-none">{lesson.content}</div>
    </div>
  )
}
