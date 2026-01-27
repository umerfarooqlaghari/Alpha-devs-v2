import { Metadata } from 'next';
import { getOptimizationData } from "@/lib/optimization";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getOptimizationData('/services');
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

import Navbar from "@/components/nfinite/Navbar";
import ServicesHero from "@/components/nfinite/ServicesHero";
import ServicesGrid from "@/components/nfinite/ServicesGrid";
import IntroSection from "@/components/nfinite/IntroSection";
import StatsSection from "@/components/nfinite/StatsSection";
import ProjectsSection from "@/components/nfinite/ProjectsSection";
import Footer from "@/components/nfinite/Footer";

export default async function ServicesPage() {
    const data = await getOptimizationData('/services');

    return (
        <main className="min-h-screen bg-cream selection:bg-light-blue selection:text-black">
            {data?.structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(data.structuredData) }}
                />
            )}
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
