"use client";

import { useState } from "react";

const DETAILS = [
    {
        title: "Cloud Architecture",
        content: "Built on microservices and serverless infrastructure (AWS/Azure) to handle millions of requests with auto-scaling capabilities and zero downtime deployments."
    },
    {
        title: "Modern Tech Stack",
        content: "Utilizing Next.js, React, Node.js, and PostgreSQL to ensure high performance, SEO optimization, and future-proof scalable solutions."
    },
    {
        title: "Enterprise Security",
        content: "SOC2 compliant standards, end-to-end encryption (AES-256), and rigorous penetration testing to protect your critical data assets."
    }
];

export default function TechnicalAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="bg-cream py-24 px-6 border-b border-gray-200">
            <div className="max-w-4xl mx-auto">
                <h3 className="text-sm font-bold tracking-widest uppercase mb-12 text-center text-white">Technical Specifications</h3>
                <div className="space-y-4">
                    {DETAILS.map((item, idx) => (
                        <div key={idx} className="border-b border-dark-navy/10 last:border-0 pb-4 transition-all duration-300 hover:bg-black hover:text-white hover:pl-6 hover:pr-6 rounded-2xl group">
                            <button
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                className="w-full flex items-center justify-between py-6 px-2 text-left"
                            >
                                <span className="text-2xl md:text-3xl font-bold text-dark-navy group-hover:text-white transition-colors">
                                    {item.title}
                                </span>
                                <span className={`text-2xl transition-transform duration-300 group-hover:text-white ${openIndex === idx ? "rotate-45" : ""}`}>
                                    +
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out px-2 ${openIndex === idx ? "max-h-48 opacity-100 pb-6" : "max-h-0 opacity-0"
                                    }`}
                            >
                                <p className="text-lg leading-relaxed text-dark-navy/80 max-w-2xl group-hover:text-gray-300 transition-colors">
                                    {item.content}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
