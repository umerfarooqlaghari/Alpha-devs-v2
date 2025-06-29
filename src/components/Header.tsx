'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProductsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown when pressing Escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProductsOpen(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return (
    <header className="bg-gray-800/95 backdrop-blur-sm sticky top-0 z-50 border-b border-gray-600 shadow-lg">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.jpg"
                alt="Alpha-devs Logo"
                width={48}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-200 hover:text-white transition-all duration-300 font-medium">
              Home
            </Link>
            <Link href="/services" className="text-gray-200 hover:text-white transition-all duration-300 font-medium">
              Services
            </Link>
            <Link href="/consultancy" className="text-gray-200 hover:text-white transition-all duration-300 font-medium">
              Consultancy
            </Link>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="text-gray-200 hover:text-white transition-all duration-300 flex items-center space-x-2 font-medium group"
              >
                <span>Products</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isProductsOpen && (
                <div className="absolute top-full left-0 mt-3 w-64 bg-gray-700 rounded-xl shadow-xl border border-gray-600 animate-fade-in">
                  <div className="p-2">
                    <Link
                      href="/products/alpha-analytics"
                      className="flex items-center px-4 py-4 text-gray-200 hover:bg-gray-600 hover:text-white transition-all duration-300 rounded-xl group"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg mr-4 flex items-center justify-center transition-all duration-300">
                        <span className="text-white text-lg">📊</span>
                      </div>
                      <div>
                        <div className="font-semibold">Alpha-analytics</div>
                        <div className="text-sm text-gray-300">AI-powered analytics platform</div>
                      </div>
                    </Link>
                    <Link
                      href="/products/ai-voice-cloner"
                      className="flex items-center px-4 py-4 text-gray-200 hover:bg-gray-600 hover:text-white transition-all duration-300 rounded-xl group"
                      onClick={() => setIsProductsOpen(false)}
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg mr-4 flex items-center justify-center transition-all duration-300">
                        <span className="text-white text-lg">🎤</span>
                      </div>
                      <div>
                        <div className="font-semibold">AI Voice Cloner</div>
                        <div className="text-sm text-gray-300">Advanced voice synthesis</div>
                      </div>
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link href="/about" className="text-gray-200 hover:text-white transition-all duration-300 font-medium">
              About
            </Link>
            <Link href="/contact" className="text-gray-200 hover:text-white transition-all duration-300 font-medium">
              Contact
            </Link>
            <Link href="/blogs" className="text-gray-200 hover:text-white transition-all duration-300 font-medium">
              Blogs
            </Link>
          </nav>

          {/* Search and User */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block text-gray-200 hover:text-white transition-all duration-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link
              href="/contact"
              className="hidden md:block bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              Get Started
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-200 hover:text-white transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700 border-t border-gray-600">
          <div className="px-4 py-4 space-y-2">
            <Link
              href="/"
              className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-600 rounded-xl transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/services"
              className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-600 rounded-xl transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/consultancy"
              className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-600 rounded-xl transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Consultancy
            </Link>
            <div className="px-4 py-3">
              <button
                onClick={() => setIsProductsOpen(!isProductsOpen)}
                className="flex items-center justify-between w-full text-gray-200 hover:text-white transition-all duration-300"
              >
                <span className="font-medium">Products</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isProductsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isProductsOpen && (
                <div className="mt-3 ml-4 space-y-2 animate-fade-in">
                  <Link
                    href="/products/alpha-analytics"
                    className="flex items-center px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-600 rounded-xl transition-all duration-300"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsProductsOpen(false);
                    }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg mr-3 flex items-center justify-center">
                      <span className="text-white text-sm">📊</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-200">Alpha-analytics</div>
                      <div className="text-xs text-gray-300">AI-powered analytics</div>
                    </div>
                  </Link>
                  <Link
                    href="/products/ai-voice-cloner"
                    className="flex items-center px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-600 rounded-xl transition-all duration-300"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsProductsOpen(false);
                    }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg mr-3 flex items-center justify-center">
                      <span className="text-white text-sm">🎤</span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-200">AI Voice Cloner</div>
                      <div className="text-xs text-gray-300">Voice synthesis</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>
            <Link
              href="/about"
              className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-600 rounded-xl transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-600 rounded-xl transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/blogs"
              className="block px-4 py-3 text-gray-200 hover:text-white hover:bg-gray-600 rounded-xl transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blogs
            </Link>
            <div className="px-4 py-2">
              <Link
                href="/contact"
                className="block w-full bg-black text-white px-4 py-3 rounded-xl hover:bg-gray-800 transition-colors text-center font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
