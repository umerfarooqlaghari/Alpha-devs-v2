
"use client";

import { ShieldCheck, Zap, Globe } from "lucide-react";

export default function WhyAlphaDevs() {
    const reasons = [
        {
            icon: ShieldCheck,
            title: "Secure & Reliable",
            description: "Built with enterprise-grade security and 99.9% uptime for mission-critical operations."
        },
        {
            icon: Zap,
            title: "Instant Integration",
            description: "Easily connect with your existing ERP and database systems without data silos."
        },
        {
            icon: Globe,
            title: "Future-Ready AI",
            description: "Leverage cutting-edge AI and computer vision to stay ahead of the curve."
        }
    ];

    return (
        <section className="py-24 bg-[#F1F5F0]">
            <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-[#2D312E] mb-16 tracking-tight">
                    WHY ALPHA DEVS?
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
                    {reasons.map((reason, index) => (
                        <div key={index} className="flex flex-col items-center max-w-xs mx-auto">
                            <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center mb-6">
                                <reason.icon className="w-8 h-8 text-[#4A5D4E] stroke-[1.5px]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#2D312E] mb-3">{reason.title}</h3>
                            <p className="text-sm text-[#5C635E] leading-relaxed">
                                {reason.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
