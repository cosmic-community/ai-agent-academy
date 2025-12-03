# AI Agent Academy

![App Preview](https://imgix.cosmicjs.com/fa6dd1f0-a455-11ed-81f2-f50e185dd248-WJL4c7-eTlI.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern online education platform built with Next.js 16 and Cosmic CMS, designed to help people learn how to use AI agents. This platform provides a comprehensive learning experience with structured courses, detailed lessons, video content, and expert instructors.

## Features

- 📚 **Course Catalog** - Browse AI agent courses organized by difficulty level (Beginner, Intermediate, Advanced)
- 📖 **Structured Lessons** - Step-by-step lessons with markdown content, video embeds, and sequential ordering
- 👤 **Instructor Profiles** - Learn from expert instructors with detailed profiles and areas of expertise
- 🎥 **Video Integration** - Embedded YouTube/Vimeo videos for enhanced learning experiences
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Clean, professional design with smooth animations and intuitive navigation
- ⚡ **Fast Performance** - Built with Next.js 16 App Router and server-side rendering for optimal speed
- 🔍 **SEO Optimized** - Proper metadata and semantic HTML for search engine visibility

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=693065e7a3d8a63c853554e8&clone_repository=69306a1aa3d8a63c8535550e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create an online education platform for people wanting to learn how to use AI agents."

### Code Generation Prompt

> Based on the content model I created for "Create an online education platform for people wanting to learn how to use AI agents.", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **React Markdown** - Markdown rendering for lesson content
- **Bun** - Fast JavaScript runtime and package manager

## Getting Started

### Prerequisites

- Bun installed on your system
- A Cosmic account with the education platform content model set up

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file in the root directory with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching All Courses

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: courses } = await cosmic.objects
  .find({ type: 'courses' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Course with Lessons

```typescript
const { object: course } = await cosmic.objects.findOne({
  type: 'courses',
  slug: courseSlug
}).depth(1)

// Get all lessons for this course
const { objects: lessons } = await cosmic.objects
  .find({
    type: 'lessons',
    'metadata.course': course.id
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Sort lessons by order
const sortedLessons = lessons.sort((a, b) => 
  (a.metadata.order || 0) - (b.metadata.order || 0)
)
```

### Fetching Instructor Profile

```typescript
const { object: instructor } = await cosmic.objects.findOne({
  type: 'instructors',
  slug: instructorSlug
}).depth(1)

// Get all courses taught by this instructor
const { objects: courses } = await cosmic.objects
  .find({
    type: 'courses',
    'metadata.instructor': instructor.id
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses Cosmic CMS for all content management. The content structure includes:

### Object Types

1. **Courses** - Main course content with:
   - Title, Description, Difficulty Level
   - Duration, Featured Image
   - Connected Instructor (object relationship)

2. **Lessons** - Individual lesson content with:
   - Title, Content (Markdown)
   - Video URL (YouTube/Vimeo embed)
   - Connected Course (object relationship)
   - Order number for sequencing

3. **Instructors** - Instructor profiles with:
   - Name, Bio, Profile Photo
   - Expertise area

### Key Features

- **Object Relationships** - Courses connect to Instructors, Lessons connect to Courses
- **Depth Parameter** - Using `depth(1)` to fetch related objects in a single query
- **Markdown Content** - Lessons use markdown for rich text formatting
- **Media Management** - Images stored and optimized through Cosmic's media library
- **Select Dropdown** - Difficulty levels use exact values: "beginner", "intermediate", "advanced"

## Deployment Options

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository in Netlify
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables in Netlify dashboard
6. Deploy

## Project Structure

```
├── app/
│   ├── courses/
│   │   ├── [slug]/
│   │   │   ├── page.tsx           # Course detail page
│   │   │   └── lessons/
│   │   │       └── [lessonSlug]/
│   │   │           └── page.tsx   # Lesson detail page
│   │   └── page.tsx               # Courses listing page
│   ├── instructors/
│   │   ├── [slug]/
│   │   │   └── page.tsx          # Instructor profile page
│   │   └── page.tsx              # Instructors listing page
│   ├── layout.tsx                # Root layout with navigation
│   └── page.tsx                  # Homepage
├── components/
│   ├── CourseCard.tsx            # Course display component
│   ├── LessonCard.tsx            # Lesson display component
│   ├── InstructorCard.tsx        # Instructor display component
│   ├── Navigation.tsx            # Main navigation
│   ├── Footer.tsx                # Footer component
│   └── CosmicBadge.tsx          # Built with Cosmic badge
├── lib/
│   └── cosmic.ts                 # Cosmic SDK configuration
├── types.ts                      # TypeScript type definitions
└── public/
    └── dashboard-console-capture.js  # Console debugging script
```

## License

MIT

<!-- README_END -->