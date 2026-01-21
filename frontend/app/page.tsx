import Navbar from "@/components/nfinite/Navbar";
import Hero from "@/components/nfinite/Hero";
import ServicesMarquee from "@/components/nfinite/ServicesMarquee";
import PerformanceGrid from "@/components/nfinite/PerformanceGrid";
import TechnicalAccordion from "@/components/nfinite/TechnicalAccordion";
import GrainScroll from "@/components/nfinite/GrainScroll";
import Testimonials from "@/components/nfinite/Testimonials";
import Footer from "@/components/nfinite/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <Hero />
      <GrainScroll />
      <ServicesMarquee />
      <PerformanceGrid />
      <TechnicalAccordion />
      <Testimonials />
      <Footer />
    </main>
  );
}
