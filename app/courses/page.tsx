import { getCourses } from '@/lib/cosmic'
import CourseCard from '@/components/CourseCard'
import type { Course } from '@/types'

export const metadata = {
  title: 'All Courses - AI Agent Academy',
  description: 'Browse all available AI agent courses',
}

export default async function CoursesPage() {
  const courses = await getCourses() as Course[]

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">All Courses</h1>
          <p className="text-xl text-gray-600">
            Explore our comprehensive collection of AI agent courses
          </p>
        </div>

        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No courses available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}