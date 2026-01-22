"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
        { short: "AI", full: "Artificial Intelligence" },
        { short: "ERP", full: "Enterprise Resource Planning" },
        { short: "CV", full: "Computer Vision" },
        { short: "SaaS", full: "Software as a Service" },
        { short: "Edu", full: "Education Technology" },
    ];

    return (
        <section className="relative pt-32 pb-20 px-6 md:px-12 bg-[#F1F5F0] overflow-hidden min-h-[90vh] flex items-center">
            {/* Background Text Decoration */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 rotate-90 origin-right text-[15rem] font-bold text-[#E9EEE8] leading-none pointer-events-none select-none uppercase tracking-tighter">
                Solutions
            </div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Left Content */}
                <div className="flex flex-col">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">Products</span>
                        <div className="h-[1px] w-12 bg-gray-300"></div>
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">Story</span>
                        <div className="h-[1px] w-12 bg-gray-300"></div>
                        <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400">Innovation</span>
                    </div>

                    <h1 className="text-5xl md:text-8xl font-bold text-[#2D312E] mb-6 tracking-tighter leading-[0.9]">
                        Alpha<br />Solutions
                    </h1>

                    <p className="text-xl text-[#5C635E] max-w-md mb-10 leading-relaxed">
                        Intelligent systems designed for enterprise growth. From AI-powered ERPs to advanced computer vision monitoring, we build the core of your digital future.
                    </p>

                    <div className="flex flex-col gap-4 mb-12">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Scalability</label>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setScalability("Basic")}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <div className={`w-4 h-4 rounded-full border transition-colors flex items-center justify-center ${scalability === "Basic" ? "border-[#2D312E]" : "border-gray-400 group-hover:border-[#2D312E]"}`}>
                                    {scalability === "Basic" && <div className="w-2 h-2 rounded-full bg-[#2D312E]"></div>}
                                </div>
                                <span className={`text-sm font-medium transition-colors ${scalability === "Basic" ? "text-[#2D312E]" : "text-gray-400 group-hover:text-[#2D312E]"}`}>Basic</span>
                            </button>
                            <button
                                onClick={() => setScalability("Standard")}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <div className={`w-4 h-4 rounded-full border transition-colors flex items-center justify-center ${scalability === "Standard" ? "border-[#2D312E]" : "border-gray-400 group-hover:border-[#2D312E]"}`}>
                                    {scalability === "Standard" && <div className="w-2 h-2 rounded-full bg-[#2D312E]"></div>}
                                </div>
                                <span className={`text-sm font-medium transition-colors ${scalability === "Standard" ? "text-[#2D312E]" : "text-gray-400 group-hover:text-[#2D312E]"}`}>Standard</span>
                            </button>
                            <button
                                onClick={() => setScalability("Enterprise")}
                                className="flex items-center gap-2 cursor-pointer group"
                            >
                                <div className={`w-4 h-4 rounded-full border transition-colors flex items-center justify-center ${scalability === "Enterprise" ? "border-[#2D312E]" : "border-gray-400 group-hover:border-[#2D312E]"}`}>
                                    {scalability === "Enterprise" && <div className="w-2 h-2 rounded-full bg-[#2D312E]"></div>}
                                </div>
                                <span className={`text-sm font-medium transition-colors ${scalability === "Enterprise" ? "text-[#2D312E]" : "text-gray-400 group-hover:text-[#2D312E]"}`}>Enterprise</span>
                            </button>
                        </div>
                    </div>

                    <Link href="/contact?type=booking" className="w-fit bg-[#4A5D4E] text-white px-8 py-4 rounded-md font-semibold hover:bg-[#3A493D] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-[#4A5D4E]/20 text-center">
                        Contact us to learn more about our products
                    </Link>
                </div>

                {/* Right Image/Product Placeholder */}
                <div className="relative">
                    <div className="relative w-full aspect-[4/5] max-w-lg mx-auto">
                        {/* Decorative Stone/Platform Base */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-12 bg-[#D1D8D2] rounded-[100%] blur-xl opacity-50"></div>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[100%] h-24 bg-gradient-to-t from-[#BCC4BD] to-transparent rounded-[100%]"></div>

                        {/* Featured Product Visualization (Representational) */}
                        <div className="relative z-10 w-full h-full flex items-center justify-center">
                            <div className="relative w-full md:w-4/5 h-full md:h-4/5 bg-gradient-to-br from-[#4A5D4E] to-[#2D312E] rounded-2xl shadow-2xl flex flex-col p-6 md:p-8 overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-700">
                                <div className="flex justify-between items-start mb-12">
                                    <div className="w-12 h-12 bg-white/10 rounded-lg backdrop-blur-md flex items-center justify-center">
                                        <Plus className="text-white w-6 h-6" />
                                    </div>
                                    <span className="text-white/40 text-xs font-mono uppercase tracking-widest">v2.0.4</span>
                                </div>
                                <div className="mt-auto">
                                    <div className="text-white/20 text-2xl md:text-4xl font-bold uppercase tracking-tightest leading-none mb-2">Alpha</div>
                                    <div className="text-white text-3xl md:text-5xl font-bold tracking-tight">Intelligence</div>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Labels/Interactions */}
                    <div className="absolute left-0 top-1/2 -translate-x-1/2 flex flex-col gap-2 z-20">
                        {categories.map((cat) => (
                            <button
                                key={cat.short}
                                onClick={() => handleCategoryClick(cat.full)}
                                className="group/item relative flex items-center"
                            >
                                <div className="w-10 h-10 bg-black text-white flex items-center justify-center text-[10px] font-bold rounded-sm cursor-pointer hover:bg-gray-800 transition-colors">
                                    {cat.short}
                                </div>
                                <div className="absolute left-12 whitespace-nowrap bg-black text-white px-3 py-2 rounded text-[10px] font-bold opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300 transform -translate-x-2 group-hover/item:translate-x-0">
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
