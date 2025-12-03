import { getPageBySlug } from '@/lib/cosmic'
import { notFound } from 'next/navigation'
import type { Page } from '@/types'
import ReactMarkdown from 'react-markdown'

export const metadata = {
  title: 'About - AI Agent Academy',
  description: 'Learn about AI Agent Academy and our mission to democratize AI agent education',
}

export default async function AboutPage() {
  const page = await getPageBySlug('about-ai-agent-academy') as Page | null

  if (!page) {
    notFound()
  }

  const heroImage = page.metadata.hero_image?.imgix_url

  return (
    <div>
      {/* Hero Section */}
      {heroImage && (
        <section className="relative h-64 bg-gray-900">
          <img 
            src={`${heroImage}?w=2400&h=512&fit=crop&auto=format,compress`}
            alt={page.metadata.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              {page.metadata.title}
            </h1>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {!heroImage && (
              <h1 className="text-4xl sm:text-5xl font-bold mb-8">
                {page.metadata.title}
              </h1>
            )}
            
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-4xl font-bold mb-6 mt-8">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-3xl font-bold mb-4 mt-8">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-2xl font-bold mb-3 mt-6">{children}</h3>,
                  p: ({ children }) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="text-gray-700">{children}</li>,
                  strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
                  a: ({ href, children }) => (
                    <a href={href} className="text-primary-600 hover:text-primary-700 underline">
                      {children}
                    </a>
                  ),
                }}
              >
                {page.metadata.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}