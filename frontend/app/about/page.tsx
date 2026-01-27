import { Metadata } from 'next';
import { getOptimizationData } from "@/lib/optimization";
import Navbar from "@/components/nfinite/Navbar";
import Footer from "@/components/nfinite/Footer";
import AboutUsHero from "@/components/nfinite/AboutUsHero";
import AboutUsScroll from "@/components/nfinite/AboutUsScroll";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getOptimizationData('/about');
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

export default async function AboutPage() {
    const data = await getOptimizationData('/about');

    return (
        <main className="bg-[#121212] min-h-screen">
            {data?.structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(data.structuredData) }}
                />
            )}
            <Navbar />
            <AboutUsHero />
            <AboutUsScroll />
            <Footer />
        </main>
    );
}
