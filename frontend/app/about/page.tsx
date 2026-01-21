
"use client";

import Navbar from "@/components/nfinite/Navbar";
import Footer from "@/components/nfinite/Footer";
import AboutUsHero from "@/components/nfinite/AboutUsHero";
import AboutUsScroll from "@/components/nfinite/AboutUsScroll";

export default function AboutPage() {
    return (
        <main className="bg-[#121212] min-h-screen">
            <Navbar />
            <AboutUsHero />
            <AboutUsScroll />
            <Footer />
        </main>
    );
}
