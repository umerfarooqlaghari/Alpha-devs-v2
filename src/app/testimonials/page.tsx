import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      role: "CEO",
      content: "Alpha-devs transformed our business with their innovative web platform. The team's expertise and dedication exceeded our expectations. Our revenue increased by 300% within the first year.",
      rating: 5,
      image: "SJ"
    },
    {
      name: "Michael Chen",
      company: "Digital Solutions Ltd.",
      role: "CTO",
      content: "Working with Alpha-devs on our mobile app was a game-changer. Their technical skills and project management are top-notch. The app has over 100k downloads now.",
      rating: 5,
      image: "MC"
    },
    {
      name: "Emily Rodriguez",
      company: "E-commerce Plus",
      role: "Founder",
      content: "The AI solutions provided by Alpha-devs revolutionized our customer service. Response times improved by 80% and customer satisfaction scores are at an all-time high.",
      rating: 5,
      image: "ER"
    },
    {
      name: "David Thompson",
      company: "FinTech Innovations",
      role: "Product Manager",
      content: "Alpha-devs delivered a complex financial platform on time and within budget. Their attention to security and compliance was exceptional. Highly recommended!",
      rating: 5,
      image: "DT"
    },
    {
      name: "Lisa Wang",
      company: "Healthcare Connect",
      role: "Director of Technology",
      content: "The team at Alpha-devs understood our healthcare requirements perfectly. They built a HIPAA-compliant platform that streamlined our operations significantly.",
      rating: 5,
      image: "LW"
    },
    {
      name: "James Miller",
      company: "Retail Dynamics",
      role: "VP of Digital",
      content: "Our e-commerce platform built by Alpha-devs handles millions of transactions seamlessly. The performance and scalability are outstanding.",
      rating: 5,
      image: "JM"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-black mb-6">Client Testimonials</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our clients have to say about
              working with Alpha-devs and the results we have achieved together.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

      {/* Testimonials Grid */}
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Our Success Stories?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help transform your business with innovative software solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-black px-8 py-4 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg">
              Start Your Project
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-white hover:text-black transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
