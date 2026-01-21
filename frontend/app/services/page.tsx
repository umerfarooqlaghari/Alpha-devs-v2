"use client";

import Navbar from "@/components/nfinite/Navbar";
import ServicesHero from "@/components/nfinite/ServicesHero";
import ServicesGrid from "@/components/nfinite/ServicesGrid";
import IntroSection from "@/components/nfinite/IntroSection";
import StatsSection from "@/components/nfinite/StatsSection";
import ProjectsSection from "@/components/nfinite/ProjectsSection";
import Footer from "@/components/nfinite/Footer";

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-cream selection:bg-light-blue selection:text-black">
            <Navbar />

            <article>
                <ServicesHero />
                <ServicesGrid />
                {/* <IntroSection /> */}
                <StatsSection />
                <ProjectsSection />
            </article>

            <Footer />
        </main>
    );
}
