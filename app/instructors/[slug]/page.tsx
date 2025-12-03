// app/instructors/[slug]/page.tsx
import { getInstructorBySlug, getCoursesByInstructor } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CourseCard from '@/components/CourseCard'
import type { Instructor, Course } from '@/types'

interface InstructorPageProps {
  params: Promise<{ slug: string }>
}

export default async function InstructorPage({ params }: InstructorPageProps) {
  const { slug } = await params
  const instructor = await getInstructorBySlug(slug) as Instructor | null

  if (!instructor) {
    notFound()
  }

  const courses = await getCoursesByInstructor(instructor.id) as Course[]

  return (
    <div className="py-16">
      <div className="container-custom">
        <Link href="/instructors" className="text-primary-600 hover:text-primary-700 mb-6 inline-block">
          ← Back to Instructors
        </Link>

        {/* Instructor Profile */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {instructor.metadata.profile_photo && (
              <img 
                src={`${instructor.metadata.profile_photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                alt={instructor.metadata.name}
                className="w-48 h-48 rounded-full object-cover shadow-lg"
                width="400"
                height="400"
              />
            )}
            
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{instructor.metadata.name}</h1>
              
              {instructor.metadata.expertise && (
                <p className="text-lg text-primary-600 font-medium mb-6">
                  {instructor.metadata.expertise}
                </p>
              )}
              
              {instructor.metadata.bio && (
                <p className="text-gray-600 text-lg leading-relaxed">
                  {instructor.metadata.bio}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Instructor's Courses */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Courses by {instructor.metadata.name}</h2>
          
          {courses.length === 0 ? (
            <p className="text-gray-600">This instructor hasn't created any courses yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}