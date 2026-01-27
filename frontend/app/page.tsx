import Navbar from "@/components/nfinite/Navbar";
import Hero from "@/components/nfinite/Hero";
import ServicesMarquee from "@/components/nfinite/ServicesMarquee";
import PerformanceGrid from "@/components/nfinite/PerformanceGrid";
import TechnicalAccordion from "@/components/nfinite/TechnicalAccordion";
import GrainScroll from "@/components/nfinite/GrainScroll";
import Testimonials from "@/components/nfinite/Testimonials";
import Footer from "@/components/nfinite/Footer";
import { Metadata } from 'next';
import { getOptimizationData } from "@/lib/optimization";

export async function generateMetadata(): Promise<Metadata> {
  const data = await getOptimizationData('/');
  if (!data) return {};

  return {
    title: data.title,
    description: data.description,
    keywords: data.keywords,
    openGraph: {
      title: data.ogTitle || data.title,
      description: data.ogDescription || data.description,
      images: data.ogImage ? [{ url: data.ogImage }] : [],
    }
  };
}

export default async function Home() {
  const data = await getOptimizationData('/');

  return (
    <main className="min-h-screen bg-cream">
      {data?.structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data.structuredData) }}
        />
      )}
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
