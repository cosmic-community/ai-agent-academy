import Link from 'next/link'
import { getCourses, getInstructors } from '@/lib/cosmic'
import CourseCard from '@/components/CourseCard'
import InstructorCard from '@/components/InstructorCard'
import type { Course, Instructor } from '@/types'

export default async function HomePage() {
  const courses = await getCourses() as Course[]
  const instructors = await getInstructors() as Instructor[]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Master AI Agents
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-primary-100">
              Learn to build, deploy, and optimize AI agents with expert-led courses
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/courses" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
                Browse Courses
              </Link>
              <Link href="/instructors" className="btn-secondary bg-transparent border-white text-white hover:bg-white hover:text-primary-600">
                Meet Instructors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Courses</h2>
            <Link href="/courses" className="text-primary-600 hover:text-primary-700 font-medium">
              View All →
            </Link>
          </div>
          
          {courses.length === 0 ? (
            <p className="text-gray-600">No courses available yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.slice(0, 3).map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Instructors */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Expert Instructors</h2>
            <Link href="/instructors" className="text-primary-600 hover:text-primary-700 font-medium">
              View All →
            </Link>
          </div>
          
          {instructors.length === 0 ? (
            <p className="text-gray-600">No instructors available yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructors.slice(0, 3).map((instructor) => (
                <InstructorCard key={instructor.id} instructor={instructor} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of learners mastering AI agents with our comprehensive courses
            </p>
            <Link href="/courses" className="btn-primary inline-block">
              Get Started Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}