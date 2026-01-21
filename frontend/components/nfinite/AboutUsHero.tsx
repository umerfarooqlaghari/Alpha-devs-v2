/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

export default function AboutUsHero() {
    const [media, setMedia] = useState<{ image?: string, video?: string }>({});

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
                const res = await fetch(`${API_URL}/api/pagemedia`);
                const data = await res.json();

                const aboutHeroImage = data.find((m: any) => m.pageName === 'About' && m.sectionName === 'Hero' && m.fieldName === 'heroImage');
                const aboutHeroVideo = data.find((m: any) => m.pageName === 'About' && m.sectionName === 'Hero' && m.fieldName === 'heroVideo');

                setMedia({
                    image: aboutHeroImage?.url,
                    video: aboutHeroVideo?.url
                });
            } catch (error) {
                console.error('Error fetching about hero media:', error);
            }
        };
        fetchMedia();
    }, []);

    return (
        <section className="relative pt-40 pb-20 px-6 md:px-12 bg-[#121212] overflow-hidden min-h-[60vh] flex items-center justify-center">
            {/* Background Media */}
            <div className="absolute inset-0 z-0">
                {media.video ? (
                    <video src={media.video} autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40" />
                ) : media.image ? (
                    <img src={media.image} alt="Background" className="w-full h-full object-cover opacity-40" />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121212] pointer-events-none" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10 text-center">
                <span className="text-sm font-bold tracking-[0.4em] text-light-blue uppercase mb-6 block">
                    Our Story
                </span>
                <h1 className="text-6xl md:text-9xl font-bold text-white mb-8 tracking-tighter leading-tight">
                    forging ideas<br />into innovations
                </h1>
                <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    From a passion project by two FAST alumni to a global powerhouse of 15+ specialists.
                </p>
            </div>
        </section>
    );
}
