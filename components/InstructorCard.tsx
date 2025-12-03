import Link from 'next/link'
import type { Instructor } from '@/types'

interface InstructorCardProps {
  instructor: Instructor
}

export default function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <Link href={`/instructors/${instructor.slug}`} className="card block group text-center">
      <div className="p-6">
        {instructor.metadata.profile_photo && (
          <img 
            src={`${instructor.metadata.profile_photo.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
            alt={instructor.metadata.name}
            className="w-32 h-32 rounded-full object-cover mx-auto mb-4 group-hover:scale-105 transition-transform duration-200"
            width="400"
            height="400"
          />
        )}
        
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
          {instructor.metadata.name}
        </h3>
        
        {instructor.metadata.expertise && (
          <p className="text-primary-600 font-medium mb-3">
            {instructor.metadata.expertise}
          </p>
        )}
        
        {instructor.metadata.bio && (
          <p className="text-gray-600 text-sm line-clamp-3">
            {instructor.metadata.bio}
          </p>
        )}
      </div>
    </Link>
  )
}