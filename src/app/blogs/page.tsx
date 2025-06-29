import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Blogs() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-black mb-6">Alpha-devs Blog</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Insights, tutorials, and industry updates from our team of experts
            </p>
          </div>
        </div>
      </section>

      {/* Under Development Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Construction Icon */}
          <div className="mb-12">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center border border-gray-300 shadow-lg">
              <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-black">Coming Soon!</h2>
            
            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
              We're working hard to bring you valuable content about software development, 
              AI innovations, and industry best practices. Our blog will feature:
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="w-16 h-16 bg-black rounded-lg mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Technical Tutorials</h3>
                <p className="text-gray-600 text-sm">Step-by-step guides and coding tutorials</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gray-800 rounded-lg mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Industry Insights</h3>
                <p className="text-gray-600 text-sm">Latest trends and technology updates</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Best Practices</h3>
                <p className="text-gray-600 text-sm">Expert tips and development strategies</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gray-600 rounded-lg mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Case Studies</h3>
                <p className="text-gray-600 text-sm">Real-world project breakdowns</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gray-500 rounded-lg mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">AI & Innovation</h3>
                <p className="text-gray-600 text-sm">Cutting-edge AI developments</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gray-400 rounded-lg mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Team Stories</h3>
                <p className="text-gray-600 text-sm">Behind-the-scenes insights</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-16 p-8 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="text-2xl font-bold text-black mb-4">What to Expect</h3>
              <div className="space-y-4 text-left max-w-2xl mx-auto">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-black rounded-full mr-4 flex-shrink-0"></div>
                  <span className="text-gray-700">Weekly technical articles and tutorials</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-800 rounded-full mr-4 flex-shrink-0"></div>
                  <span className="text-gray-700">Monthly industry analysis and trends</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-600 rounded-full mr-4 flex-shrink-0"></div>
                  <span className="text-gray-700">Quarterly deep-dive case studies</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full mr-4 flex-shrink-0"></div>
                  <span className="text-gray-700">Interactive content and community discussions</span>
                </div>
              </div>
            </div>

            {/* Notification */}
            <div className="mt-12 p-6 bg-black text-white rounded-xl">
              <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
              <p className="text-gray-300 mb-4">
                Want to be notified when we launch? Follow us on social media or contact us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/contact"
                  className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Contact Us
                </a>
                <a
                  href="/about"
                  className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
                >
                  Learn More About Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
