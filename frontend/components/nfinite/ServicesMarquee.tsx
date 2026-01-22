/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const FALLBACK_SERVICES = [
    {
        id: "ai-automation",
        slug: "ai-automation-workflows",
        title: "AI Automation & Workflows",
        keywords: ["Intelligent Automation", "RPA", "Predictive Analytics", "Operational Efficiency", "LLMs"],
        videoUrl: "https://videos.pexels.com/video-files/8353841/8353841-sd_540_960_25fps.mp4"
    },
    {
        id: "cv-ml",
        slug: "computer-vision-ml",
        title: "Computer Vision & ML",
        keywords: ["Image Recognition", "Object Detection", "Neural Networks", "Anomaly Detection", "Deep Learning"],
        videoUrl: "https://videos.pexels.com/video-files/5527787/5527787-sd_540_960_25fps.mp4"
    },
    {
        id: "web-dev",
        slug: "website-development",
        title: "Website Development",
        keywords: ["Next.js", "React", "Responsive Design", "SEO Optimization", "Modern UI/UX"],
        videoUrl: "https://videos.pexels.com/video-files/3129671/3129671-sd_640_360_30fps.mp4"
    },
    {
        id: "app-dev",
        slug: "application-development",
        title: "Application Development",
        keywords: ["Mobile Apps", "Cross-Platform", "Scalable Architecture", "Microservices", "Native Performance"],
        videoUrl: "https://videos.pexels.com/video-files/4124024/4124024-sd_640_360_25fps.mp4"
    },
    {
        id: "cloud-infra",
        slug: "cloud-infrastructure",
        title: "Cloud Infrastructure",
        keywords: ["AWS / Azure", "Kubernetes", "Serverless", "Scalability", "DevOps"],
        videoUrl: "https://videos.pexels.com/video-files/852423/852423-sd_640_360_25fps.mp4"
    },
    {
        id: "cyber-security",
        slug: "cyber-security",
        title: "Cyber Security",
        keywords: ["Penetration Testing", "Threat Detection", "Encryption", "Zero Trust", "Risk Management"],
        videoUrl: "https://videos.pexels.com/video-files/5377521/5377521-sd_640_360_25fps.mp4"
    },
    {
        id: "data-eng",
        slug: "data-engineering",
        title: "Data Engineering",
        keywords: ["ETL Pipelines", "Big Data", "Data Warehousing", "Real-time Processing", "Analytics"],
        videoUrl: "https://videos.pexels.com/video-files/3129957/3129957-sd_640_360_25fps.mp4"
    },
    {
        id: "ecom-dev",
        slug: "e-commerce-development",
        title: "E-commerce Development",
        keywords: ["Shopify / WooCommerce", "Payment Gateways", "Inventory Management", "Conversion Optimization"],
        videoUrl: "https://videos.pexels.com/video-files/5093557/5093557-sd_640_360_25fps.mp4"
    },
    {
        id: "digital-marketing",
        slug: "digital-marketing-design",
        title: "Digital Marketing & Design",
        keywords: ["SEO Strategy", "Brand Identity", "UI/UX Design", "Social Media", "Growth Hacking"],
        videoUrl: "https://videos.pexels.com/video-files/7688464/7688464-sd_640_360_25fps.mp4"
    }
];

export default function ServicesMarquee() {
    const [services, setServices] = useState(FALLBACK_SERVICES);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const [startIndex, setStartIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch(`${API_URL}/api/services`);
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setServices(data.map((s: any) => ({
                            ...s,
                            videoUrl: s.videoUrl || "https://videos.pexels.com/video-files/8353841/8353841-sd_540_960_25fps.mp4" // Fallback video
                        })));
                    }
                }
            } catch (error) {
                console.error("Failed to fetch services", error);
                // Fallback to default
            }
        };
        fetchServices();
    }, []);

    const visibleCount = 3;
    const visibleServices = services.length <= visibleCount
        ? services
        : Array.from({ length: visibleCount }, (_, i) => services[(startIndex + i) % services.length]);

    const handlePrev = () => {
        if (services.length <= visibleCount) return;
        setStartIndex((prev) => (prev - 1 + services.length) % services.length);
    };

    const handleNext = () => {
        if (services.length <= visibleCount) return;
        setStartIndex((prev) => (prev + 1) % services.length);
    };

    useEffect(() => {
        if (isHovered || services.length <= visibleCount) return;
        const interval = setInterval(() => {
            setStartIndex((prev) => (prev + 1) % services.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [isHovered, services.length]);

    return (
        <section className="w-full py-24 bg-cream overflow-hidden">
            <div className="mb-12 px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-dark-navy mb-4">Our Services</h2>
                <p className="text-dark-navy/60 text-lg">Comprehensive technology solutions for the modern enterprise.</p>
            </div>

            <div className="relative max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {visibleServices.map((service, idx) => (
                        <div
                            key={`${service.title}-${idx}`}
                            className="group relative h-[420px] md:h-[480px] rounded-3xl overflow-hidden border border-black/10 bg-black/5"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onTouchStart={() => setIsHovered(true)}
                            onTouchEnd={() => setIsHovered(false)}
                        >
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105"
                            >
                                <source src={service.videoUrl} type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 md:group-hover:bg-black/50" />
                            <div className="absolute inset-x-8 top-8">
                                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight line-clamp-2 min-h-[3rem] md:min-h-[3.5rem] flex items-start">
                                    {service.title}
                                </h3>
                            </div>
                            <div className="absolute inset-x-8 bottom-8">
                                <div className="space-y-3 opacity-100 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 transition-all duration-500">
                                    <p className="text-xs text-white/80 uppercase tracking-[0.25em]">Services</p>
                                    <div className="flex flex-wrap gap-2">
                                        {service.keywords.map((kw: string, kIdx: number) => (
                                            <span key={kIdx} className="text-[10px] uppercase tracking-wider font-bold bg-white/10 backdrop-blur-sm text-white/90 px-2 py-1 rounded">
                                                {kw}
                                            </span>
                                        ))}
                                    </div>
                                    <Link
                                        href={`/services/${service.slug || service.id}`}
                                        className="mt-3 inline-flex items-center justify-center px-6 py-2 border border-white/70 text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                                    >
                                        Explore Service
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="button"
                    aria-label="Previous services"
                    onClick={handlePrev}
                    className="absolute left-2 md:-left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 text-black shadow-lg flex items-center justify-center hover:bg-white transition"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <button
                    type="button"
                    aria-label="Next services"
                    onClick={handleNext}
                    className="absolute right-2 md:-right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/90 text-black shadow-lg flex items-center justify-center hover:bg-white transition"
                >
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </section>
    );
}
