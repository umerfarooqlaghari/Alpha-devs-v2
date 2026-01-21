/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";

const FALLBACK_SERVICES = [
    {
        title: "AI Automation & Workflows",
        keywords: ["Intelligent Automation", "RPA", "Predictive Analytics", "Operational Efficiency", "LLMs"],
        videoUrl: "https://videos.pexels.com/video-files/8353841/8353841-sd_540_960_25fps.mp4" // Placeholder tech video
    },
    {
        title: "Computer Vision & ML",
        keywords: ["Image Recognition", "Object Detection", "Neural Networks", "Anomaly Detection", "Deep Learning"],
        videoUrl: "https://videos.pexels.com/video-files/5527787/5527787-sd_540_960_25fps.mp4"
    },
    {
        title: "Website Development",
        keywords: ["Next.js", "React", "Responsive Design", "SEO Optimization", "Modern UI/UX"],
        videoUrl: "https://videos.pexels.com/video-files/3129671/3129671-sd_640_360_30fps.mp4"
    },
    {
        title: "Application Development",
        keywords: ["Mobile Apps", "Cross-Platform", "Scalable Architecture", "Microservices", "Native Performance"],
        videoUrl: "https://videos.pexels.com/video-files/4124024/4124024-sd_640_360_25fps.mp4"
    },
    {
        title: "Cloud Infrastructure",
        keywords: ["AWS / Azure", "Kubernetes", "Serverless", "Scalability", "DevOps"],
        videoUrl: "https://videos.pexels.com/video-files/852423/852423-sd_640_360_25fps.mp4"
    },
    {
        title: "Cyber Security",
        keywords: ["Penetration Testing", "Threat Detection", "Encryption", "Zero Trust", "Risk Management"],
        videoUrl: "https://videos.pexels.com/video-files/5377521/5377521-sd_640_360_25fps.mp4"
    },
    {
        title: "Data Engineering",
        keywords: ["ETL Pipelines", "Big Data", "Data Warehousing", "Real-time Processing", "Analytics"],
        videoUrl: "https://videos.pexels.com/video-files/3129957/3129957-sd_640_360_25fps.mp4"
    },
    {
        title: "E-commerce Development",
        keywords: ["Shopify / WooCommerce", "Payment Gateways", "Inventory Management", "Conversion Optimization"],
        videoUrl: "https://videos.pexels.com/video-files/5093557/5093557-sd_640_360_25fps.mp4"
    },
    {
        title: "Digital Marketing & Design",
        keywords: ["SEO Strategy", "Brand Identity", "UI/UX Design", "Social Media", "Growth Hacking"],
        videoUrl: "https://videos.pexels.com/video-files/7688464/7688464-sd_640_360_25fps.mp4"
    }
];

export default function ServicesMarquee() {
    const [services, setServices] = useState(FALLBACK_SERVICES);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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

    return (
        <section className="w-full py-24 bg-cream overflow-hidden">
            <div className="mb-12 px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-dark-navy mb-4">Our Services</h2>
                <p className="text-dark-navy/60 text-lg">Comprehensive technology solutions for the modern enterprise.</p>
            </div>

            <div className="flex w-full">
                {/* Doubling the list for infinite scroll effect */}
                <div className="flex animate-marquee min-w-full gap-8 px-4">
                    {[...services, ...services].map((service, idx) => (
                        <div
                            key={`${service.title}-${idx}`}
                            className="flex-shrink-0 w-80 h-[450px] rounded-3xl overflow-hidden relative group"
                        >
                            {/* Background Video */}
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            >
                                <source src={service.videoUrl} type="video/mp4" />
                            </video>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-dark-navy/90 via-dark-navy/40 to-transparent p-8 flex flex-col justify-end">
                                <h3 className="text-2xl font-bold text-white mb-4 leading-tight">{service.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {service.keywords.map((kw: string, kIdx: number) => (
                                        <span key={kIdx} className="text-[10px] uppercase tracking-wider font-bold bg-white/10 backdrop-blur-sm text-white/90 px-2 py-1 rounded">
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
