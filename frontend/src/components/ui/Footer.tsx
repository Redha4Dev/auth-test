

export default function Footer() {
    return(
        <footer className="bg-gray-900 text-white py-8 min-w-full bg-opacity-95">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h2 className="text-2xl font-bold">ServiceName</h2>
              <p className="text-gray-400 mt-2">
                Creating amazing experiences through innovative solutions.
              </p>
            </div>
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            {/* Social Links */}
            <div>
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <div className="flex space-x-4 mt-2">
                
              </div>
            </div>
          </div>
        </div>

        {/* Centered Copyright Text */}
        <div className="flex justify-center items-center text-gray-500 text-sm mt-6 border-t border-gray-800 pt-4">
          &copy; {new Date().getFullYear()} ServiceName. All rights reserved.
        </div>
      </footer>
    )
}