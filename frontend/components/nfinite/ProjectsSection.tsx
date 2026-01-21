"use client";

import React from 'react';

const projects = [
    { title: "AI Dashboard", category: "App Dev", img: "https://images.unsplash.com/photo-1551288049-bbda483387a5?auto=format&fit=crop&w=400&q=80" },
    { title: "Eco-commerce", category: "Web Dev", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80" },
    { title: "Neural Net", category: "Data Sci", img: "https://images.unsplash.com/photo-1558494949-ef010915579e?auto=format&fit=crop&w=400&q=80" },
    { title: "Smart City", category: "IoT", img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=400&q=80" },
];

export default function ProjectsSection() {
    return (
        <section className="py-24 bg-cream">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left: Masonry-style Grid */}
                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-charcoal group">
                                <img src={projects[0].img} alt={projects[0].title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="rounded-2xl overflow-hidden aspect-square bg-charcoal group">
                                <img src={projects[1].img} alt={projects[1].title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                        </div>
                        <div className="space-y-4 pt-12">
                            <div className="rounded-2xl overflow-hidden aspect-square bg-charcoal group">
                                <img src={projects[2].img} alt={projects[2].title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <div className="rounded-2xl overflow-hidden aspect-[4/5] bg-charcoal group">
                                <img src={projects[3].img} alt={projects[3].title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            </div>
                        </div>
                    </div>

                    {/* Right: Text Content */}
                    <div className="lg:w-1/3 flex flex-col justify-center">
                        <div className="bg-white/[0.03] border border-white/5 p-12 rounded-[2rem] relative overflow-hidden group">
                            {/* Decorative blob */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-light-blue/5 rounded-full blur-2xl group-hover:bg-light-blue/10 transition-colors" />

                            <span className="text-light-blue font-bold tracking-widest uppercase text-xs mb-4 block">
                                Projects
                            </span>
                            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                                A peak of our <br />
                                landscape <span className="text-light-blue">creations</span>
                            </h2>
                            <p className="text-dark-navy/50 text-sm leading-relaxed mb-8">
                                Explore how we&apos;ve transformed complex business challenges into elegant, powerful digital experiences using AI and modern web tech.
                            </p>
                            <button className="px-10 py-3 border border-white/20 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-light-blue hover:border-light-blue hover:text-black transition-all">
                                PROJECTS
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
