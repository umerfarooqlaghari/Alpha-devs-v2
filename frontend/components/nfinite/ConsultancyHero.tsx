/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function ConsultancyHero() {
    const [media, setMedia] = useState<{ url?: string }>({});

    useEffect(() => {
        const fetchMedia = async () => {
            try {
                const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
                const res = await fetch(`${API_URL}/api/pagemedia`);
                const data = await res.json();

                const consultancyMedia = data.find((m: any) => m.pageName === 'Consultancy' && m.sectionName === 'Hero' && m.fieldName === 'heroMedia');
                setMedia({ url: consultancyMedia?.url });
            } catch (error) {
                console.error('Error fetching consultancy hero media:', error);
            }
        };
        fetchMedia();
    }, []);

    return (
        <section className="relative pt-40 pb-20 px-6 md:px-12 bg-[#121212] overflow-hidden min-h-[80vh] flex items-center">
            <div className="max-w-7xl mx-auto relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="flex flex-col items-start gap-6 max-w-4xl">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm font-bold tracking-[0.4em] text-light-blue uppercase"
                        >
                            Strategic Product Consultancy
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-9xl font-bold text-white tracking-tighter leading-tight"
                        >
                            From Vision to <br />
                            <span className="text-gray-500 italic">Market Leader.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed mt-4"
                        >
                            We don&apos;t just build features; we architect business models. Our data-driven discovery and elite engineering transform ambiguous ideas into high-performance digital ecosystems.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex gap-4 mt-8"
                        >
                            <a href="/contact?type=booking">
                                <button className="px-8 py-4 bg-light-blue text-black font-bold rounded-full hover:bg-white transition-all duration-300 flex items-center gap-2 group shadow-lg shadow-light-blue/20">
                                    Book a Discovery Call
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </a>
                        </motion.div>
                    </div>

                    {media.url && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl"
                        >
                            <img src={media.url} alt="Strategy" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-light-blue/5 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </section>
    );
}
