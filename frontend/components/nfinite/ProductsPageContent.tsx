"use client";

import { useState } from "react";
import ProductHero from "./ProductHero";
import ProductStats from "./ProductStats";
import WhyAlphaDevs from "./WhyAlphaDevs";
import ProductExplorer from "./ProductExplorer";

export default function ProductsPageContent() {
    const [activeCategory, setActiveCategory] = useState("All");

    return (
        <div className="bg-white">
            <ProductHero onCategorySelect={setActiveCategory} />
            <div className="bg-white">
                <ProductStats />
                <WhyAlphaDevs />
                <ProductExplorer activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            </div>
        </div>
    );
}
