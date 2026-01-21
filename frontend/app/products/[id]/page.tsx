'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/nfinite/Navbar';
import Footer from '@/components/nfinite/Footer';
import { Loader2, ArrowLeft, ArrowRight, Play, Info } from 'lucide-react';
import Link from 'next/link';

interface InfoCard {
    title: string;
    description: string;
    tag: string;
    imageUrl?: string;
}

interface ContentBlock {
    type: 'text' | 'image' | 'heading';
    content: string;
    style?: {
        fontSize?: string;
        bold?: boolean;
        color?: string;
        align?: 'left' | 'center' | 'right';
    };
    imageUrl?: string;
}

interface Product {
    id: string;
    name: string;
    slug: string;
    tagline: string;
    category: string;
    description: string;
    heroTitle?: string;
    heroSubtitle?: string;
    heroDescription?: string;
    imageUrl?: string;
    videoUrl?: string;
    infoCards: InfoCard[];
    contentBlocks: ContentBlock[];
}

export default function ProductDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${API_URL}/api/products/${id}`);
                if (!res.ok) throw new Error('Product not found');
                const data = await res.json();
                setProduct(data);
            } catch (err) {
                console.error(err);
                // router.push('/products');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, API_URL, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl font-bold">Product Not Found</h1>
                <Link href="/products" className="text-indigo-400 hover:text-indigo-300">Back to Products</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCFB] selection:bg-indigo-100 italic-text">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative z-10 space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                {product.heroSubtitle || product.category}
                            </div>
                            <h1 className="text-6xl lg:text-8xl font-black text-black leading-[0.9] tracking-tighter">
                                {product.heroTitle || product.name}
                            </h1>
                            <p className="text-xl text-gray-500 max-w-lg font-medium leading-relaxed">
                                {product.heroDescription || product.tagline}
                            </p>
                            <div className="flex gap-4 pt-4">
                                <Link href="/contact?type=booking" className="bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-black/10">
                                    Book a Discovery Call
                                </Link>
                                {product.videoUrl && (
                                    <button className="flex items-center gap-3 px-8 py-4 rounded-full font-bold border border-gray-200 hover:bg-gray-50 transition-all">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <Play className="w-3 h-3 text-indigo-600 fill-indigo-600" />
                                        </div>
                                        Watch Demo
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-1000">
                                {product.imageUrl ? (
                                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gray-200" />
                                )}
                            </div>
                            {/* Decorative Elements */}
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600 rounded-full blur-[80px] opacity-20" />
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-black rounded-full blur-[80px] opacity-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Blocks Section (Side by Side Style) */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto space-y-32">
                        {product.contentBlocks.map((block, idx) => (
                            <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
                                {block.type === 'image' ? (
                                    <div className="w-full lg:w-1/2">
                                        <div className="aspect-square rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                                            <img src={block.imageUrl} alt="Feature" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="w-full lg:w-1/2 space-y-6">
                                        {block.type === 'heading' ? (
                                            <h2 className="text-4xl lg:text-5xl font-black text-black leading-tight tracking-tight"
                                                style={{ fontSize: block.style?.fontSize, color: block.style?.color, fontWeight: block.style?.bold ? 'bold' : 'black' }}>
                                                {block.content}
                                            </h2>
                                        ) : (
                                            <p className="text-lg text-gray-500 leading-relaxed font-medium"
                                                style={{ fontSize: block.style?.fontSize, color: block.style?.color, fontWeight: block.style?.bold ? 'bold' : 'normal' }}>
                                                {block.content}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Info Cards Grid */}
            {product.infoCards.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-4xl font-black text-black tracking-tighter uppercase">Comprehensive Solutions</h2>
                            <p className="text-gray-500 font-medium italic">Tailored excellence for your needs.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {product.infoCards.map((card, idx) => (
                                <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-2xl transition-all duration-500 group overflow-hidden relative">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                                        <Info className="w-16 h-16 text-black" />
                                    </div>
                                    <div className="space-y-6 relative z-10">
                                        <span className="inline-block text-[10px] font-black text-indigo-600 uppercase tracking-widest px-3 py-1 bg-indigo-50 rounded-full">
                                            {card.tag}
                                        </span>
                                        <h4 className="text-2xl font-bold text-black">{card.title}</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">{card.description}</p>
                                        {card.imageUrl && (
                                            <div className="pt-4">
                                                <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-gray-50 shadow-sm">
                                                    <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-24 bg-black text-white relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600 rounded-full blur-[150px] opacity-20 pointer-events-none" />
                <div className="container mx-auto px-6 text-center relative z-10 space-y-8">
                    <h2 className="text-5xl lg:text-7xl font-black tracking-tighter">Ready to transform your business?</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto italic">Let&apos;s build something extraordinary together.</p>
                    <div className="pt-8 flex flex-col items-center gap-4">
                        <Link href="/contact?type=booking" className="bg-white text-black px-12 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-all flex items-center gap-3">
                            Start Your Journey <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/products" className="text-gray-500 hover:text-white transition-colors flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Discover other solutions
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
