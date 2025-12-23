# Course Content System Documentation

## Overview

The course content system has been fully implemented with a proper modular architecture, comprehensive curriculum structure, and reusable components. The system is designed for the "0-100% Service-Connected Disability Rating Course" for veterans.

## Architecture

### 1. Data Layer (`constants/course.ts`)

The course data is centralized in a single source of truth with the following structure:

```typescript
Course
  ├── id: string
  ├── title: string
  ├── description: string
  └── modules: CourseModule[]
        ├── id: string
        ├── title: string
        ├── description: string
        ├── duration: string
        ├── order: number
        └── lessons: CourseLesson[]
              ├── id: string
              ├── title: string
              ├── description: string
              ├── duration: string
              ├── order: number
              ├── type: 'article' | 'video'
              └── content: React.ReactNode
```

**Key Features:**

- Type-safe TypeScript interfaces
- Hierarchical module/lesson structure
- Rich content with React components
- Helper functions for backward compatibility

**Exports:**

- `course`: Main course object
- `CourseModule`: Module interface
- `CourseLesson`: Lesson interface
- `Course`: Course interface
- `getAllLessons()`: Helper to flatten all lessons
- `courseModules`: Legacy export for backward compatibility

### 2. Component Layer (`components/course/`)

Modular, reusable components for course functionality:

#### **ProgressBar.tsx**

Visual progress indicator component.

```tsx
<ProgressBar completed={5} total={10} />
```

**Features:**

- Percentage calculation
- Completion count display
- Customizable styling

#### **LessonContent.tsx**

Renders individual lesson content.

```tsx
<LessonContent lesson={currentLesson} />
```

**Features:**

- Type badge (article/video)
- Duration indicator
- Rich content rendering with prose styling
- Responsive layout

#### **CourseSidebar.tsx**

Navigation sidebar with module/lesson listing.

```tsx
<CourseSidebar
  modules={modules}
  currentLessonId={currentLesson.id}
  completedLessonIds={completedSet}
  onLessonSelect={handleSelect}
/>
```

**Features:**

- Module grouping
- Lesson completion indicators
- Progress bar integration
- Click-to-navigate
- Current lesson highlighting

#### **CourseModuleCard.tsx**

Display card for module overview.

```tsx
<CourseModuleCard
  module={module}
  isCompleted={isCompleted}
  isActive={isActive}
  onClick={handleClick}
/>
```

**Features:**

- Module metadata display
- Completion status
- Lesson count
- Progress percentage
- Click handler support

### 3. Player Component (`components/CoursePlayer.tsx`)

Main course player orchestrating all components.

**Features:**

- Lesson navigation (next/previous)
- Progress tracking
- Mark complete functionality
- Supabase integration for progress persistence
- Loading states
- Responsive layout

**Usage:**

```tsx
<CoursePlayer modules={course.modules} courseId="0-100-rating-course" userId={userId} />
```

### 4. Page Integration (`app/course/content/page.tsx`)

Server component handling:

- Authentication checks
- Course access verification
- User data loading
- Player rendering

## Course Content

The course includes 6 comprehensive modules covering VA disability claims:

### Module 1: Understanding Your DD-214 (15 min)

- Essential DD-214 information
- Key blocks to review
- How to obtain certified copies
- Common errors and corrections

### Module 2: Service-Connected Conditions (30 min)

- The three-part nexus requirement
- Common service-connected conditions
- Documentation strategy
- Buddy statements and evidence gathering

### Module 3: C&P Exam Mastery (45 min)

- Exam preparation checklist
- Communication strategies during exams
- Common examiner questions
- Post-exam follow-up

### Module 4: Claim Filing Strategy (30 min)

- Step-by-step filing process
- Evidence organization
- Form completion guide
- Claim tracking

### Module 5: Maximizing Your Rating (45 min)

- Combined rating formula explained
- Strategic filing approaches
- Secondary conditions strategy
- Rating criteria for common conditions

### Module 6: Appeals and Reconsideration (30 min)

- Understanding decision letters
- Common denial reasons
- Appeal options (Supplemental, Higher-Level, Board)
- Evidence gathering for appeals

## Progress Tracking

### Database Schema

Progress is stored in Supabase `course_progress` table:

```sql
course_progress
  ├── user_id (uuid)
  ├── course_id (text)
  ├── module_id (text)  -- Actually stores lesson_id
  ├── completed (boolean)
  ├── progress_percentage (integer)
  ├── last_accessed_at (timestamp)
  └── completed_at (timestamp)
```

### API Endpoints

**POST /api/course/progress**

```typescript
{
  userId: string
  courseId: string
  moduleId: string  // lesson_id
  completed: boolean
  progressPercentage?: number
}
```

**GET /api/course/progress**

```typescript
Query: userId, courseId
Response: { progress: ProgressRecord[] }
```

## Migration from Old System

### Deprecated Files

`components/CourseContent.tsx` - Marked as deprecated with migration notice. This file contains the old monolithic course content structure and should not be used in new code.

### Migration Path

1. Import from `@/constants/course` instead of `@/components/CourseContent`
2. Use `course.modules` instead of `courseModules`
3. Update component imports to use `@/components/course/`

## Styling

All components use:

- Tailwind CSS v4
- Shadcn UI components
- Glass morphism design
- Dark mode support
- Responsive layouts

## Best Practices

### Adding New Lessons

1. Add lesson content to appropriate module in `constants/course.ts`
2. Include proper TypeScript types
3. Use Shadcn UI components for consistency
4. Set appropriate `type` (article/video)
5. Provide accurate `duration`

### Adding New Modules

1. Add module to `course.modules` array
2. Include at least one lesson
3. Set appropriate `order` for sequencing
4. Provide clear title and description

### Content Guidelines

- Use proper markdown/JSX formatting
- Include visual elements (Cards, Alerts, Badges)
- Break content into digestible sections
- Provide actionable checklists
- Include relevant examples
- Use icons for visual hierarchy

## Future Enhancements

Potential improvements:

1. Video lesson support with player integration
2. Quiz/assessment functionality
3. Certificate generation on completion
4. Discussion forums per lesson
5. Note-taking functionality
6. Bookmark/favorite lessons
7. Search within course content
8. Downloadable resources
9. Mobile app integration
10. Analytics and engagement tracking

## Testing

To test the course system:

1. Start dev server: `bun dev`
2. Navigate to `/course/content` (requires authentication)
3. Verify course access (may need to update Supabase)
4. Test navigation between lessons
5. Test mark complete functionality
6. Verify progress persistence

## Troubleshooting

### Progress not saving

- Check Supabase connection
- Verify `course_progress` table exists
- Check user authentication
- Review browser console for errors

### Lessons not displaying

- Verify course data in `constants/course.ts`
- Check TypeScript compilation
- Review React component errors

### Navigation issues

- Check lesson IDs are unique
- Verify module array ordering
- Review CoursePlayer state management

## Maintenance

### Regular Updates

- Review VA policy changes
- Update course content accordingly
- Add new lessons as needed
- Improve existing content based on feedback

### Performance

- Monitor bundle size
- Lazy load heavy content if needed
- Optimize images and media
- Consider pagination for large courses

## Support

For issues or questions:

- Check component README files
- Review TypeScript types
- Examine existing implementations
- Test in development environment
