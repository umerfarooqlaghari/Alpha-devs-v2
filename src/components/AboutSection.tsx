import Link from 'next/link';

const AboutSection = () => {
  return (
    <section className="py-24 bg-gray-50 w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div className="space-y-10">
            <div>
              <h2 className="text-5xl font-bold text-black mb-8">About Us</h2>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
                <p className="text-lg">
                  <strong className="text-black">Since 2020</strong>
                </p>
                <p>
                  <strong className="text-black">Idea of Alpha-Devs</strong>
                </p>
                <p>
                  Alpha-Devs is a leading software development company specializing in
                  cutting-edge technology solutions. We are passionate about creating
                  innovative software that transforms businesses and drives growth.
                </p>
                <p>
                  Our team of expert developers, designers, and consultants work
                  collaboratively to deliver exceptional results that exceed our
                  clients&apos; expectations. From web development to AI solutions,
                  we cover the full spectrum of modern software development.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="text-center">
                <div className="text-4xl font-bold text-black mb-3">50+</div>
                <div className="text-gray-600 font-medium">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-black mb-3">100%</div>
                <div className="text-gray-600 font-medium">Job Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-black mb-3">4+</div>
                <div className="text-gray-600 font-medium">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-black mb-3">10+</div>
                <div className="text-gray-600 font-medium">Team Members</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/about"
                className="bg-black text-white px-10 py-4 text-lg rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 text-center"
              >
                Learn More About Us
              </Link>
              <Link
                href="/testimonials"
                className="bg-white text-black border-2 border-black px-10 py-4 text-lg rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 text-center"
              >
                View Our Work
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-10 border border-gray-200 shadow-lg">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <div className="w-12 h-12 bg-black rounded-xl mb-4 shadow-md"></div>
                    <h4 className="font-bold text-black mb-2 text-lg">Innovation</h4>
                    <p className="text-gray-600">Cutting-edge solutions</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <div className="w-12 h-12 bg-gray-800 rounded-xl mb-4 shadow-md"></div>
                    <h4 className="font-bold text-black mb-2 text-lg">Quality</h4>
                    <p className="text-gray-600">Excellence in every project</p>
                  </div>
                </div>
                <div className="space-y-6 mt-12">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <div className="w-12 h-12 bg-gray-700 rounded-xl mb-4 shadow-md"></div>
                    <h4 className="font-bold text-black mb-2 text-lg">Expertise</h4>
                    <p className="text-gray-600">Deep technical knowledge</p>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <div className="w-12 h-12 bg-gray-600 rounded-xl mb-4 shadow-md"></div>
                    <h4 className="font-bold text-black mb-2 text-lg">Support</h4>
                    <p className="text-gray-600">24/7 customer care</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
