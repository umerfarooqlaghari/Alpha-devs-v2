import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="gradient-secondary border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-accent rounded-xl flex items-center justify-center neon-blue">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-2xl font-bold gradient-text">Alpha Devs</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              Leading software development company specializing in cutting-edge technology solutions
              and digital transformation services.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-300 hover:scale-110">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold gradient-text-accent">Services</h3>
            <ul className="space-y-3">
              <li><Link href="/services/web-development" className="text-gray-300 hover:text-blue-400 transition-all duration-300 text-lg">Web Development</Link></li>
              <li><Link href="/services/mobile-development" className="text-gray-300 hover:text-blue-400 transition-all duration-300 text-lg">Mobile Development</Link></li>
              <li><Link href="/services/ai-solutions" className="text-gray-300 hover:text-blue-400 transition-all duration-300 text-lg">AI Solutions</Link></li>
              <li><Link href="/services/consulting" className="text-gray-300 hover:text-blue-400 transition-all duration-300 text-lg">Software Consultancy</Link></li>
              <li><Link href="/services/ecommerce" className="text-gray-300 hover:text-blue-400 transition-all duration-300 text-lg">E-commerce Solutions</Link></li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Products</h3>
            <ul className="space-y-2">
              <li><Link href="/products/alpha-analytics" className="text-gray-400 hover:text-white transition-colors">Alpha-analytics</Link></li>
              <li><Link href="/products/ai-voice-cloner" className="text-gray-400 hover:text-white transition-colors">AI Voice Cloner</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@alpha-devs.com</li>
              <li>Phone: +92 (300) 9243063</li>
              <li>Address: 1st Street, PCSIR Labs, Karachi</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-lg">
            © 2024 Alpha-devs. All rights reserved.
          </p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-blue-400 text-lg transition-all duration-300">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-400 hover:text-blue-400 text-lg transition-all duration-300">Terms of Service</Link>
            <Link href="/cookies" className="text-gray-400 hover:text-blue-400 text-lg transition-all duration-300">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
