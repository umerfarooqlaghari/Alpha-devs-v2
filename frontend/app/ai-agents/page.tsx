import Navbar from "@/components/nfinite/Navbar";
import Footer from "@/components/nfinite/Footer";
import AIAgentsHero from "@/components/nfinite/AIAgentsHero";
import AIAgentsGrid from "@/components/nfinite/AIAgentsGrid";
import ToolsCarousel from "@/components/nfinite/ToolsCarousel";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Agentic AI Portfolio | Alpha Development",
    description:
        "Explore our portfolio of 44+ AI agents across sales, finance, operations, customer service, and more. Proven accelerators adapted to real business challenges.",
    keywords: "AI agents, agentic AI, autonomous agents, business automation, AI portfolio, Alpha Development",
};

export default function AIAgentsPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <AIAgentsHero />
            <ToolsCarousel />
            <AIAgentsGrid />

            {/* CTA Section */}
            <section className="py-24 px-6 md:px-12 bg-[#2D312E]">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#4A5D4E] mb-6">
                        Ready to get started?
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter leading-tight">
                        Meet your new<br />
                        <span className="text-[#7FB3A0]">AI colleagues</span>
                    </h2>
                    <p className="text-lg text-gray-400 mb-12 max-w-xl mx-auto leading-relaxed">
                        Ready to see how AI agents can work alongside your teams to boost productivity, streamline decisions, and connect your systems?
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/contact?type=booking"
                            className="px-10 py-4 bg-white text-[#2D312E] font-bold rounded-full hover:bg-[#F1F5F0] transition-all duration-300 hover:scale-105"
                        >
                            Book a Discovery Call
                        </Link>
                        <Link
                            href="/services"
                            className="px-10 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
                        >
                            View Services
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
