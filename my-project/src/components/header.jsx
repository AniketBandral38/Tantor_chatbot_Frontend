import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://tantor.ai/wp-content/uploads/2024/10/Tantor-White-414x100.png" 
              alt="Tantor Logo" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link to="/platform" className="text-white hover:text-blue-400 transition-colors">
              Platform
            </Link>
            <Link to="/about" className="text-white hover:text-blue-400 transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-white hover:text-blue-400 transition-colors">
              Contact Us
            </Link>
            <Link to="/resources" className="text-white hover:text-blue-400 transition-colors">
              Resources
            </Link>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Contact Sales
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header