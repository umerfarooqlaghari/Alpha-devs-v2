/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Hero() {
    const [media, setMedia] = useState<{ video?: string, image?: string }>({});

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
                const res = await fetch(`${API_URL}/api/pagemedia`);
                const data = await res.json();

                const homeHeroVideo = data.find((m: any) => m.pageName === 'Home' && m.sectionName === 'Hero' && m.fieldName === 'backgroundVideo');
                const homeHeroImage = data.find((m: any) => m.pageName === 'Home' && m.sectionName === 'Hero' && m.fieldName === 'backgroundImage');

                setMedia({
                    video: homeHeroVideo?.url,
                    image: homeHeroImage?.url
                });
            } catch (error) {
                console.error('Error fetching hero media:', error);
            }
        };
        fetchMedia();
    }, []);

    return (
        <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
            {/* Background */}
            <div className="absolute inset-0 z-0">
                {media.video ? (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src={media.video} type="video/mp4" />
                    </video>
                ) : media.image ? (
                    <img src={media.image} alt="Background" className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-[#121212]" />
                )}
                {/* Fallback/Overlay */}
                <div className="absolute inset-0 bg-black/20" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-black leading-[1.1] md:leading-[0.9] tracking-tighter mb-6 text-balance text-shadow-sm uppercase">
                    Revolutionizing Enterprise with Intelligent Software
                </h1>
                <p className="text-base md:text-xl font-medium max-w-2xl mx-auto opacity-90 mb-8 italic px-4 md:px-0">
                    Engineering high-performance AI, ERP, and custom digital ecosystems for global leaders.
                </p>
                <Link href="/services">
                    <button data-track="home-hero-cta" className="bg-white text-black px-10 py-4 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-white shadow-xl shadow-white/10">
                        Explore Our Solutions
                    </button>
                </Link>
            </div>
        </section>
    );
}
