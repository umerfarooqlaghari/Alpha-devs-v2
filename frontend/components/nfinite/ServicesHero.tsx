/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from 'react';

export default function ServicesHero() {
    const [media, setMedia] = useState<{ url?: string }>({});

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
                const res = await fetch(`${API_URL}/api/pagemedia`);
                const data = await res.json();

                const servicesMedia = data.find((m: any) => m.pageName === 'Services' && m.sectionName === 'Hero' && m.fieldName === 'headerImage');
                setMedia({ url: servicesMedia?.url });
            } catch (error) {
                console.error('Error fetching services hero media:', error);
            }
        };
        fetchMedia();
    }, []);

    return (
        <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden flex items-center justify-center">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                {media.url ? (
                    media.url.includes('.mp4') || media.url.includes('.mov') ? (
                        <video src={media.url} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                    ) : (
                        <img src={media.url} alt="Services" className="w-full h-full object-cover" />
                    )
                ) : (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="https://cdn.pixabay.com/video/2021/04/12/70860-537335969_tiny.mp4" type="video/mp4" />
                    </video>
                )}
                {/* Fallback/Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-[#121212]" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 text-white w-full">
                <div className="max-w-3xl">
                    <span className="inline-block text-light-blue font-bold tracking-widest uppercase text-sm mb-4">
                        Instant • Scalable • Smart
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-8 text-balance">
                        Landscaping & smart <br />
                        <span className="text-light-blue">AI-driven solutions</span>
                    </h1>

                    <div className="flex flex-wrap gap-4">
                        <button className="bg-light-blue text-black px-8 py-4 rounded-full text-base font-bold transition-all duration-300 transform hover:scale-105 hover:bg-white">
                            ABOUT US
                        </button>
                        <button className="border-2 border-white/30 text-white backdrop-blur-sm px-8 py-4 rounded-full text-base font-bold transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-black hover:border-white">
                            PROJECTS
                        </button>
                    </div>
                </div>

                {/* Secondary Info Card in Hero (Matching the image) */}
                <div className="absolute bottom-12 right-6 md:right-12 max-w-sm hidden md:block">
                    <div className="bg-[#2D2D2D]/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-charcoal flex items-center justify-center overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=100&q=80" alt="Tech" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <p className="text-xs text-light-blue font-bold uppercase tracking-tighter mb-1">Featured</p>
                            <h3 className="font-bold text-lg">AI Integration</h3>
                            <p className="text-sm opacity-60">Architect: Alpha Devs</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-12 hidden md:flex flex-col items-center gap-4">
                <div className="w-[1px] h-20 bg-gradient-to-b from-transparent to-white/30" />
            </div>
        </section>
    );
}
