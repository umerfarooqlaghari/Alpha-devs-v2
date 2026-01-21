
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";

// --- Constants & Types ---
const PERSPECTIVE = 600;
const PARTICLE_COUNT = 1500;

enum Shape {
    CORNER_TOP_RIGHT,
    CORNER_BOTTOM_LEFT,
    CORNER_TOP_LEFT,
    CORNER_BOTTOM_RIGHT,
    CENTER_FLOW
}

class Point {
    x: number = 0; y: number = 0; z: number = 0;
    tx: number = 0; ty: number = 0; tz: number = 0;
    color: string; size: number;

    constructor() {
        this.x = (Math.random() - 0.5) * 2000;
        this.y = (Math.random() - 0.5) * 2000;
        this.z = (Math.random() - 0.5) * 2000;

        const r = Math.random();
        if (r > 0.8) this.color = "rgba(178, 190, 181, 0.7)"; // Ash Gray
        else if (r > 0.6) this.color = "rgba(255, 255, 255, 0.6)"; // White
        else {
            const shade = Math.floor(Math.random() * 50 + 100);
            this.color = `rgba(${shade}, ${shade}, ${shade}, 0.4)`;
        }
        this.size = Math.random() * 2 + 0.5;
    }

    setTarget(shape: Shape, idx: number, width: number, height: number) {
        const spread = 400;
        switch (shape) {
            case Shape.CORNER_TOP_RIGHT:
                this.tx = (width / 2) - Math.random() * spread;
                this.ty = -(height / 2) + Math.random() * spread;
                this.tz = Math.random() * 200;
                break;
            case Shape.CORNER_BOTTOM_LEFT:
                this.tx = -(width / 2) + Math.random() * spread;
                this.ty = (height / 2) - Math.random() * spread;
                this.tz = Math.random() * 200;
                break;
            case Shape.CORNER_TOP_LEFT:
                this.tx = -(width / 2) + Math.random() * spread;
                this.ty = -(height / 2) + Math.random() * spread;
                this.tz = Math.random() * 200;
                break;
            case Shape.CORNER_BOTTOM_RIGHT:
                this.tx = (width / 2) - Math.random() * spread;
                this.ty = (height / 2) - Math.random() * spread;
                this.tz = Math.random() * 200;
                break;
            case Shape.CENTER_FLOW:
                const angle = (idx / PARTICLE_COUNT) * Math.PI * 2;
                const r = 200 + Math.random() * 100;
                this.tx = Math.cos(angle) * r;
                this.ty = Math.sin(angle) * r;
                this.tz = 0;
                break;
        }
    }

    update(ease: number) {
        this.x += (this.tx - this.x) * ease;
        this.y += (this.ty - this.y) * ease;
        this.z += (this.tz - this.z) * ease;
    }

    draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
        const zDist = this.z + 800;
        if (zDist <= 0) return;

        const scale = PERSPECTIVE / zDist;
        const x2d = (this.x * scale) + width / 2;
        const y2d = (this.y * scale) + height / 2;

        ctx.fillStyle = this.color;
        const s = Math.max(0.1, this.size * scale);
        ctx.fillRect(x2d, y2d, s, s);
    }
}

export default function AboutUsScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activePhase, setActivePhase] = useState(0);

    const sections = [
        {
            title: "The Genesis of Alpha",
            subtitle: "Engineering Excellence",
            description: "Born from the technical mastery of FAST alumni, Alpha-Devs transitioned from ambitious roots into a high-impact global software powerhouse. We bridge the gap between complex technical challenges and elegant, scalable business solutions.",
            align: "left",
            shape: Shape.CORNER_TOP_RIGHT
        },
        {
            title: "Global Footprint",
            subtitle: "International Deployment",
            description: "Operating across the USA, Europe, and South Asia, we deliver world-class digital products to over 15+ industries. Our global perspective allows us to implement high-performance architectures that scale across borders.",
            align: "right",
            shape: Shape.CORNER_BOTTOM_LEFT
        },
        {
            title: "Strategic Vision",
            subtitle: "Defining the Next Frontier",
            description: "We empower startups and Fortune-level enterprises to accelerate innovation. By integrating AI-driven insights and cloud-native frameworks, we ensure your business doesn't just adapt—it leads.",
            align: "left",
            shape: Shape.CORNER_TOP_LEFT
        },
        {
            title: "The Alpha Standard",
            subtitle: "Uncompromising Quality",
            description: "Built on Precision, Innovation, and absolute Confidentiality. Our 15+ specialists adhere to rigorous development standards, ensuring every project is a masterclass in security and performance.",
            align: "right",
            shape: Shape.CORNER_BOTTOM_RIGHT
        }
    ];

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const particles: Point[] = [];
        let animationFrameId: number;

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (particles.length === 0) {
                for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Point());
            }
        };

        const animate = () => {
            const rect = container.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            let localProgress = (rect.top * -1) / (rect.height - viewportHeight);
            localProgress = Math.min(Math.max(localProgress, 0), 0.99);

            const currentPhase = Math.floor(localProgress * sections.length);
            setActivePhase(currentPhase);

            const targetShape = sections[currentPhase]?.shape || Shape.CENTER_FLOW;

            ctx.fillStyle = "#121212";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                p.setTarget(targetShape, i, canvas.width, canvas.height);
                p.update(0.04);
                p.draw(ctx, canvas.width, canvas.height);
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener("resize", init);
        init();
        animate();

        return () => {
            window.removeEventListener("resize", init);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-[250vh] bg-[#121212]">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-center">
                    {sections.map((section, idx) => (
                        <div
                            key={idx}
                            className={`absolute transition-all duration-1000 ease-in-out transform w-full max-w-2xl px-6 ${activePhase === idx
                                ? "opacity-100 translate-y-0 scale-100 blur-0"
                                : "opacity-0 translate-y-20 scale-95 blur-lg"
                                } ${section.align === "left" ? "left-0 text-left" : "right-0 text-right"
                                }`}
                            style={{
                                left: section.align === "left" ? "0" : "auto",
                                right: section.align === "right" ? "0" : "auto"
                            }}
                        >
                            <span className="text-light-blue text-sm font-bold tracking-[0.4em] uppercase mb-4 block">
                                {section.subtitle}
                            </span>
                            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight">
                                {section.title}
                            </h2>
                            <p className="text-xl text-gray-400 leading-relaxed">
                                {section.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Vertical Progress Bar */}
                <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
                    {sections.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-1 h-8 rounded-full transition-all duration-500 ${activePhase === idx ? "bg-light-blue h-12" : "bg-white/10"
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
