import Header from '@/components/Header';
import Footer from '@/components/Footer';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechStart Inc.",
    content: "Alpha-devs transformed our legacy system into a modern, scalable platform. Their expertise in AI and cloud technologies helped us reduce costs by 40% while improving performance significantly.",
    rating: 5,
    image: "SJ"
  },
  {
    name: "Michael Chen",
    role: "Founder",
    company: "InnovateLab",
    content: "Working with Alpha-devs was a game-changer for our startup. They delivered a complex AI-powered analytics platform on time and within budget. Highly recommended!",
    rating: 5,
    image: "MC"
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager",
    company: "DataFlow Solutions",
    content: "The team's attention to detail and technical expertise is outstanding. They built us a custom voice cloning solution that exceeded our expectations in every way.",
    rating: 5,
    image: "ER"
  },
  {
    name: "David Thompson",
    role: "CEO",
    company: "NextGen Apps",
    content: "Alpha-devs doesn't just code; they understand business needs. Their consultancy helped us make strategic technology decisions that saved us months of development time.",
    rating: 5,
    image: "DT"
  },
  {
    name: "Lisa Wang",
    role: "Operations Director",
    company: "SmartRetail Co.",
    content: "From mobile app development to backend infrastructure, Alpha-devs delivered a complete solution. Their ongoing support has been invaluable to our growth.",
    rating: 5,
    image: "LW"
  },
  {
    name: "James Miller",
    role: "Tech Lead",
    company: "CloudFirst Systems",
    content: "The quality of code and architecture design from Alpha-devs is exceptional. They follow best practices and deliver maintainable, scalable solutions.",
    rating: 5,
    image: "JM"
  }
];

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-black mb-6">About Alpha-devs</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We are a passionate team of developers, designers, and innovators dedicated to
              creating cutting-edge software solutions that transform businesses and drive growth.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-black">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  <strong className="text-black">Since 2020</strong>, Alpha-devs has been at the forefront of software innovation.
                  What started as a small team of passionate developers has grown into a leading
                  software development company serving clients worldwide.
                </p>
                <p>
                  Our journey began with a simple idea: to bridge the gap between complex technology
                  and practical business solutions. We believe that great software should not only
                  solve problems but also create new opportunities for growth and innovation.
                </p>
                <p>
                  Today, we specialize in web development, mobile applications, AI solutions, and
                  digital transformation services. Our team combines technical expertise with
                  creative thinking to deliver solutions that exceed expectations.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-2xl p-8 shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-black mb-2">50+</div>
                  <div className="text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-black mb-2">100%</div>
                  <div className="text-gray-600">Job Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-black mb-2">4+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-black mb-2">10+</div>
                  <div className="text-gray-600">Team Members</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Our Values</h2>
            <p className="text-xl text-gray-700">The principles that guide everything we do</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-lg mx-auto mb-6 flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">Innovation</h3>
              <p className="text-gray-600">We constantly push boundaries and explore new technologies to deliver cutting-edge solutions.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-lg mx-auto mb-6 flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">Quality</h3>
              <p className="text-gray-600">Excellence is not negotiable. We maintain the highest standards in every project we undertake.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-6 flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">Collaboration</h3>
              <p className="text-gray-600">We work closely with our clients as partners to achieve shared goals and success.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-lg mx-auto mb-6 flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">Growth</h3>
              <p className="text-gray-600">We&apos;re committed to continuous learning and helping our clients achieve sustainable growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Meet Our Co-Founders</h2>
            <p className="text-xl text-gray-700">The visionary leaders behind Alpha-devs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-40 h-40 bg-gradient-to-br from-gray-700 to-black rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                <span className="text-white text-5xl font-bold">UF</span>
              </div>
              <h3 className="text-2xl font-semibold text-black mb-2">Umer Farooq</h3>
              <p className="text-gray-700 font-medium mb-4 text-lg">CEO & Co-Founder</p>
              <p className="text-gray-600 leading-relaxed">Visionary leader with extensive experience in software development, business strategy, and driving innovation in the tech industry.</p>
            </div>

            <div className="text-center">
              <div className="w-40 h-40 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                <span className="text-white text-5xl font-bold">AA</span>
              </div>
              <h3 className="text-2xl font-semibold text-black mb-2">Anas Ali</h3>
              <p className="text-gray-700 font-medium mb-4 text-lg">COO & Co-Founder</p>
              <p className="text-gray-600 leading-relaxed">Operations expert focused on scaling business processes, team management, and ensuring operational excellence across all projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Client Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-700">Real feedback from real clients</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-black rounded-full flex items-center justify-center mr-4 shadow-md">
                    <span className="text-white font-bold">{testimonial.image}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-sm text-gray-800 font-medium">{testimonial.company}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-600 leading-relaxed">{testimonial.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black mb-4">Our Track Record</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-black mb-2">98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">50+</div>
              <div className="text-gray-600">Projects Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">100%</div>
              <div className="text-gray-600">Job Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Our Success Stories?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help transform your business with innovative software solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-black px-8 py-4 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Your Project
            </a>
            <a
              href="/consultancy"
              className="border border-white text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-white hover:text-black transition-colors"
            >
              Schedule Consultation
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
