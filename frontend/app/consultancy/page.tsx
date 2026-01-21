
"use client";

import Navbar from "@/components/nfinite/Navbar";
import Footer from "@/components/nfinite/Footer";
import ConsultancyHero from "@/components/nfinite/ConsultancyHero";
import ConsultancyRoadmap from "@/components/nfinite/ConsultancyRoadmap";

export default function ConsultancyPage() {
    return (
        <main className="bg-[#121212] min-h-screen">
            <Navbar />
            <ConsultancyHero />
            <ConsultancyRoadmap />
            {/* CTA Section */}
            <section className="py-24 px-6 md:px-12 bg-[#121212] border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tighter">Ready to Start your <br /><span className="text-light-blue">Journey?</span></h2>
                    <p className="text-xl text-gray-400 mb-12">Let&apos;s build a product that doesn&apos;t just work, but wins in the market.</p>
                    <button className="px-12 py-5 bg-white text-black font-bold rounded-full hover:bg-light-blue hover:text-white transition-all duration-500 text-lg">
                        Book a Discovery Call
                    </button>
                </div>
            </section>
            <Footer />
        </main>
    );
}
