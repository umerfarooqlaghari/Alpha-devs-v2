'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Achieve the extraordinary",
      subtitle: "Alpha-devs delivers cutting-edge software development, AI solutions and digital transformation services – all in one platform.",
      buttonText: "Explore Our Services",
      buttonLink: "/services"
    },
    {
      title: "Transform your business with AI",
      subtitle: "Leverage our advanced AI solutions including Alpha-analytics and AI Voice Cloner to revolutionize your operations.",
      buttonText: "Discover AI Solutions",
      buttonLink: "/products/alpha-analytics"
    },
    {
      title: "Build the future today",
      subtitle: "From web development to mobile apps, we create innovative solutions that drive your business forward.",
      buttonText: "Start Your Project",
      buttonLink: "/contact"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen flex items-center overflow-hidden w-full">
      {/* Floating Icons - Hidden on mobile for better performance */}
      <div className="absolute inset-0 overflow-hidden hidden lg:block">
        <div className="floating-icon absolute top-20 left-10 w-12 h-12 lg:w-16 lg:h-16 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg animate-float">
          <div className="w-full h-full flex items-center justify-center text-gray-700 text-lg lg:text-2xl">⚡</div>
        </div>
        <div className="floating-icon absolute top-32 right-20 w-16 h-16 lg:w-20 lg:h-20 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg animate-float-delayed">
          <div className="w-full h-full flex items-center justify-center text-gray-700 text-lg lg:text-2xl">🚀</div>
        </div>
        <div className="floating-icon absolute bottom-32 left-20 w-14 h-14 lg:w-18 lg:h-18 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg animate-float">
          <div className="w-full h-full flex items-center justify-center text-gray-700 text-lg lg:text-2xl">💡</div>
        </div>
        <div className="floating-icon absolute bottom-20 right-32 w-12 h-12 lg:w-14 lg:h-14 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg animate-float-delayed">
          <div className="w-full h-full flex items-center justify-center text-gray-700 text-base lg:text-xl">🎯</div>
        </div>
        <div className="floating-icon absolute top-1/2 right-10 w-12 h-12 lg:w-16 lg:h-16 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg animate-float">
          <div className="w-full h-full flex items-center justify-center text-gray-700 text-lg lg:text-2xl">🔥</div>
        </div>
        <div className="floating-icon absolute top-1/3 left-1/3 w-10 h-10 lg:w-12 lg:h-12 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg animate-float-delayed">
          <div className="w-full h-full flex items-center justify-center text-gray-700 text-base lg:text-xl">⭐</div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 lg:space-y-10 text-center lg:text-left">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-black leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {slides[currentSlide].subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center lg:justify-start">
              <Link
                href={slides[currentSlide].buttonLink}
                className="bg-black text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg text-base sm:text-lg text-center"
              >
                {slides[currentSlide].buttonText}
              </Link>
              <Link
                href="/about"
                className="bg-white text-black border-2 border-black px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 text-base sm:text-lg text-center"
              >
                Learn More
              </Link>
            </div>

            {/* Slide Indicators */}
            <div className="flex space-x-3 justify-center lg:justify-start">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-black shadow-lg' : 'bg-gray-400 hover:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Visual Elements */}
          <div className="relative mt-12 lg:mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
              <div className="space-y-4 lg:space-y-6">
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg transform rotate-1 sm:rotate-3 hover:rotate-0 transition-all duration-500">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-gray-800 to-black rounded-xl mb-4 lg:mb-6 shadow-md"></div>
                  <h3 className="font-bold text-black text-base sm:text-lg mb-2">Web Development</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Modern, responsive websites</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg transform -rotate-1 sm:-rotate-2 hover:rotate-0 transition-all duration-500">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-gray-800 to-black rounded-xl mb-4 lg:mb-6 shadow-md"></div>
                  <h3 className="font-bold text-black text-base sm:text-lg mb-2">AI Solutions</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Cutting-edge AI technology</p>
                </div>
              </div>
              <div className="space-y-4 lg:space-y-6 sm:mt-6 lg:mt-12">
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg transform rotate-1 sm:rotate-2 hover:rotate-0 transition-all duration-500">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-gray-800 to-black rounded-xl mb-4 lg:mb-6 shadow-md"></div>
                  <h3 className="font-bold text-black text-base sm:text-lg mb-2">Mobile Apps</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">iOS & Android development</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg transform -rotate-1 hover:rotate-0 transition-all duration-500">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-gray-800 to-black rounded-xl mb-4 lg:mb-6 shadow-md"></div>
                  <h3 className="font-bold text-black text-base sm:text-lg mb-2">Consulting</h3>
                  <p className="text-gray-600 text-xs sm:text-sm">Expert technical guidance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
