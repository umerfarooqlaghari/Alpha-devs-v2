import React, { useEffect, useState } from 'react';
import { Zap, Cpu, Code, Layers, Globe, Shield, Database, ShoppingCart, Paintbrush, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Service {
    id: string;
    title: string;
    description: string;
    keywords: string[];
    slug?: string;
    videoUrl?: string;
}

const iconMap: Record<string, React.ReactNode> = {
    "AI Automation & Workflows": <Zap className="w-6 h-6" />,
    "Computer Vision & ML": <Cpu className="w-6 h-6" />,
    "Website Development": <Code className="w-6 h-6" />,
    "Application Development": <Layers className="w-6 h-6" />,
    "Cloud Infrastructure": <Globe className="w-6 h-6" />,
    "Cyber Security": <Shield className="w-6 h-6" />,
    "Data Engineering": <Database className="w-6 h-6" />,
    "E-commerce Development": <ShoppingCart className="w-6 h-6" />,
    "Digital Marketing & Design": <Paintbrush className="w-6 h-6" />,
};

export default function ServicesGrid() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services`);
                const data = await response.json();
                setServices(data);
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <section className="py-24 bg-cream">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header matching image layout */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                    <div className="max-w-xl">
                        <span className="text-light-blue font-bold tracking-widest uppercase text-xs mb-3 block">
                            Leader in Innovation
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-dark-navy"> Services </h2>
                    </div>
                    <div className="max-w-md">
                        <p className="text-dark-navy/60 text-sm leading-relaxed">
                            We provide cutting-edge technological solutions tailored to your business needs, ensuring scalability, security, and intelligence in every project.
                        </p>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="h-80 bg-white/5 animate-pulse rounded-2xl" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {services.map((service) => (
                            <div
                                key={service.id}
                                className="group bg-white/[0.03] border border-white/5 hover:border-light-blue/30 p-8 rounded-2xl transition-all duration-500 hover:bg-white/[0.06] flex flex-col h-full"
                            >
                                <div className="text-light-blue mb-6 group-hover:scale-110 transition-transform duration-500 origin-left">
                                    {iconMap[service.title] || <Zap className="w-6 h-6" />}
                                </div>
                                <h3 className="text-xl font-bold mb-4 group-hover:text-light-blue transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-sm text-dark-navy/50 leading-relaxed mb-8 flex-grow">
                                    {service.description}
                                </p>
                                <Link
                                    href={`/services/${service.slug || service.id}`}
                                    className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-dark-navy/40 hover:text-light-blue transition-colors group/btn"
                                >
                                    Read more
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        ))}
                    </div>
                )}


            </div>
        </section>
    );
}
