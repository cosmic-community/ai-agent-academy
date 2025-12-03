import Link from 'next/link'
import type { Lesson } from '@/types'

interface LessonCardProps {
  lesson: Lesson
  courseSlug: string
}

export default function LessonCard({ lesson, courseSlug }: LessonCardProps) {
  return (
    <Link 
      href={`/courses/${courseSlug}/lessons/${lesson.slug}`}
      className="card block group p-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center font-bold">
            {lesson.metadata.order}
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary-600 transition-colors">
            {lesson.metadata.title}
          </h3>
          
          <div className="flex items-center gap-4 text-sm text-gray-600">
            {lesson.metadata.video_url && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Video
              </span>
            )}
            <span>Lesson {lesson.metadata.order}</span>
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <svg 
            className="w-6 h-6 text-gray-400 group-hover:text-primary-600 transition-colors" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  )
}