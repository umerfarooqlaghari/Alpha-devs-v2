'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/nfinite/Navbar';
import Footer from '@/components/nfinite/Footer';
import Link from 'next/link';
import {
    ArrowLeft, ArrowRight, CheckCircle2, Loader2,
    Zap, ChevronRight
} from 'lucide-react';
import { STATIC_AGENTS, type AIAgentDetail } from '@/lib/ai-agents-static';

export default function AIAgentDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const [agent, setAgent] = useState<AIAgentDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        fetch(`${API_URL}/api/ai-agents/${slug}`, { credentials: 'include' })
            .then(r => {
                if (!r.ok) throw new Error('not found');
                return r.json();
            })
            .then(data => {
                // Merge API data with extended static data if available
                const staticMatch = STATIC_AGENTS.find(a => a.slug === slug);
                setAgent(staticMatch ? { ...staticMatch, ...data, ...staticMatch } : data);
                setLoading(false);
            })
            .catch(() => {
                // Fall back to static data
                const staticAgent = STATIC_AGENTS.find(a => a.slug === slug);
                setAgent(staticAgent || null);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F1F5F0] flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-[#4A5D4E]" />
            </div>
        );
    }

    if (!agent) {
        return (
            <div className="min-h-screen bg-[#F1F5F0] flex flex-col items-center justify-center gap-4">
                <h1 className="text-3xl font-bold text-[#2D312E]">Agent Not Found</h1>
                <Link href="/ai-agents" className="text-[#4A5D4E] font-bold flex items-center gap-2 hover:underline">
                    <ArrowLeft className="w-4 h-4" /> Back to AI Agents
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero */}
            <section className="pt-28 pb-0 bg-[#F1F5F0] relative overflow-hidden">
                {/* Background text */}
                <div className="absolute right-[-2rem] bottom-0 rotate-90 origin-bottom-right text-[12rem] font-bold text-[#E9EEE8] leading-none pointer-events-none select-none uppercase tracking-tighter opacity-60">
                    AGENT
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    {/* Breadcrumb */}
                    <Link
                        href="/ai-agents"
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4A5D4E] hover:text-[#2D312E] transition-colors mb-10 group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        All AI Agents
                    </Link>

                    <div className="grid lg:grid-cols-[1fr_320px] gap-12 pb-16">
                        {/* Left — agent info */}
                        <div>
                            {/* Status + Category badges */}
                            <div className="flex items-center gap-3 mb-6">
                                <span
                                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white"
                                    style={{ backgroundColor: agent.iconColor }}
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 animate-pulse" />
                                    {agent.category}
                                </span>
                                {agent.status === 'LIVE' ? (
                                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                                        Live
                                    </span>
                                ) : (
                                    <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                                        Coming Soon
                                    </span>
                                )}
                            </div>

                            <h1 className="text-5xl md:text-7xl font-bold text-[#2D312E] tracking-tighter leading-[0.9] mb-6">
                                {agent.name}
                            </h1>
                            <p className="text-xl text-[#5C635E] max-w-2xl leading-relaxed mb-8">
                                {agent.tagline}
                            </p>

                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/contact?type=booking"
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-[#2D312E] text-white font-bold rounded-full hover:bg-[#4A5D4E] transition-all duration-300 hover:scale-105"
                                >
                                    Deploy this Agent <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 border border-[#2D312E]/20 text-[#2D312E] font-bold rounded-full hover:border-[#2D312E] transition-all duration-300"
                                >
                                    Request Information
                                </Link>
                            </div>
                        </div>

                        {/* Right — metadata sidebar */}
                        <div className="flex flex-col gap-4">
                            {agent.businessFunction && (
                                <div className="bg-white rounded-2xl p-5 border border-gray-100">
                                    <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-3">Business Function</p>
                                    <span
                                        className="inline-block px-3 py-1.5 rounded-full text-xs font-bold text-white"
                                        style={{ backgroundColor: agent.iconColor }}
                                    >
                                        {agent.businessFunction}
                                    </span>
                                </div>
                            )}
                            {agent.industry && (
                                <div className="bg-white rounded-2xl p-5 border border-gray-100">
                                    <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-3">Industry</p>
                                    <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-[#F1F5F0] text-[#2D312E]">
                                        {agent.industry}
                                    </span>
                                </div>
                            )}
                            {agent.domain && (
                                <div className="bg-white rounded-2xl p-5 border border-gray-100">
                                    <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-3">Domain</p>
                                    <span className="inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-[#F1F5F0] text-[#2D312E]">
                                        {agent.domain}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="grid lg:grid-cols-[1fr_320px] gap-12 py-20">
                    {/* Left — main content */}
                    <div className="space-y-20">

                        {/* Description */}
                        <div>
                            <p className="text-lg text-[#5C635E] leading-relaxed">
                                {agent.description}
                            </p>
                        </div>

                        {/* Business Challenge */}
                        {agent.businessChallenge && (
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#4A5D4E] mb-4">Business Challenge</p>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#2D312E] tracking-tight mb-6">
                                    Why organisations need this agent
                                </h2>
                                <p className="text-[#5C635E] leading-relaxed text-base">
                                    {agent.businessChallenge}
                                </p>
                            </div>
                        )}

                        {/* Core Features */}
                        {agent.coreFeatures && agent.coreFeatures.length > 0 && (
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#4A5D4E] mb-4">Core Features</p>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#2D312E] tracking-tight mb-8">
                                    What the agent does
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {agent.coreFeatures.map((f, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 p-4 bg-[#F9FAF9] rounded-xl border border-gray-100 hover:border-[#4A5D4E]/20 transition-colors"
                                        >
                                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: agent.iconColor }} />
                                            <span className="text-sm font-semibold text-[#2D312E]">{f}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* How it Works */}
                        {agent.howItWorks && agent.howItWorks.length > 0 && (
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.3em] text-[#4A5D4E] mb-4">How It Works</p>
                                <h2 className="text-2xl md:text-3xl font-bold text-[#2D312E] tracking-tight mb-10">
                                    Three steps to value
                                </h2>
                                <div className="space-y-6">
                                    {agent.howItWorks.map((step, i) => (
                                        <div key={i} className="flex gap-6 group">
                                            <div
                                                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-lg text-white"
                                                style={{ backgroundColor: agent.iconColor }}
                                            >
                                                {step.step}
                                            </div>
                                            <div className="pt-2">
                                                <h3 className="font-bold text-[#2D312E] mb-2">{step.title}</h3>
                                                <p className="text-sm text-[#5C635E] leading-relaxed">{step.description}</p>
                                            </div>
                                            {i < agent.howItWorks.length - 1 && (
                                                <div className="hidden md:flex items-start pl-6 pt-5">
                                                    <ChevronRight className="w-4 h-4 text-gray-300" />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right — sticky sidebar */}
                    <div className="lg:sticky lg:top-24 space-y-5 self-start">
                        {/* Key Benefits */}
                        {agent.keyBenefits && agent.keyBenefits.length > 0 && (
                            <div className="bg-[#F9FAF9] rounded-2xl p-6 border border-gray-100">
                                <div className="flex items-center gap-2 mb-6">
                                    <Zap className="w-4 h-4" style={{ color: agent.iconColor }} />
                                    <p className="text-xs font-black uppercase tracking-wider text-gray-500">Key Benefits</p>
                                </div>
                                <div className="space-y-5">
                                    {agent.keyBenefits.map((b, i) => (
                                        <div key={i}>
                                            <p className="text-sm font-bold text-[#2D312E] mb-1">{b.title}</p>
                                            <p className="text-xs text-[#5C635E] leading-relaxed">{b.description}</p>
                                            {i < agent.keyBenefits.length - 1 && (
                                                <div className="mt-4 border-t border-gray-100" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Deploy CTA */}
                        <div
                            className="rounded-2xl p-6 text-white"
                            style={{ backgroundColor: agent.iconColor }}
                        >
                            <p className="text-xs font-black uppercase tracking-wider text-white/70 mb-3">Ready to deploy?</p>
                            <h3 className="text-lg font-bold mb-4 leading-snug">
                                Let&apos;s put this agent to work in your organisation.
                            </h3>
                            <Link
                                href="/contact?type=booking"
                                className="flex items-center justify-center gap-2 w-full py-3 bg-white font-bold rounded-xl text-sm hover:bg-gray-100 transition-colors"
                                style={{ color: agent.iconColor }}
                            >
                                Book a Discovery Call <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* About Alpha Dev */}
                        <div className="bg-white rounded-2xl p-6 border border-gray-100">
                            <p className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">About Alpha Dev</p>
                            <p className="text-xs text-[#5C635E] leading-relaxed">
                                Alpha Development builds enterprise-grade AI agents and software products for organisations worldwide. Our agents are production-ready accelerators adapted to real industry challenges.
                            </p>
                            <Link
                                href="/about"
                                className="mt-4 text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all"
                                style={{ color: agent.iconColor }}
                            >
                                Learn about our team <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <section className="py-24 px-6 md:px-12 bg-[#2D312E]">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#7FB3A0] mb-6">
                        See all agents
                    </p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter">
                        Explore the full<br />
                        <span className="text-[#7FB3A0]">AI Agent Portfolio</span>
                    </h2>
                    <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto">
                        44+ agents across sales, finance, operations, customer service, and more — ready to deploy.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/ai-agents"
                            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[#2D312E] font-bold rounded-full hover:bg-[#F1F5F0] transition-all hover:scale-105"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
                        </Link>
                        <Link
                            href="/contact?type=booking"
                            className="inline-flex items-center gap-2 px-10 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all"
                        >
                            Deploy an Agent
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
