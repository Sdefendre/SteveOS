'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react'
import { CourseModule, CourseLesson, getAllLessons } from '@/constants/course'
import { CourseSidebar } from './course/CourseSidebar'
import { LessonContent } from './course/LessonContent'

interface CoursePlayerProps {
  modules: CourseModule[]
  courseId?: string
  userId?: string
}

export function CoursePlayer({
  modules,
  courseId = '0-100-rating-course',
  userId,
}: CoursePlayerProps) {
  // Flatten lessons from modules
  const allLessons = modules.flatMap((module) => module.lessons)

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set())
  const [isLoading, setIsLoading] = useState(true)

  // Fetch progress on mount
  useEffect(() => {
    async function fetchProgress() {
      if (!userId) {
        setIsLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/course/progress?userId=${userId}&courseId=${courseId}`)
        if (response.ok) {
          const data = await response.json()
          // data.progress is array of { module_id: string, ... }
          if (data.progress && Array.isArray(data.progress)) {
            const completedIds = new Set<string>(
              data.progress.map((p: any) => p.module_id as string)
            )
            setCompletedLessons(completedIds)
          }
        }
      } catch (error) {
        console.error('Failed to load course progress:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProgress()
  }, [userId, courseId])

  const currentLesson = allLessons[currentLessonIndex]
  const hasNext = currentLessonIndex < allLessons.length - 1
  const hasPrev = currentLessonIndex > 0

  const handleLessonSelect = (lessonId: string) => {
    const index = allLessons.findIndex((lesson) => lesson.id === lessonId)
    if (index !== -1) {
      setCurrentLessonIndex(index)
    }
  }

  const handleNext = () => {
    if (hasNext) {
      setCurrentLessonIndex(currentLessonIndex + 1)
    }
  }

  const handlePrev = () => {
    if (hasPrev) {
      setCurrentLessonIndex(currentLessonIndex - 1)
    }
  }

  const handleComplete = async () => {
    const lessonId = currentLesson.id
    setCompletedLessons((prev) => new Set(prev).add(lessonId))

    // Save progress to database
    if (userId) {
      try {
        await fetch('/api/course/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            courseId,
            moduleId: lessonId, // Using lessonId as moduleId for backward compatibility
            completed: true,
          }),
        })
      } catch (error) {
        console.error('Error saving progress:', error)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-[600px] w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Sidebar - Module and Lesson List */}
      <div className="lg:w-80 shrink-0">
        <CourseSidebar
          modules={modules}
          currentLessonId={currentLesson.id}
          completedLessonIds={completedLessons}
          onLessonSelect={handleLessonSelect}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <Card className="glass h-full flex flex-col">
          <CardContent className="flex-1 flex flex-col pt-6">
            <div className="flex-1 overflow-y-auto">
              <LessonContent lesson={currentLesson} />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <Button variant="outline" onClick={handlePrev} disabled={!hasPrev}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              <div className="flex gap-2">
                {!completedLessons.has(currentLesson.id) && (
                  <Button onClick={handleComplete} variant="outline">
                    Mark Complete
                  </Button>
                )}
                {hasNext ? (
                  <Button onClick={handleNext}>
                    Next Lesson
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button disabled={!completedLessons.has(currentLesson.id)}>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Course Complete!
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
