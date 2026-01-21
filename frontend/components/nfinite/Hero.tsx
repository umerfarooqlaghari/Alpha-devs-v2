/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

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
                <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight mb-6 text-balance text-shadow-sm">
                    100% Curbside Recyclable, sealable, printable & high barrier paper
                </h1>
                <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto opacity-90 mb-8">
                    Sustainable packaging solutions for a circular economy.
                </p>
                <button className="bg-light-blue text-black px-8 py-3.5 rounded-full text-base font-bold transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-white">
                    Explore Our Technology
                </button>
            </div>
        </section>
    );
}
