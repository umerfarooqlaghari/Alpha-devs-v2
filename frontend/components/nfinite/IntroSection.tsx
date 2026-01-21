"use client";

import React from 'react';

export default function IntroSection() {
    return (
        <section className="py-24 bg-cream overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}

                    {/* Image / Visual */}
                    <div className="relative">
                        

                        {/* Decorative Background Element */}
                        <div className="absolute -top-12 -right-12 w-64 h-64 bg-light-blue/5 rounded-full blur-3xl -z-0" />
                        <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-neon-purple/5 rounded-full blur-2xl -z-0" />
                    </div>
                </div>
            </div>
        </section>
    );
}
