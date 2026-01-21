
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const isContactPage = pathname === "/contact";
    const isProductsPage = pathname === "/products";
    const isConsultancyPage = pathname === "/consultancy";
    const isServicesPage = pathname === "/services";
    const isAboutPage = pathname === "/about";

    // Theme logic: Products page and product detail pages have light background
    const isLightPage = isProductsPage || pathname.startsWith("/products/");
    const textColor = isLightPage ? "text-black hover:text-gray-600" : "text-gray-300 hover:text-white";
    const logoClass = "object-contain object-left " + (isLightPage ? "" : "invert");

    return (
        <nav className="absolute top-0 left-0 right-0 z-50 px-6 md:px-12 py-6 bg-transparent">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo Area (Left) */}
                <div className="flex-1 flex justify-start">
                    <Link href="/">
                        <div className="relative w-32 h-10">
                            <Image
                                src="/next.svg"
                                alt="Alpha Development"
                                fill
                                className={logoClass}
                                priority
                            />
                        </div>
                    </Link>
                </div>

                {/* Navigation Links (Center) */}
                <div className="hidden md:flex items-center gap-8">
                    {!isConsultancyPage && (
                        <Link href="/consultancy" className={`text-sm font-medium transition-opacity ${textColor}`}>
                            Consultancy
                        </Link>
                    )}
                    {!isServicesPage && (
                        <Link href="/services" className={`text-sm font-medium transition-opacity ${textColor}`}>
                            Services
                        </Link>
                    )}
                    {!isProductsPage && (
                        <Link href="/products" className={`text-sm font-medium transition-opacity ${textColor}`}>
                            Products
                        </Link>
                    )}
                    {!isAboutPage && (
                        <Link href="/about" className={`text-sm font-medium transition-opacity ${textColor}`}>
                            About Us
                        </Link>
                    )}
                    {!isContactPage && (
                        <Link href="/contact" className={`text-sm font-medium transition-opacity ${textColor}`}>
                            Contact Us
                        </Link>
                    )}
                </div>

                {/* CTA Button (Right Area - Fixed width container to maintain center balance) */}
                <div className="flex-1 flex justify-end">
                    {!isContactPage && (
                        <Link href="/contact?type=booking">
                            <button className={`${isLightPage ? 'bg-black text-white' : 'bg-light-blue text-black'} px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 border border-transparent whitespace-nowrap`}>
                                Book a Call
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
