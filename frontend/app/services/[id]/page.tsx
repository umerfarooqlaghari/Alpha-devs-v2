import { Metadata } from 'next';
import { getOptimizationData } from "@/lib/optimization";
import Navbar from '@/components/nfinite/Navbar';
import Footer from '@/components/nfinite/Footer';
import ServiceDetailPageContent from '@/components/nfinite/ServiceDetailPageContent';
import Link from 'next/link';

async function getService(id: string) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const res = await fetch(`${API_URL}/api/services/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const [optimizationData, service] = await Promise.all([
        getOptimizationData(`/services/${id}`),
        getService(id)
    ]);

    if (!optimizationData && !service) return {};

    return {
        title: optimizationData?.title || service?.title,
        description: optimizationData?.description || service?.description,
        keywords: optimizationData?.keywords || service?.keywords?.join(', '),
        openGraph: {
            title: optimizationData?.ogTitle || optimizationData?.title || service?.title,
            description: optimizationData?.ogDescription || optimizationData?.description || service?.description,
            images: optimizationData?.ogImage ? [{ url: optimizationData.ogImage }] : (service?.imageUrl ? [{ url: service.imageUrl }] : []),
        }
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const service = await getService(id);

    if (!service) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
                <Navbar />
                <h1 className="text-4xl font-bold">Service Not Found</h1>
                <Link href="/services" className="text-indigo-400 hover:text-indigo-300">Back to Services</Link>
                <Footer />
            </div>
        );
    }

    return (
        <main>
            <Navbar />
            <ServiceDetailPageContent service={service} />
            <Footer />
        </main>
    );
}
