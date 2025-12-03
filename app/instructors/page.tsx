import { getInstructors } from '@/lib/cosmic'
import InstructorCard from '@/components/InstructorCard'
import type { Instructor } from '@/types'

export const metadata = {
  title: 'Our Instructors - AI Agent Academy',
  description: 'Meet our expert AI agent instructors',
}

export default async function InstructorsPage() {
  const instructors = await getInstructors() as Instructor[]

  return (
    <div className="py-16">
      <div className="container-custom">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Our Instructors</h1>
          <p className="text-xl text-gray-600">
            Learn from industry experts with years of AI agent experience
          </p>
        </div>

        {instructors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No instructors available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}