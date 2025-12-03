// app/courses/[slug]/lessons/[lessonSlug]/page.tsx
import { getLessonBySlug } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Lesson } from '@/types'

interface LessonPageProps {
  params: Promise<{ slug: string; lessonSlug: string }>
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug, lessonSlug } = await params
  const lesson = await getLessonBySlug(lessonSlug) as Lesson | null

  if (!lesson) {
    notFound()
  }

  return (
    <div className="py-16">
      <div className="container-custom max-w-4xl">
        <Link 
          href={`/courses/${slug}`}
          className="text-primary-600 hover:text-primary-700 mb-6 inline-block"
        >
          ← Back to Course
        </Link>
        
        <article>
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm font-medium text-gray-600">
                Lesson {lesson.metadata.order}
              </span>
              {lesson.metadata.course && (
                <>
                  <span className="text-gray-400">•</span>
                  <Link 
                    href={`/courses/${lesson.metadata.course.slug}`}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    {lesson.metadata.course.metadata.title}
                  </Link>
                </>
              )}
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{lesson.metadata.title}</h1>
          </header>

          {/* Video Section */}
          {lesson.metadata.video_url && (
            <div className="mb-8">
              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden">
                <iframe
                  src={lesson.metadata.video_url}
                  title={lesson.metadata.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Lesson Content */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {lesson.metadata.content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  )
}