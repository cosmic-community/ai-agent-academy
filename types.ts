// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  published_at?: string;
}

// Instructor interface
export interface Instructor extends CosmicObject {
  type: 'instructors';
  metadata: {
    name: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
    expertise?: string;
  };
}

// Course interface
export interface Course extends CosmicObject {
  type: 'courses';
  metadata: {
    title: string;
    description: string;
    difficulty_level: {
      key: 'beginner' | 'intermediate' | 'advanced';
      value: 'Beginner' | 'Intermediate' | 'Advanced';
    };
    duration?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    instructor?: Instructor;
  };
}

// Lesson interface
export interface Lesson extends CosmicObject {
  type: 'lessons';
  metadata: {
    title: string;
    content: string;
    video_url?: string;
    course: Course;
    order: number;
  };
}

// Page interface
export interface Page extends CosmicObject {
  type: 'pages';
  metadata: {
    title: string;
    content: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

// Type guard for runtime type checking
export function isCourse(obj: CosmicObject): obj is Course {
  return obj.type === 'courses';
}

export function isLesson(obj: CosmicObject): obj is Lesson {
  return obj.type === 'lessons';
}

export function isInstructor(obj: CosmicObject): obj is Instructor {
  return obj.type === 'instructors';
}

export function isPage(obj: CosmicObject): obj is Page {
  return obj.type === 'pages';
}