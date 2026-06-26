
"use client";

import Link from "next/link";

const reasons = [
    {
        num: "01",
        title: "Secure & Reliable",
        description: "Built with enterprise-grade security and 99.9% uptime for mission-critical operations. SOC-aligned architecture with continuous monitoring.",
        gradient: "from-[#4A5D4E] to-[#2D312E]",
        textColor: "text-white",
    },
    {
        num: "02",
        title: "Instant Integration",
        description: "Plug into your existing ERP, CRM, and database systems without data silos or long implementation cycles. Go live in weeks, not months.",
        gradient: "from-[#F1F5F0] to-[#E0EAE2]",
        textColor: "text-[#2D312E]",
    },
    {
        num: "03",
        title: "Future-Ready AI",
        description: "Leverage cutting-edge AI agents and computer vision to stay ahead of the curve. Every product is built for the next 10 years, not just today.",
        gradient: "from-[#2D312E] to-[#1A1F1C]",
        textColor: "text-white",
    },
    {
        num: "04",
        title: "End-to-End Ownership",
        description: "We don't hand off and disappear. Alpha Dev owns every layer — from architecture to deployment to ongoing iteration — so you always have a partner, not a vendor.",
        gradient: "from-[#7FB3A0] to-[#4A5D4E]",
        textColor: "text-white",
    },
];

export default function WhyAlphaDevs() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <p className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-3">Our Advantage</p>
                        <h2 className="text-4xl md:text-5xl font-bold text-[#2D312E] tracking-tighter">
                            Why Alpha Devs?
                        </h2>
                    </div>
                    <Link
                        href="/about"
                        className="w-fit text-xs font-bold uppercase tracking-widest text-[#4A5D4E] border-b border-[#4A5D4E] pb-0.5 hover:text-[#2D312E] hover:border-[#2D312E] transition-colors"
                    >
                        About the team →
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {reasons.map((r) => (
                        <div
                            key={r.num}
                            className={`bg-gradient-to-br ${r.gradient} rounded-3xl p-8 md:p-10 flex flex-col gap-6 hover:-translate-y-1 transition-transform duration-300 group`}
                        >
                            <span className={`text-5xl font-black opacity-20 ${r.textColor} leading-none`}>
                                {r.num}
                            </span>
                            <div>
                                <h3 className={`text-xl font-bold mb-3 ${r.textColor}`}>{r.title}</h3>
                                <p className={`text-sm leading-relaxed ${r.textColor} opacity-80`}>
                                    {r.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
