import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">AI</span>
            </div>
            <span className="font-bold text-xl">AI Agent Academy</span>
          </Link>
          
          <div className="flex items-center gap-8">
            <Link 
              href="/courses" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Courses
            </Link>
            <Link 
              href="/instructors" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              Instructors
            </Link>
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}