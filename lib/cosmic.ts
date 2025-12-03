import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
  apiEnvironment: 'staging'
})

// Helper function for error checking
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch all courses
export async function getCourses() {
  try {
    const response = await cosmic.objects
      .find({ type: 'courses' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects || [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch courses');
  }
}

// Fetch a single course by slug
export async function getCourseBySlug(slug: string) {
  try {
    const response = await cosmic.objects.findOne({
      type: 'courses',
      slug
    }).depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch course');
  }
}

// Fetch lessons for a course
export async function getLessonsByCourse(courseId: string) {
  try {
    const response = await cosmic.objects
      .find({
        type: 'lessons',
        'metadata.course': courseId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const lessons = response.objects || [];
    
    // Sort lessons by order
    return lessons.sort((a: any, b: any) => 
      (a.metadata?.order || 0) - (b.metadata?.order || 0)
    );
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch lessons');
  }
}

// Fetch a single lesson by slug
export async function getLessonBySlug(slug: string) {
  try {
    const response = await cosmic.objects.findOne({
      type: 'lessons',
      slug
    }).depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch lesson');
  }
}

// Fetch all instructors
export async function getInstructors() {
  try {
    const response = await cosmic.objects
      .find({ type: 'instructors' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects || [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch instructors');
  }
}

// Fetch a single instructor by slug
export async function getInstructorBySlug(slug: string) {
  try {
    const response = await cosmic.objects.findOne({
      type: 'instructors',
      slug
    }).depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch instructor');
  }
}

// Fetch courses by instructor
export async function getCoursesByInstructor(instructorId: string) {
  try {
    const response = await cosmic.objects
      .find({
        type: 'courses',
        'metadata.instructor': instructorId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects || [];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch courses');
  }
}

// Fetch a single page by slug
export async function getPageBySlug(slug: string) {
  try {
    const response = await cosmic.objects.findOne({
      type: 'pages',
      slug
    }).depth(1);
    
    return response.object;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch page');
  }
}