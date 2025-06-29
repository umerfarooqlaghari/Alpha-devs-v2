import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Consultancy() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-black mb-6">Software Consultancy</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">
              Expert technical guidance and strategic software consulting to accelerate your business growth 
              and optimize your technology investments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/mumerfarooqlaghari/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg"
              >
                Book Consultation
              </a>
              <a
                href="https://calendly.com/mumerfarooqlaghari/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black border-2 border-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
              >
                Schedule Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 bg-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-black mb-8">Why Choose Alpha-devs for Software Consultancy?</h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              In today's rapidly evolving digital landscape, making the right technology decisions can be the difference 
              between business success and stagnation. At Alpha-devs, we bring years of experience and deep technical 
              expertise to help you navigate complex software challenges and make informed decisions that drive growth.
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              Our consultancy approach is built on three core principles: <strong>understanding your business</strong>, 
              <strong>leveraging cutting-edge technology</strong>, and <strong>delivering measurable results</strong>. 
              We don't just provide recommendations – we partner with you to implement solutions that work.
            </p>

            <h3 className="text-2xl font-bold text-black mb-6">Our Consultancy Process</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="text-xl font-semibold text-black mb-4">1. Discovery & Assessment</h4>
                <p className="text-gray-600">
                  We start by thoroughly understanding your current technology stack, business processes, and goals. 
                  Our team conducts comprehensive audits to identify opportunities and challenges.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="text-xl font-semibold text-black mb-4">2. Strategic Planning</h4>
                <p className="text-gray-600">
                  Based on our assessment, we develop a detailed roadmap that aligns technology initiatives with 
                  your business objectives, ensuring maximum ROI and sustainable growth.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="text-xl font-semibold text-black mb-4">3. Implementation Guidance</h4>
                <p className="text-gray-600">
                  We provide hands-on support during implementation, offering technical expertise, best practices, 
                  and continuous guidance to ensure successful project delivery.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h4 className="text-xl font-semibold text-black mb-4">4. Ongoing Support</h4>
                <p className="text-gray-600">
                  Our relationship doesn't end at implementation. We provide ongoing monitoring, optimization, 
                  and strategic advice to help you adapt to changing business needs.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-black mb-6">Areas of Expertise</h3>
            
            <div className="space-y-6 mb-12">
              <div>
                <h4 className="text-xl font-semibold text-black mb-3">Architecture & Design</h4>
                <p className="text-gray-700">
                  We help you design scalable, maintainable software architectures that can grow with your business. 
                  From microservices to monoliths, we choose the right approach for your specific needs.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-black mb-3">Technology Stack Selection</h4>
                <p className="text-gray-700">
                  Choosing the right technologies is crucial for long-term success. We evaluate your requirements 
                  and recommend the most suitable frameworks, databases, and tools for your project.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-black mb-3">Performance Optimization</h4>
                <p className="text-gray-700">
                  Is your application running slowly? We identify bottlenecks and implement optimization strategies 
                  that can dramatically improve performance and user experience.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-black mb-3">Security & Compliance</h4>
                <p className="text-gray-700">
                  Security is paramount in today's digital world. We conduct security audits and implement 
                  robust security measures to protect your data and ensure compliance with industry standards.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-black mb-3">Team Training & Mentoring</h4>
                <p className="text-gray-700">
                  We believe in empowering your team. Our experts provide training sessions, code reviews, 
                  and mentoring to help your developers grow and adopt best practices.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-black mb-6">Success Stories</h3>
            
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 mb-8">
              <blockquote className="text-gray-700 italic mb-4">
                "Alpha-devs transformed our legacy system into a modern, scalable platform. Their consultancy 
                helped us reduce operational costs by 40% while improving performance by 300%. The team's 
                expertise and guidance were invaluable throughout the entire process."
              </blockquote>
              <cite className="text-black font-semibold">— Sarah Johnson, CTO at TechStart Inc.</cite>
            </div>

            <h3 className="text-2xl font-bold text-black mb-6">Why Our Approach Works</h3>
            
            <ul className="space-y-4 text-gray-700 mb-8">
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span><strong>Business-First Mindset:</strong> We always start with your business goals and work backwards to the technology.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span><strong>Proven Methodologies:</strong> Our processes are battle-tested across hundreds of projects and various industries.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span><strong>Hands-On Experience:</strong> Our consultants are active developers who understand real-world challenges.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span><strong>Long-Term Partnership:</strong> We build lasting relationships and provide ongoing support as your business evolves.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3 mt-1">✓</span>
                <span><strong>Measurable Results:</strong> Every recommendation comes with clear metrics and expected outcomes.</span>
              </li>
            </ul>

            <h3 className="text-2xl font-bold text-black mb-6">Getting Started</h3>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              Ready to take your software development to the next level? Our consultancy process begins with 
              a comprehensive assessment of your current situation and goals. During our initial consultation, 
              we'll discuss your challenges, objectives, and how our expertise can help you achieve success.
            </p>

            <p className="text-gray-700 leading-relaxed mb-8">
              Whether you're planning a new project, optimizing existing systems, or need strategic guidance 
              on technology decisions, we're here to help. Book a consultation today and discover how 
              Alpha-devs can accelerate your business growth through expert software consultancy.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-black text-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss your challenges and explore how our consultancy services can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/mumerfarooqlaghari/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book Free Consultation
            </a>
            <a
              href="https://calendly.com/mumerfarooqlaghari/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-black transition-colors"
            >
              Schedule Demo Call
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
