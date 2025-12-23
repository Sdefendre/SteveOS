# Course Components

This directory contains the modular course player components for the VA Benefits course system.

## Components

### CourseSidebar.tsx

Displays the course navigation sidebar with:

- Module grouping
- Lesson list with completion status
- Visual progress indicator
- Click-to-navigate functionality

**Props:**

- `modules`: Array of course modules
- `currentLessonId`: ID of the currently active lesson
- `completedLessonIds`: Set of completed lesson IDs
- `onLessonSelect`: Callback when a lesson is selected

### LessonContent.tsx

Renders the main lesson content area with:

- Lesson header with type badge (article/video)
- Duration indicator
- Rich content rendering with proper styling

**Props:**

- `lesson`: CourseLesson object containing title, description, and content

### ProgressBar.tsx

Visual progress indicator component showing:

- Completion percentage
- Number of completed items vs total
- Visual progress bar

**Props:**

- `completed`: Number of completed items
- `total`: Total number of items
- `className`: Optional CSS class name

## Usage

```tsx
import { CoursePlayer } from '@/components/CoursePlayer'
import { course } from '@/constants/course'

;<CoursePlayer modules={course.modules} courseId="0-100-rating-course" userId={userId} />
```

## Data Structure

Course data is defined in `/constants/course.ts` with the following hierarchy:

```
Course
  ├── modules[]
  │   ├── id
  │   ├── title
  │   ├── description
  │   ├── duration
  │   ├── order
  │   └── lessons[]
  │       ├── id
  │       ├── title
  │       ├── description
  │       ├── duration
  │       ├── order
  │       ├── type (article|video)
  │       └── content (React.ReactNode)
```

## Progress Tracking

Progress is tracked per lesson and saved to Supabase `course_progress` table:

- `user_id`: User identifier
- `course_id`: Course identifier
- `module_id`: Lesson identifier (for backward compatibility)
- `completed`: Boolean completion status
- `progress_percentage`: Optional percentage completion
- `last_accessed_at`: Timestamp of last access
- `completed_at`: Timestamp of completion
