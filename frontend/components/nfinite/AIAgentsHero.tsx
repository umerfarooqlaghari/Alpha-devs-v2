"use client";

import Link from "next/link";
import { Bot, Sparkles } from "lucide-react";

export default function AIAgentsHero() {
    return (
        <section className="relative pt-32 pb-20 px-6 md:px-12 bg-[#F1F5F0] overflow-hidden min-h-[70vh] flex items-center">
            {/* Background Text Decoration */}
            <div className="absolute right-[-2rem] top-1/2 -translate-y-1/2 rotate-90 origin-right text-[15rem] font-bold text-[#E9EEE8] leading-none pointer-events-none select-none uppercase tracking-tighter">
                AGENTS
            </div>

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: "linear-gradient(#2D312E 1px, transparent 1px), linear-gradient(90deg, #2D312E 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="max-w-7xl mx-auto w-full relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
                    {/* Left Content */}
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">Agentic AI</span>
                            <div className="h-[1px] w-12 bg-gray-300" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">Portfolio</span>
                            <div className="h-[1px] w-12 bg-gray-300" />
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">2026</span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-bold text-[#2D312E] mb-6 tracking-tighter leading-[0.9]">
                            Agentic<br />
                            <span className="text-[#4A5D4E]">AI</span>
                        </h1>

                        <p className="text-xl text-[#5C635E] max-w-md mb-10 leading-relaxed">
                            Kickstart your AI journey with proven agent accelerators — adapted to specific industry challenges and real business needs.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/contact?type=booking"
                                className="bg-[#2D312E] text-white px-8 py-4 rounded-full font-bold hover:bg-[#4A5D4E] transition-all duration-300 hover:scale-105"
                            >
                                Deploy an Agent
                            </Link>
                            <Link
                                href="#agent-grid"
                                className="bg-white text-[#2D312E] px-8 py-4 rounded-full font-bold border border-gray-200 hover:border-[#2D312E] transition-all duration-300 hover:scale-105"
                            >
                                Browse Portfolio
                            </Link>
                        </div>
                    </div>

                    {/* Right — Stats Panel */}
                    <div className="flex flex-col gap-4 lg:min-w-[280px]">
                        {[
                            { icon: Bot, value: "44+", label: "AI Agents Available", color: "#4A5D4E" },
                            { icon: Sparkles, value: "8", label: "Business Functions", color: "#2D312E" },
                            { icon: Bot, value: "10+", label: "Industries Covered", color: "#5C7A6E" },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="bg-white rounded-2xl px-6 py-5 flex items-center gap-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: `${stat.color}15` }}
                                >
                                    <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                                </div>
                                <div>
                                    <div className="text-2xl font-bold text-[#2D312E] tracking-tight">{stat.value}</div>
                                    <div className="text-xs font-bold uppercase tracking-wider text-gray-400">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
