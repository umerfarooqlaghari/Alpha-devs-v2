'use client';

import { Play, Info, ArrowRight, ArrowLeft } from 'lucide-react';
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

interface Service {
    id: string;
    title: string;
    slug: string;
    description: string;
    keywords: string[];
    heroTitle?: string;
    heroSubtitle?: string;
    heroDescription?: string;
    imageUrl?: string;
    videoUrl?: string;
    infoCards: InfoCard[];
    contentBlocks: ContentBlock[];
    features: string[];
}

export default function ServiceDetailPageContent({ service }: { service: Service }) {
    return (
        <div className="min-h-screen bg-[#FDFCFB] selection:bg-indigo-100 italic-text">
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-1 gap-16 items-center">
                        <div className="relative z-10 space-y-8 animate-in fade-in slide-in-from-left duration-1000">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                                {service.heroSubtitle || "Service Excellence"}
                            </div>
                            <h1 className="text-6xl lg:text-8xl font-black text-black leading-[0.9] tracking-tighter">
                                {service.heroTitle || service.title}
                            </h1>
                            <p className="text-xl text-gray-500 max-w-lg font-medium leading-relaxed">
                                {service.heroDescription || service.description}
                            </p>
                            <div className="flex gap-4 pt-4">
                                <Link href="/contact?type=booking" className="bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-black/10">
                                    Book a Discovery Call
                                </Link>
                                {service.videoUrl && (
                                    <button className="flex items-center gap-3 px-8 py-4 rounded-full font-bold border border-gray-200 hover:bg-gray-50 transition-all">
                                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <Play className="w-3 h-3 text-indigo-600 fill-indigo-600" />
                                        </div>
                                        Watch Service Demo
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features & Content Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto space-y-32">
                        {/* Features List Highlight */}
                        {service.features && service.features.length > 0 && (
                            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                                <div className="space-y-6">
                                    <h2 className="text-4xl font-black text-black tracking-tight">Key Capabilities</h2>
                                    <p className="text-lg text-gray-500 font-medium">Powering your growth with state-of-the-art technology.</p>
                                    <div className="grid grid-cols-1 gap-4">
                                        {service.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-black/10 transition-colors">
                                                <div className="w-2 h-2 rounded-full bg-black" />
                                                <span className="font-bold text-black">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-indigo-500/20 blur-[100px] rounded-full group-hover:bg-indigo-500/30 transition-all" />
                                    {service.imageUrl && (
                                        <img
                                            src={service.imageUrl}
                                            alt={service.title}
                                            className="relative z-10 w-full rounded-3xl shadow-2xl border border-gray-100 group-hover:scale-[1.02] transition-transform duration-700"
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        {service.contentBlocks
                            .filter((block) => block.type !== 'image')
                            .map((block, idx) => (
                                <div key={idx} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}>
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
                                </div>
                            ))}
                    </div>
                </div>
            </section>

            {/* Info Cards Grid */}
            {service.infoCards.length > 0 && (
                <section className="py-24 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-4xl font-black text-black tracking-tighter uppercase">Why Choose This Service?</h2>
                            <p className="text-gray-500 font-medium italic">Tailored excellence for your needs.</p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {service.infoCards.map((card, idx) => (
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
                    <h2 className="text-5xl lg:text-7xl font-black tracking-tighter">Ready to accelerate with AI?</h2>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto italic">Let&apos;s build the future of your enterprise together.</p>
                    <div className="pt-8 flex flex-col items-center gap-4">
                        <Link href="/contact?type=booking" className="bg-white text-black px-12 py-5 rounded-full font-bold text-lg hover:bg-gray-100 transition-all flex items-center gap-3">
                            Start Your Journey <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link href="/services" className="text-gray-500 hover:text-white transition-colors flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Discover other services
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
