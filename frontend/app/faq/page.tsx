import { Metadata } from 'next';
import { getOptimizationData } from "@/lib/optimization";
import FAQContent from "@/components/nfinite/FAQContent";

export async function generateMetadata(): Promise<Metadata> {
    const data = await getOptimizationData('/faq');
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

export default async function FAQPage() {
    const data = await getOptimizationData('/faq');

    return (
        <div className="min-h-screen bg-cream">
            {data?.structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(data.structuredData) }}
                />
            )}
            <FAQContent />
        </div>
    );
}
