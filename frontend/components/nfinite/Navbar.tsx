
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const isContactPage = pathname === "/contact";
    const isProductsPage = pathname === "/products";
    const isConsultancyPage = pathname === "/consultancy";
    const isServicesPage = pathname === "/services";
    const isAboutPage = pathname === "/about";
    const isBlogPage = pathname.startsWith("/blog");
    const isFAQPage = pathname === "/faq";
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Theme logic: Products page and product detail pages have light background
    const isLightPage = isProductsPage || pathname.startsWith("/products/") || pathname.startsWith("/services/");
    const textColor = isLightPage ? "text-black hover:text-gray-600" : "text-gray-300 hover:text-white";
    const logoClass = "object-contain object-left " + (isLightPage ? "" : "invert");

    useEffect(() => {
        if (!isMenuOpen) return;
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("keydown", closeOnEscape);
        return () => window.removeEventListener("keydown", closeOnEscape);
    }, [isMenuOpen]);

    return (
        <nav className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-12 py-6 bg-transparent">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
                {/* Logo Area (Left) */}
                <div className="flex-1 min-w-0 flex justify-start">
                    <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
                        <div className="relative w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 transition-transform duration-500 group-hover:rotate-[360deg]">
                            <Image
                                src="/favicon.png"
                                alt="Alpha"
                                fill
                                className={`object-contain ${isLightPage ? "invert" : ""}`}
                                priority
                            />
                        </div>
                        <div className={`logo-container font-black tracking-tighter text-base xs:text-lg sm:text-xl md:text-2xl uppercase ${isLightPage ? "text-black" : "text-white"} truncate`}>
                            {"Alpha Development".split("").map((char, i, arr) => (
                                <span
                                    key={i}
                                    className="logo-letter animate-logo-wave inline-block"
                                    style={{
                                        animationDelay: `${(arr.length - i - 1) * 0.05}s`,
                                        whiteSpace: char === " " ? "pre" : "normal"
                                    }}
                                >
                                    {char}
                                </span>
                            ))}
                        </div>
                    </Link>
                </div>

                {/* Navigation Links (Center) */}
                <div className="hidden md:flex items-center gap-8">
                    {!isConsultancyPage && (
                        <Link href="/consultancy" data-track="nav-link-consultancy" className={`text-sm font-medium transition-opacity ${textColor}`}>
                            Consultancy
                        </Link>
                    )}
                    {!isServicesPage && (
                        <Link href="/services" data-track="nav-link-services" className={`text-sm font-medium transition-opacity ${textColor}`}>
                            Services
                        </Link>
                    )}
                    {!isProductsPage && (
                        <Link href="/products" data-track="nav-link-products" className={`text-sm font-medium transition-opacity ${textColor}`}>
                            Products
                        </Link>
                    )}
                    {!isAboutPage && (
                        <Link href="/about" data-track="nav-link-about" className={`text-sm font-medium transition-opacity ${textColor}`}>
                            About Us
                        </Link>
                    )}
                    {!isBlogPage && (
                        <Link href="/blog" data-track="nav-link-blog" className={`text-sm font-medium transition-opacity ${textColor}`}>
                            Blog
                        </Link>
                    )}
                    {!isFAQPage && (
                        <Link href="/faq" data-track="nav-link-faq" className={`text-sm font-medium transition-opacity ${textColor}`}>
                            FAQ
                        </Link>
                    )}
                    {!isContactPage && (
                        <Link href="/contact" data-track="nav-link-contact" className={`text-sm font-medium transition-opacity ${textColor}`}>
                            Contact Us
                        </Link>
                    )}
                </div>

                {/* CTA Button (Right Area - Fixed width container to maintain center balance) */}
                <div className="flex-1 flex items-center justify-end gap-3">
                    {!isContactPage && (
                        <Link href="/contact?type=booking" data-track="nav-cta-booking">
                            <button className={`${isLightPage ? 'bg-black text-white' : 'bg-light-blue text-black'} hidden md:inline-flex px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 border border-transparent whitespace-nowrap`}>
                                Book a Call
                            </button>
                        </Link>
                    )}
                    <button
                        type="button"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                        onClick={() => setIsMenuOpen((prev) => !prev)}
                        className={`md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border ${isLightPage ? "border-black/20 text-black hover:bg-black/5" : "border-white/20 text-white hover:bg-white/10"} transition`}
                    >
                        <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
                        <span className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${isMenuOpen ? "translate-y-1.5 rotate-45" : ""}`} />
                        <span className={`block h-0.5 w-5 bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0" : "my-1.5"}`} />
                        <span className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${isMenuOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed inset-0 z-40 ${isMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
                <div
                    className={`absolute inset-0 transition-opacity duration-300 ${isMenuOpen ? "opacity-100" : "opacity-0"} ${isLightPage ? "bg-black/30" : "bg-black/60"}`}
                    onClick={() => setIsMenuOpen(false)}
                />
                <div
                    className={`absolute right-0 top-0 h-full w-80 max-w-[85%] p-8 transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "translate-x-full"} ${isLightPage ? "bg-white text-black" : "bg-[#0b0f14] text-white"} shadow-2xl`}
                >
                    <div className="flex items-center justify-between mb-8">
                        <Link href="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 group">
                            <div className="relative w-6 h-6 flex-shrink-0">
                                <Image
                                    src="/favicon.png"
                                    alt="Alpha"
                                    fill
                                    className={`object-contain ${isLightPage ? "invert" : ""}`}
                                    priority
                                />
                            </div>
                            <div className={`logo-container font-black tracking-tighter text-xl uppercase ${isLightPage ? "text-black" : "text-white"}`}>
                                {"Alpha Development".split("").map((char, i, arr) => (
                                    <span
                                        key={i}
                                        className="logo-letter animate-logo-wave inline-block"
                                        style={{
                                            animationDelay: `${(arr.length - i - 1) * 0.05}s`,
                                            whiteSpace: char === " " ? "pre" : "normal"
                                        }}
                                    >
                                        {char}
                                    </span>
                                ))}
                            </div>
                        </Link>
                        <button
                            type="button"
                            aria-label="Close menu"
                            onClick={() => setIsMenuOpen(false)}
                            className={`h-10 w-10 inline-flex items-center justify-center rounded-full border ${isLightPage ? "border-black/20 hover:bg-black/5" : "border-white/20 hover:bg-white/10"} transition`}
                        >
                            <span className="block h-0.5 w-5 bg-current rotate-45 translate-y-0.5" />
                            <span className="block h-0.5 w-5 bg-current -rotate-45 -translate-y-0.5" />
                        </button>
                    </div>
                    <div className="flex flex-col gap-5 text-lg font-medium">
                        {!isConsultancyPage && (
                            <Link href="/consultancy" onClick={() => setIsMenuOpen(false)} className="transition-opacity hover:opacity-70">
                                Consultancy
                            </Link>
                        )}
                        {!isServicesPage && (
                            <Link href="/services" onClick={() => setIsMenuOpen(false)} className="transition-opacity hover:opacity-70">
                                Services
                            </Link>
                        )}
                        {!isProductsPage && (
                            <Link href="/products" onClick={() => setIsMenuOpen(false)} className="transition-opacity hover:opacity-70">
                                Products
                            </Link>
                        )}
                        {!isAboutPage && (
                            <Link href="/about" onClick={() => setIsMenuOpen(false)} className="transition-opacity hover:opacity-70">
                                About Us
                            </Link>
                        )}
                        {!isBlogPage && (
                            <Link href="/blog" onClick={() => setIsMenuOpen(false)} className="transition-opacity hover:opacity-70">
                                Blog
                            </Link>
                        )}
                        {!isFAQPage && (
                            <Link href="/faq" onClick={() => setIsMenuOpen(false)} className="transition-opacity hover:opacity-70">
                                FAQ
                            </Link>
                        )}
                        {!isContactPage && (
                            <Link href="/contact" onClick={() => setIsMenuOpen(false)} className="transition-opacity hover:opacity-70">
                                Contact Us
                            </Link>
                        )}
                    </div>
                    {!isContactPage && (
                        <Link href="/contact?type=booking" onClick={() => setIsMenuOpen(false)} className="mt-10 inline-flex">
                            <span className={`${isLightPage ? "bg-black text-white" : "bg-light-blue text-black"} px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 border border-transparent whitespace-nowrap`}>
                                Book a Call
                            </span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
