import Link from 'next/link'
import type { Course } from '@/types'

interface CourseCardProps {
  course: Course
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.slug}`} className="card block group">
      {course.metadata.featured_image && (
        <div className="aspect-video overflow-hidden">
          <img 
            src={`${course.metadata.featured_image.imgix_url}?w=800&h=450&fit=crop&auto=format,compress`}
            alt={course.metadata.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            width="800"
            height="450"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            course.metadata.difficulty_level.key === 'beginner' ? 'bg-green-100 text-green-800' :
            course.metadata.difficulty_level.key === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {course.metadata.difficulty_level.value}
          </span>
          
          {course.metadata.duration && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              {course.metadata.duration}
            </span>
          )}
        </div>
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
          {course.metadata.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {course.metadata.description}
        </p>
        
        {course.metadata.instructor && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {course.metadata.instructor.metadata.profile_photo && (
              <img 
                src={`${course.metadata.instructor.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={course.metadata.instructor.metadata.name}
                className="w-6 h-6 rounded-full object-cover"
                width="80"
                height="80"
              />
            )}
            <span>{course.metadata.instructor.metadata.name}</span>
          </div>
        )}
      </div>
    </Link>
  )
}