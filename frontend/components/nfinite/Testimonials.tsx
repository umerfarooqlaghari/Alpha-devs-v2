/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useEffect } from "react";

const TESTIMONIALS_FALLBACK = [
    {
        quote: "Alpha Devs transformed our legacy infrastructure into a scalable cloud powerhouse. Their attention to detail and security is unmatched.",
        author: "Sarah Jenkins",
        role: "CTO",
        company: "FinTech global",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200"
    }
];

interface TestimonialData {
    id: string;
    author: string;
    role: string;
    company: string;
    quote: string;
    image: string | null;
}

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [testimonials, setTestimonials] = useState<TestimonialData[]>([]);
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    // Fetch Testimonials
    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const res = await fetch(`${API_URL}/api/testimonials`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.length > 0) {
                        setTestimonials(data);
                    } else {
                        // Use fallback if no data in DB yet
                        // But need to map fallback to match interface structure if needed
                        // For now, if empty, maybe just show fallback?
                        // Let's coerce fallback to TestimonialData for simplicity in demo
                        setTestimonials(TESTIMONIALS_FALLBACK as any);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch testimonials", err);
                setTestimonials(TESTIMONIALS_FALLBACK as any);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    // Auto-rotate
    useEffect(() => {
        if (testimonials.length === 0) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    if (loading) return <div className="py-32 text-center text-white">Loading testimonials...</div>;

    // Safety check
    const items = testimonials.length > 0 ? testimonials : TESTIMONIALS_FALLBACK;

    return (
        <section className="bg-cream py-32 px-6 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="mb-16 text-center">
                    <span className="text-sm font-bold tracking-widest uppercase text-white mb-4 block">
                        Client Success
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold leading-tight text-white">
                        Trusted by Industry Leaders
                    </h2>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Carousel Area */}
                    <div className="relative h-[400px] md:h-[300px]">
                        {items.map((t: any, idx) => {
                            const isActive = idx === activeIndex;
                            return (
                                <div
                                    key={idx}
                                    className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out transform ${isActive ? "opacity-100 translate-x-0 scale-100 z-10" : "opacity-0 translate-x-10 scale-95 z-0"
                                        }`}
                                >
                                    <blockquote className="text-2xl md:text-4xl font-medium text-center text-dark-navy leading-snug mb-8">
                                        &quot;{t.quote}&quot;
                                    </blockquote>

                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-dark-navy/10 relative">
                                            {t.image ? (
                                                <img src={t.image} alt={t.author} className="object-cover w-full h-full" />
                                            ) : (
                                                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-xs text-black">
                                                    {t.author[0]}
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-left">
                                            <div className="font-bold text-white text-lg">{t.author}</div>
                                            <div className="text-dark-navy/60 text-sm">{t.role}, {t.company}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Indicators */}
                    <div className="flex justify-center gap-3 mt-8">
                        {items.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveIndex(idx)}
                                className={`h-2 rounded-full transition-all duration-300 ${idx === activeIndex ? "w-8 bg-black" : "w-2 bg-dark-navy/20 hover:bg-dark-navy/40"
                                    }`}
                                aria-label={`Go to testimonial ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
