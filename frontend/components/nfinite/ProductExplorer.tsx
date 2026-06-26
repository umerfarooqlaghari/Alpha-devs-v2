"use client";

import { useState, useEffect } from "react";
import { ArrowRight, CheckCircle2, Loader2, ExternalLink } from "lucide-react";
import Link from "next/link";
import NextImage from "next/image";

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

// Accent palette for cards — cycles through products
const ACCENTS = [
    { bar: "#4A5D4E", badge: "bg-[#4A5D4E]/10 text-[#4A5D4E]", ring: "hover:ring-[#4A5D4E]/20" },
    { bar: "#2D312E", badge: "bg-[#2D312E]/10 text-[#2D312E]", ring: "hover:ring-[#2D312E]/20" },
    { bar: "#7FB3A0", badge: "bg-[#7FB3A0]/20 text-[#3B7A6E]", ring: "hover:ring-[#7FB3A0]/30" },
    { bar: "#5C7A6E", badge: "bg-[#5C7A6E]/10 text-[#5C7A6E]", ring: "hover:ring-[#5C7A6E]/20" },
    { bar: "#3B5249", badge: "bg-[#3B5249]/10 text-[#3B5249]", ring: "hover:ring-[#3B5249]/20" },
];

interface ProductExplorerProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

function FeaturedCard({ product, accent }: { product: Product; accent: typeof ACCENTS[0] }) {
    return (
        <Link
            href={`/products/${product.slug || product.id}`}
            className={`group relative bg-[#F9FAF9] rounded-3xl overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/60 ring-2 ring-transparent ${accent.ring} md:col-span-3 flex flex-col md:flex-row`}
        >
            {/* Accent bar */}
            <div className="h-1.5 md:h-auto md:w-1.5 flex-shrink-0" style={{ backgroundColor: accent.bar }} />

            <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 flex-1">
                {/* Left */}
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-6">
                        <span className={`inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border border-current/10 ${accent.badge}`}>
                            {product.category}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-300">Featured</span>
                    </div>
                    <h4 className="text-3xl md:text-4xl font-bold text-[#2D312E] mb-2 tracking-tight">{product.name}</h4>
                    <p className="text-sm font-medium text-[#4A5D4E] mb-5 italic">{product.tagline}</p>
                    <p className="text-[#5C635E] text-sm leading-relaxed max-w-lg">{product.description}</p>

                    <div className="flex items-center gap-2 mt-8 text-xs font-bold uppercase tracking-widest text-[#2D312E] group-hover:text-[#4A5D4E] transition-colors">
                        Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>

                {/* Right — feature list + image */}
                <div className="md:w-72 flex-shrink-0 flex flex-col gap-6">
                    {product.imageUrl && (
                        <div className="relative w-full h-40 rounded-2xl overflow-hidden">
                            <NextImage
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover"
                                sizes="288px"
                                unoptimized
                            />
                        </div>
                    )}
                    <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-5">Key Capabilities</p>
                        <ul className="space-y-3">
                            {product.features.slice(0, 6).map((f, i) => (
                                <li key={i} className="flex items-center gap-3 text-xs font-medium text-[#2D312E]">
                                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: accent.bar }} />
                                    {f}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Link>
    );
}

function ProductCard({ product, accent }: { product: Product; accent: typeof ACCENTS[0] }) {
    return (
        <Link
            href={`/products/${product.slug || product.id}`}
            className={`group relative bg-[#F9FAF9] rounded-3xl overflow-hidden border border-gray-100 transition-all duration-500 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 ring-2 ring-transparent ${accent.ring} flex flex-col`}
        >
            {/* Top accent bar */}
            <div className="h-1 w-full" style={{ backgroundColor: accent.bar }} />

            {/* Image */}
            {product.imageUrl && (
                <div className="relative w-full h-44 overflow-hidden">
                    <NextImage
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F9FAF9]/60 to-transparent" />
                </div>
            )}

            <div className="p-7 flex flex-col flex-1">
                <span className={`inline-block w-fit px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full border border-current/10 mb-5 ${accent.badge}`}>
                    {product.category}
                </span>

                <h4 className="text-xl font-bold text-[#2D312E] mb-1 group-hover:text-[#4A5D4E] transition-colors">{product.name}</h4>
                <p className="text-xs font-medium text-[#4A5D4E] mb-4 italic">{product.tagline}</p>
                <p className="text-[#5C635E] text-xs leading-relaxed mb-6 flex-1">
                    {product.description.length > 140 ? product.description.slice(0, 140) + "…" : product.description}
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                    {product.features.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 bg-white rounded-full border border-gray-100 text-gray-500">
                            {f}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#2D312E] group-hover:text-[#4A5D4E] transition-colors mt-auto">
                    Explore <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
            </div>
        </Link>
    );
}

export default function ProductExplorer({ activeCategory, onCategoryChange }: ProductExplorerProps) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        fetch(`${API_URL}/api/products`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filteredProducts = activeCategory === "All"
        ? products
        : products.filter((p) => p.category === activeCategory);

    const [featured, ...rest] = filteredProducts;

    return (
        <section className="py-24 bg-white" id="our-products">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                    <div>
                        <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-4">Portfolio</h2>
                        <h3 className="text-5xl font-bold text-[#2D312E] tracking-tighter">OUR PRODUCTS</h3>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => onCategoryChange(cat)}
                                className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${activeCategory === cat
                                    ? "bg-[#2D312E] text-white"
                                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="py-32 flex flex-col items-center">
                        <Loader2 className="w-10 h-10 animate-spin text-[#4A5D4E] mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Architecting Portfolio...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="py-32 text-center text-gray-400">
                        <p className="text-lg font-bold mb-2">No products in this category yet.</p>
                        <button onClick={() => onCategoryChange("All")} className="text-sm underline hover:text-[#4A5D4E] transition-colors">Show All</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Featured — spans full width */}
                        {featured && (
                            <FeaturedCard product={featured} accent={ACCENTS[0]} />
                        )}

                        {/* Remaining — 3-col grid */}
                        {rest.map((product, i) => (
                            <ProductCard key={product.id} product={product} accent={ACCENTS[(i + 1) % ACCENTS.length]} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
