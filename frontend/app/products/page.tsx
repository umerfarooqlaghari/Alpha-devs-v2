
"use client";

import { useState } from "react";
import Navbar from "@/components/nfinite/Navbar";
import Footer from "@/components/nfinite/Footer";
import ProductHero from "@/components/nfinite/ProductHero";
import ProductStats from "@/components/nfinite/ProductStats";
import WhyAlphaDevs from "@/components/nfinite/WhyAlphaDevs";
import ProductExplorer from "@/components/nfinite/ProductExplorer";

export default function ProductsPage() {
    const [activeCategory, setActiveCategory] = useState("All");

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <ProductHero onCategorySelect={setActiveCategory} />
            <div className="bg-white">
                <ProductStats />
                <WhyAlphaDevs />
                <ProductExplorer activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            </div>
            <Footer />
        </main>
    );
}
