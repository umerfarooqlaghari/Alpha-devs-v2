import Link from 'next/link';

const ServicesSection = () => {
  const services = [
    {
      title: "WEB DEVELOPMENT",
      subtitle: "COMPLETE WEB SOLUTIONS",
      description: "Modern, responsive websites built with cutting-edge technologies",
      icon: "🌐",
      color: "bg-black",
      link: "/services"
    },
    {
      title: "MOBILE DEVELOPMENT",
      subtitle: "iOS & ANDROID APPS",
      description: "Native and cross-platform mobile applications",
      icon: "📱",
      color: "bg-gray-800",
      link: "/services"
    },
    {
      title: "SOFTWARE CONSULTANCY",
      subtitle: "TECHNICAL EXPERTISE & GUIDANCE",
      description: "Expert consulting for your software development needs",
      icon: "💼",
      color: "bg-gray-700",
      link: "/consultancy"
    },
    {
      title: "SHOPIFY & WORDPRESS",
      subtitle: "E-COMMERCE & CMS SOLUTIONS",
      description: "Custom e-commerce and content management solutions",
      icon: "🛒",
      color: "bg-gray-600",
      link: "/services"
    },
    {
      title: "WEB DESIGN AND UI/UX",
      subtitle: "BEAUTIFUL USER EXPERIENCES",
      description: "Stunning designs that convert visitors into customers",
      icon: "🎨",
      color: "bg-gray-500",
      link: "/services"
    },
    {
      title: "AI ML & DEEP LEARNING",
      subtitle: "ARTIFICIAL INTELLIGENCE SOLUTIONS",
      description: "Advanced AI and machine learning implementations",
      icon: "🤖",
      color: "bg-gray-400",
      link: "/products/alpha-analytics"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 text-black">Our Services</h2>
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            We provide comprehensive software development and digital transformation services
            to help your business thrive in the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white border border-gray-200 rounded-xl p-10 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-8">
                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                  {service.icon}
                </div>
                <Link
                  href={service.link}
                  className="text-gray-400 hover:text-black transition-all duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-3">{service.title}</h3>
                  <p className="text-sm text-gray-600 font-semibold uppercase tracking-wider">{service.subtitle}</p>
                </div>

                <p className="text-gray-600 leading-relaxed text-lg">{service.description}</p>

                <Link
                  href={service.link}
                  className="text-black hover:text-gray-700 font-semibold flex items-center space-x-2 group-hover:translate-x-2 transition-all duration-300"
                >
                  <span>Learn More</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link
            href="/services"
            className="bg-black text-white px-12 py-5 rounded-lg text-xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
