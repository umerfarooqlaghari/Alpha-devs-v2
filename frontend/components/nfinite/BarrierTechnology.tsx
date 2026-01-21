"use client";

import { useEffect, useRef } from "react";

export default function BarrierTechnology() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: { x: number; y: number; size: number; speedX: number; speedY: number; brightness: number }[] = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            // Drastically reduce particle count for performance
            const particleCount = Math.min(window.innerWidth / 20, 50);
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 2 + 0.5,
                    speedX: (Math.random() - 0.5) * 0.2, // Slower speed feels smoother
                    speedY: (Math.random() - 0.5) * 0.2,
                    brightness: Math.random(),
                });
            }
        };

        const draw = () => {
            ctx.fillStyle = "#0F131A";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Optimization: Batch drawing
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";

            particles.forEach((p) => {
                p.x += p.speedX;
                p.y += p.speedY;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw connecting lines with optimized loop
            ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
            ctx.lineWidth = 0.5;

            // Limit connections to avoid O(N^2) effectively on visual clutter & perf
            // Only connect if index diff is small to fake connections without full check? 
            // Better: just checking fewer particles or strictly limiting distance check.

            for (let i = 0; i < particles.length; i++) {
                // Optimization: Don't check every single other particle, checking a subset is visually enough
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;

                    // Quick check before expensive math
                    if (Math.abs(dx) > 100 || Math.abs(dy) > 100) continue;

                    const distanceSq = dx * dx + dy * dy;
                    if (distanceSq < 10000) { // 100 * 100 = 10000
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        window.addEventListener("resize", resize);
        resize();
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <section className="relative w-full py-32 bg-dark-navy overflow-hidden text-white">
            {/* Background Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
            />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                        Our Proprietary Barrier Technology
                    </h2>
                    <p className="text-lg text-gray-400 mb-8 max-w-md">
                        A water-based, multilayer coating system that provides plastic-like protection while remaining fully recyclable/repulpable.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-light-blue rounded-full" />
                            <span className="text-lg">Zero Microplastics</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-light-blue rounded-full" />
                            <span className="text-lg">PFAS-Free</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-2 h-2 bg-light-blue rounded-full" />
                            <span className="text-lg">Food Safe (FDA/BfR)</span>
                        </li>
                    </ul>
                </div>

                {/* Visual/Empty Column for Canvas Focus */}
                <div className="hidden md:block h-96">
                    {/* The canvas particles create the visual interest here */}
                </div>
            </div>
        </section>
    );
}
