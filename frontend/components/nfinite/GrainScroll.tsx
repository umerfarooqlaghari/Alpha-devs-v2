/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useRef, useState } from "react";

// --- Constants & Types Scoped Outside Component ---

// 3D Math Constants
const PERSPECTIVE = 800;
const PARTICLE_COUNT = 1800;

// Shapes
enum Shape {
    SPHERE,
    TORUS,
    GRID,
    DNA
}

// Particle Class
class Point {
    // Position
    x: number = 0; y: number = 0; z: number = 0;
    // Target
    tx: number = 0; ty: number = 0; tz: number = 0;
    // Props
    color: string; size: number;

    constructor() {
        this.setTarget(Shape.SPHERE);
        this.x = (Math.random() - 0.5) * 4000;
        this.y = (Math.random() - 0.5) * 4000;
        this.z = (Math.random() - 0.5) * 4000;

        const r = Math.random();
        if (r > 0.8) this.color = "rgba(178, 190, 181, 0.9)"; // Ash Gray
        else if (r > 0.6) this.color = "rgba(255, 255, 255, 0.8)"; // White
        else {
            const shade = Math.floor(Math.random() * 50 + 100);
            this.color = `rgba(${shade}, ${shade}, ${shade}, 0.6)`;
        }
        this.size = Math.random() * 2 + 0.5;
    }

    setTarget(shape: Shape, idx: number = 0) {
        switch (shape) {
            case Shape.SPHERE:
                const offset = 2 / PARTICLE_COUNT;
                const inc = Math.PI * (3 - Math.sqrt(5));
                const y = ((idx * offset) - 1) + (offset / 2);
                const r = Math.sqrt(1 - Math.pow(y, 2));
                const phi = ((idx + 1) % PARTICLE_COUNT) * inc;
                const radius = 280;
                this.tx = Math.cos(phi) * r * radius;
                this.ty = y * radius;
                this.tz = Math.sin(phi) * r * radius;
                break;

            case Shape.TORUS:
                const tRadius = 250;
                const tTube = 90;
                const u = (idx / PARTICLE_COUNT) * Math.PI * 12;
                const v = (idx / PARTICLE_COUNT) * Math.PI * 2;
                this.tx = (tRadius + tTube * Math.cos(v)) * Math.cos(u);
                this.ty = (tRadius + tTube * Math.cos(v)) * Math.sin(u);
                this.tz = tTube * Math.sin(v);
                break;

            case Shape.GRID:
                const gridSize = 45;
                const cols = 40;
                const row = Math.floor(idx / cols);
                const col = idx % cols;
                // Wavy plane
                this.tx = (col - 20) * gridSize;
                this.ty = Math.sin(col * 0.3 + row * 0.3) * 60;
                this.tz = (row - 20) * gridSize + 200;
                break;

            case Shape.DNA:
                const spacing = 15;
                const dnaRadius = 140;
                const angle = (idx * 0.2);
                const helixY = ((idx * spacing) % 1500) - 750;
                const strand = idx % 2 === 0 ? 0 : Math.PI;
                this.tx = Math.cos(angle + strand) * dnaRadius;
                this.ty = helixY;
                this.tz = Math.sin(angle + strand) * dnaRadius;
                break;
        }
    }

    update(ease: number) {
        this.x += (this.tx - this.x) * ease;
        this.y += (this.ty - this.y) * ease;
        this.z += (this.tz - this.z) * ease;
    }

    draw(ctx: CanvasRenderingContext2D, width: number, height: number, rx: number, ry: number) {
        const x1 = this.x;
        const y1 = this.y * Math.cos(rx) - this.z * Math.sin(rx);
        const z1 = this.y * Math.sin(rx) + this.z * Math.cos(rx);
        const x2 = x1 * Math.cos(ry) - z1 * Math.sin(ry);
        const y2 = y1;
        const z2 = x1 * Math.sin(ry) + z1 * Math.cos(ry);

        const zDist = z2 + 800; // Camera distance
        if (zDist <= 0) return;

        const scale = PERSPECTIVE / zDist;
        const x2d = (x2 * scale) + width / 2;
        const y2d = (y2 * scale) + height / 2;

        ctx.fillStyle = this.color;
        const s = Math.max(0.1, this.size * scale);
        ctx.fillRect(x2d, y2d, s, s);
    }
}

export default function GrainScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [activePhase, setActivePhase] = useState(0);

    const TIMELINE_STEPS = [
        {
            phase: "Our Development Journey",
            title: "Discovery & Strategy",
            description: "We dive deep into your business goals, identifying core requirements and opportunities for digital transformation.",
        },
        {
            phase: "Our Development Journey",
            title: "Architecture & Design",
            description: "Blueprinting scalable systems and crafting intuitive user experiences that align with your brand vision.",
        },
        {
            phase: "Our Development Journey",
            title: "Engineering & DevOps",
            description: "Agile development with modern tech stacks, automated pipelines, and rigorous testing for rock-solid reliability.",
        },
        {
            phase: "Our Development Journey",
            title: "Launch & Scale",
            description: "Seamless deployment and continuous optimization to ensure your digital ecosystem grows with your business.",
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

            // Progress 0 to 1
            let localProgress = (rect.top * -1) / (rect.height - viewportHeight);
            localProgress = Math.min(Math.max(localProgress, 0), 0.99);

            const currentPhase = Math.floor(localProgress * 4);

            // Determine Shape Phase
            let targetShape = Shape.SPHERE;
            if (currentPhase === 1) targetShape = Shape.TORUS;
            if (currentPhase === 2) targetShape = Shape.GRID;
            if (currentPhase === 3) targetShape = Shape.DNA;

            // Rotation
            const rotationY = localProgress * Math.PI * 2;
            const rotationX = localProgress * Math.PI * 0.3;

            // Clear with Charcoal (Matching Hero)
            ctx.fillStyle = "#121212";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p, i) => {
                p.setTarget(targetShape, i);
                p.update(0.06);
                p.draw(ctx, canvas.width, canvas.height, rotationX, rotationY);
            });

            if (window) (window as any).__scrollPhase = currentPhase;

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => init();
        window.addEventListener("resize", handleResize);

        init();
        animate();

        const interval = setInterval(() => {
            if (window && (window as any).__scrollPhase !== undefined) {
                setActivePhase((prev) => {
                    const newVal = (window as any).__scrollPhase;
                    return newVal !== prev ? newVal : prev;
                });
            }
        }, 100);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
            clearInterval(interval);
        };
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-[500vh] bg-[#121212]">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

                {/* Content Overlay */}
                <div className="relative z-10 w-full h-full pointer-events-none flex items-center justify-center">
                    {TIMELINE_STEPS.map((step, idx) => (
                        <div
                            key={idx}
                            className={`absolute max-w-4xl px-6 text-center transition-all duration-700 ease-out transform ${activePhase === idx
                                ? "opacity-100 translate-y-0 filter blur-0 scale-100"
                                : "opacity-0 translate-y-12 filter blur-md scale-95"
                                }`}
                        >
                            <span className="text-sm font-bold tracking-[0.4em] text-light-blue uppercase mb-6 block drop-shadow-lg">
                                {step.phase}
                            </span>
                            <h2 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter leading-tight drop-shadow-2xl">
                                {step.title}
                            </h2>
                            <p className="text-xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Side Indicators */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-20">
                    {TIMELINE_STEPS.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 shadow-glow ${activePhase === idx ? "bg-white scale-150 h-6" : "bg-white/20"
                                }`}
                        />
                    ))}
                </div>

                {/* Scroll Prompt */}
                <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-opacity duration-500 ${activePhase === 3 ? "opacity-0" : "opacity-50 animate-bounce"}`}>
                    <span className="text-white text-xs tracking-[0.3em] uppercase">Scroll</span>
                </div>
            </div>
        </section>
    );
}
