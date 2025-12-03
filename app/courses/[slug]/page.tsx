// app/courses/[slug]/page.tsx
import { getCourseBySlug, getLessonsByCourse } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import LessonCard from '@/components/LessonCard'
import type { Course, Lesson } from '@/types'

interface CoursePageProps {
  params: Promise<{ slug: string }>
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params
  const course = await getCourseBySlug(slug) as Course | null

  if (!course) {
    notFound()
  }

  const lessons = await getLessonsByCourse(course.id) as Lesson[]

  return (
    <div className="py-16">
      <div className="container-custom">
        {/* Course Header */}
        <div className="mb-12">
          <Link href="/courses" className="text-primary-600 hover:text-primary-700 mb-4 inline-block">
            ← Back to Courses
          </Link>
          
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              {course.metadata.featured_image && (
                <img 
                  src={`${course.metadata.featured_image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
                  alt={course.title}
                  className="w-full h-64 object-cover rounded-xl shadow-lg mb-6"
                  width="800"
                  height="500"
                />
              )}
            </div>
            
            <div>
              <h1 className="text-4xl font-bold mb-4">{course.metadata.title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  course.metadata.difficulty_level.key === 'beginner' ? 'bg-green-100 text-green-800' :
                  course.metadata.difficulty_level.key === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {course.metadata.difficulty_level.value}
                </span>
                
                {course.metadata.duration && (
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                    {course.metadata.duration}
                  </span>
                )}
              </div>
              
              <p className="text-lg text-gray-600 mb-6">
                {course.metadata.description}
              </p>
              
              {course.metadata.instructor && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                  {course.metadata.instructor.metadata.profile_photo && (
                    <img 
                      src={`${course.metadata.instructor.metadata.profile_photo.imgix_url}?w=100&h=100&fit=crop&auto=format,compress`}
                      alt={course.metadata.instructor.metadata.name}
                      className="w-12 h-12 rounded-full object-cover"
                      width="100"
                      height="100"
                    />
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Instructor</p>
                    <Link 
                      href={`/instructors/${course.metadata.instructor.slug}`}
                      className="font-medium text-primary-600 hover:text-primary-700"
                    >
                      {course.metadata.instructor.metadata.name}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Course Lessons */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Course Lessons</h2>
          
          {lessons.length === 0 ? (
            <p className="text-gray-600">No lessons available for this course yet.</p>
          ) : (
            <div className="grid gap-4">
              {lessons.map((lesson) => (
                <LessonCard 
                  key={lesson.id} 
                  lesson={lesson} 
                  courseSlug={course.slug}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}