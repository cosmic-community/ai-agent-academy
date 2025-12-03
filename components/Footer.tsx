import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="font-bold text-xl text-white">AI Agent Academy</span>
            </div>
            <p className="text-gray-400">
              Master AI agents with expert-led courses and hands-on learning experiences.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="hover:text-primary-400 transition-colors">
                  All Courses
                </Link>
              </li>
              <li>
                <Link href="/instructors" className="hover:text-primary-400 transition-colors">
                  Instructors
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-white mb-4">Learn More</h3>
            <p className="text-gray-400">
              Built with <a href="https://www.cosmicjs.com" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300">Cosmic</a> headless CMS
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} AI Agent Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}