import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Services() {
  const services = [
    {
      title: "Web Development",
      description: "Modern, responsive websites built with cutting-edge technologies",
      features: ["React & Next.js", "Node.js Backend", "Database Design", "API Development", "SEO Optimization"],
      icon: "🌐",
      color: "bg-black"
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications for iOS and Android",
      features: ["React Native", "Flutter", "iOS Native", "Android Native", "App Store Deployment"],
      icon: "📱",
      color: "bg-gray-800"
    },
    {
      title: "AI & Machine Learning",
      description: "Advanced AI solutions and machine learning implementations",
      features: ["Custom AI Models", "Data Analytics", "Natural Language Processing", "Computer Vision", "Predictive Analytics"],
      icon: "🤖",
      color: "bg-gray-700"
    },
    {
      title: "Software Consultancy",
      description: "Expert technical guidance and strategic software consulting",
      features: ["Architecture Review", "Technology Strategy", "Code Audits", "Performance Optimization", "Team Training"],
      icon: "💼",
      color: "bg-gray-600"
    },
    {
      title: "E-commerce Solutions",
      description: "Complete e-commerce platforms with Shopify and custom solutions",
      features: ["Shopify Development", "WooCommerce", "Custom E-commerce", "Payment Integration", "Inventory Management"],
      icon: "🛒",
      color: "bg-gray-500"
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, user-centered design that converts visitors into customers",
      features: ["User Research", "Wireframing", "Prototyping", "Visual Design", "Usability Testing"],
      icon: "🎨",
      color: "bg-gray-400"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-black mb-6">Our Services</h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We provide comprehensive software development and digital transformation services
              to help your business thrive in the digital age. From concept to deployment,
              we have got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-16 h-16 ${service.color} rounded-lg flex items-center justify-center text-3xl mb-6 shadow-md`}>
                  {service.icon}
                </div>

                <h3 className="text-2xl font-bold text-black mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                <div className="space-y-2 mb-6">
                  <h4 className="font-semibold text-black mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-600">
                        <span className="text-green-500 mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Our Process</h2>
            <p className="text-xl text-gray-700">How we deliver exceptional results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">Discovery</h3>
              <p className="text-gray-600">We understand your business goals, requirements, and challenges to create the perfect solution.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-800 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">Planning</h3>
              <p className="text-gray-600">We create detailed project plans, wireframes, and technical specifications for your approval.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">Development</h3>
              <p className="text-gray-600">Our expert team builds your solution using best practices and cutting-edge technologies.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                4
              </div>
              <h3 className="text-xl font-semibold text-black mb-4">Delivery</h3>
              <p className="text-gray-600">We deploy your solution and provide ongoing support to ensure continued success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">Technologies We Use</h2>
            <p className="text-xl text-gray-700">Cutting-edge tools and frameworks</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {['React', 'Next.js', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker', 'MongoDB', 'PostgreSQL', 'TensorFlow', 'Flutter', 'Shopify'].map((tech, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gray-100 border border-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <span className="text-gray-700 font-semibold text-sm">{tech}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let us discuss your project and see how we can help bring your vision to life.
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
