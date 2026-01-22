"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

interface Product {
    id: string;
    name: string;
    slug: string;
    tagline: string;
    category: string;
    description: string;
    features: string[];
    imageUrl: string | null;
    videoUrl: string | null;
}

const categories = ["All", "Artificial Intelligence", "Enterprise Resource Planning", "Computer Vision", "Software as a Service", "Education Technology"];

import Link from "next/link";

interface ProductExplorerProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

export default function ProductExplorer({ activeCategory, onCategoryChange }: ProductExplorerProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        fetch(`${API_URL}/api/products`, {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <section className="py-24 bg-white" id="our-products">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <h2 className="text-sm font-bold tracking-[0.3em] uppercase text-gray-400 mb-4">Portfolio</h2>
                        <h3 className="text-5xl font-bold text-[#2D312E] tracking-tighter">OUR PRODUCTS</h3>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => onCategoryChange(cat)}
                                className={`px-6 py-2 rounded-full text-xs font-bold transition-all duration-300 ${activeCategory === cat
                                    ? "bg-[#2D312E] text-white"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="py-32 flex flex-col items-center">
                        <Loader2 className="w-10 h-10 animate-spin text-[#4A5D4E] mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Architecting Portfolio...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="group relative bg-[#F9FAF9] rounded-3xl overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50"
                            >
                                <div className="p-8 md:p-12">
                                    <span className="inline-block px-3 py-1 bg-white text-[#4A5D4E] text-[10px] font-bold uppercase tracking-wider rounded-full mb-6 border border-gray-100 italic">
                                        {product.category}
                                    </span>
                                    <h4 className="text-3xl font-bold text-[#2D312E] mb-2">{product.name}</h4>
                                    <p className="text-sm font-medium text-[#4A5D4E] mb-6 italic">{product.tagline}</p>
                                    <p className="text-[#5C635E] text-sm leading-relaxed mb-8 max-w-sm">
                                        {product.description}
                                    </p>

                                    <ul className="space-y-3 mb-10">
                                        {product.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-xs font-medium text-[#2D312E]">
                                                <CheckCircle2 className="w-4 h-4 text-[#4A5D4E]" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={`/products/${product.slug || product.id}`}
                                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#2D312E] group/btn w-fit"
                                    >
                                        Learn More
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                    </Link>
                                </div>

                                {/* Images intentionally removed for cleaner cards */}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
