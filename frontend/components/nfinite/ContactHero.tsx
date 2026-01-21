"use client";

import React from 'react';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

export default function ContactHero() {
    return (
        <section className="relative pt-32 pb-16 overflow-hidden">
            {/* Background Aesthetics */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-light-blue/5 to-transparent -z-10 blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 text-center">
                <span className="inline-block text-light-blue font-bold tracking-[0.3em] uppercase text-xs mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    Get in Touch
                </span>
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    We&apos;d love to hear <br />
                    from <span className="text-light-blue">you.</span>
                </h1>
                <p className="text-dark-navy/60 text-lg md:text-xl max-w-2xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    Whether you have a question about features, pricing, or anything else, our team is ready to answer all your questions.
                </p>

                {/* Contact Info Cards */}
               
            </div>
        </section>
    );
}
