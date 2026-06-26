
"use client";

import { useState, useEffect, useRef } from "react";
import { ShieldCheck, Zap, Globe, Layers } from "lucide-react";

function useCountUp(target: number, duration = 1500, active = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!active) return;
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [active, target, duration]);

    return count;
}

export default function ProductStats() {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const clients = useCountUp(15, 1200, visible);
    const deployments = useCountUp(35, 1400, visible);
    const countries = useCountUp(10, 1000, visible);

    const stats = [
        { icon: ShieldCheck, value: `${clients}+`, label: "Happy Clients", desc: "Enterprise partnerships built on trust" },
        { icon: Zap, value: `${deployments}+`, label: "Successful Deployments", desc: "Products shipped and running in production" },
        { icon: Globe, value: `${countries}+`, label: "Countries Served", desc: "Global reach across multiple industries" },
        { icon: Layers, value: "99.9%", label: "Uptime Guaranteed", desc: "Enterprise-grade reliability, always on" },
    ];

    return (
        <section ref={ref} className="py-0">
            <div className="bg-[#2D312E] py-20 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#7FB3A0] text-center mb-14">By the Numbers</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
                        {stats.map((stat, i) => (
                            <div key={i} className="bg-[#2D312E] px-8 py-10 flex flex-col items-center text-center hover:bg-[#3A4440] transition-colors group">
                                <div className="w-10 h-10 rounded-xl bg-[#4A5D4E]/30 flex items-center justify-center mb-5 group-hover:bg-[#4A5D4E]/50 transition-colors">
                                    <stat.icon className="w-5 h-5 text-[#7FB3A0]" strokeWidth={1.5} />
                                </div>
                                <span className="text-4xl md:text-5xl font-bold text-white mb-1 tracking-tight tabular-nums">
                                    {stat.value}
                                </span>
                                <span className="text-xs font-bold uppercase tracking-widest text-[#7FB3A0] mb-2">
                                    {stat.label}
                                </span>
                                <span className="text-xs text-white/40 leading-relaxed hidden md:block">
                                    {stat.desc}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
