"use client";

import React from 'react';

const stats = [
    { label: "Completed Projects", value: "350+" },
    { label: "Years Experience", value: "12+" },
    { label: "Team Members", value: "25+" },
];

export default function StatsSection() {
    return (
        <section className="py-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="bg-[#2D2D2D] rounded-[2rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 border border-white/5 shadow-2xl">
                    <div className="max-w-xs text-center md:text-left">
                        <span className="text-light-blue font-bold tracking-widest uppercase text-xs mb-3 block">
                            Some Numbers
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            What we did so far
                        </h2>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-end gap-12 md:gap-24">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center group">
                                <span className="block text-4xl md:text-5xl font-bold text-light-blue mb-2 group-hover:scale-110 transition-transform cursor-default">
                                    {stat.value}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
