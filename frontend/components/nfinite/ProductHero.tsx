"use client";

import { useState } from "react";
import { Bot, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProductHeroProps {
    onCategorySelect: (category: string) => void;
}

export default function ProductHero({ onCategorySelect }: ProductHeroProps) {
    const [scalability, setScalability] = useState("Standard");

    const handleCategoryClick = (category: string) => {
        onCategorySelect(category);
        const element = document.getElementById("our-products");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const categories = [
        { short: "AI", full: "Artificial Intelligence", color: "#4A5D4E" },
        { short: "ERP", full: "Enterprise Resource Planning", color: "#2D312E" },
        { short: "CV", full: "Computer Vision", color: "#5C7A6E" },
        { short: "SaaS", full: "Software as a Service", color: "#3B5249" },
        { short: "Edu", full: "Education Technology", color: "#7FB3A0" },
    ];

    const mockMetrics = [
        { label: "Accuracy Rate", value: "98.1%", color: "#4A5D4E" },
        { label: "System Uptime", value: "99.9%", color: "#2D312E" },
        { label: "Deployments", value: "35+", color: "#5C7A6E" },
    ];

    return (
        <section className="relative pt-32 pb-0 px-6 md:px-12 bg-[#F1F5F0] overflow-hidden min-h-[90vh] flex items-center">
            {/* Background Text Decoration */}
            <div className="absolute right-[-2rem] top-1/2 -translate-y-1/2 rotate-90 origin-right text-[15rem] font-bold text-[#E9EEE8] leading-none pointer-events-none select-none uppercase tracking-tighter">
                Solutions
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-20 left-1/3 w-72 h-72 bg-[#4A5D4E]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-[#7FB3A0]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Content */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">Products</span>
                        <div className="h-[1px] w-12 bg-gray-300" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">Story</span>
                        <div className="h-[1px] w-12 bg-gray-300" />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">Innovation</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-bold text-[#2D312E] mb-6 tracking-tighter leading-[0.9]">
                        Alpha<br />Solutions
                    </h1>

                    <p className="text-xl text-[#5C635E] max-w-md mb-8 leading-relaxed">
                        Intelligent systems designed for enterprise growth. From AI-powered ERPs to advanced computer vision monitoring, we build the core of your digital future.
                    </p>

                    {/* AI Agents Callout */}
                    <Link
                        href="/ai-agents"
                        className="flex items-center gap-3 w-fit mb-10 px-5 py-3 bg-white rounded-full border border-[#4A5D4E]/20 hover:border-[#4A5D4E] hover:shadow-md transition-all duration-300 group"
                    >
                        <div className="w-7 h-7 rounded-full bg-[#4A5D4E] flex items-center justify-center">
                            <Bot className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-xs font-bold text-[#2D312E]">44+ AI Agents Available</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#4A5D4E] group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div className="flex flex-col gap-4 mb-10">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Scalability</label>
                        <div className="flex gap-4">
                            {["Basic", "Standard", "Enterprise"].map((tier) => (
                                <button
                                    key={tier}
                                    onClick={() => setScalability(tier)}
                                    className="flex items-center gap-2 cursor-pointer group"
                                >
                                    <div className={`w-4 h-4 rounded-full border transition-colors flex items-center justify-center ${scalability === tier ? "border-[#2D312E]" : "border-gray-400 group-hover:border-[#2D312E]"}`}>
                                        {scalability === tier && <div className="w-2 h-2 rounded-full bg-[#2D312E]" />}
                                    </div>
                                    <span className={`text-sm font-medium transition-colors ${scalability === tier ? "text-[#2D312E]" : "text-gray-400 group-hover:text-[#2D312E]"}`}>
                                        {tier}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <Link href="/contact?type=booking" className="w-fit bg-[#4A5D4E] text-white px-8 py-4 rounded-md font-semibold hover:bg-[#3A493D] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#4A5D4E]/20">
                        Contact us to learn more about our products
                    </Link>
                </div>

                {/* Right — Product Visualization */}
                <div className="relative">
                    <div className="relative w-full aspect-[4/5] max-w-lg mx-auto">
                        {/* Decorative base */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-12 bg-[#D1D8D2] rounded-[100%] blur-xl opacity-50" />

                        {/* Main card */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            <div className="relative w-full md:w-4/5 h-full md:h-4/5 bg-gradient-to-br from-[#4A5D4E] to-[#2D312E] rounded-2xl shadow-2xl flex flex-col p-6 md:p-8 overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-700">
                                {/* Header */}
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-1">Alpha Intelligence</p>
                                        <div className="flex items-center gap-1.5">
                                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                            <span className="text-white/60 text-[10px]">All systems operational</span>
                                        </div>
                                    </div>
                                    <span className="text-white/40 text-xs font-mono uppercase tracking-widest">v2.0.4</span>
                                </div>

                                {/* Metrics */}
                                <div className="space-y-3 mb-auto">
                                    {mockMetrics.map((m, i) => (
                                        <div key={i} className="bg-white/5 rounded-xl px-4 py-3 flex items-center justify-between">
                                            <span className="text-white/50 text-xs font-medium">{m.label}</span>
                                            <span className="text-white font-bold text-sm tabular-nums">{m.value}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8">
                                    <div className="text-white/20 text-2xl md:text-4xl font-bold uppercase tracking-tightest leading-none mb-1">Alpha</div>
                                    <div className="text-white text-3xl md:text-5xl font-bold tracking-tight">Intelligence</div>
                                </div>

                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl" />
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#7FB3A0]/10 rounded-full -ml-12 -mb-12 blur-3xl" />
                            </div>
                        </div>
                    </div>

                    {/* Category floating tabs */}
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
                        {categories.map((cat) => (
                            <button
                                key={cat.short}
                                onClick={() => handleCategoryClick(cat.full)}
                                className="group/item relative flex items-center"
                            >
                                <div
                                    className="w-10 h-10 flex items-center justify-center text-[10px] font-bold rounded-sm cursor-pointer transition-opacity hover:opacity-80 text-white"
                                    style={{ backgroundColor: cat.color }}
                                >
                                    {cat.short}
                                </div>
                                <div className="absolute left-12 whitespace-nowrap bg-[#2D312E] text-white px-3 py-2 rounded text-[10px] font-bold opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300 transform -translate-x-2 group-hover/item:translate-x-0">
                                    {cat.full}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
