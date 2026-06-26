"use client";

import { useState, useEffect, useMemo } from "react";
import {
    Search, Loader2, Heart, ExternalLink,
    TrendingUp, Target, Receipt, Scale, Package, Network,
    MessageCircle, Mail, BookOpen, FileText, ShieldCheck,
    Leaf, Eye, Tag, Clock, CreditCard, ClipboardList, Database,
} from "lucide-react";
import Link from "next/link";
import { STATIC_AGENTS } from '@/lib/ai-agents-static';
import type { AIAgentDetail as AIAgent } from '@/lib/ai-agents-static';

// Maps agent slug → lucide icon component
const AGENT_ICONS: Record<string, React.ElementType> = {
    "sales-assistant-agent": TrendingUp,
    "sales-qualification-agent": Target,
    "invoice-matching-agent": Receipt,
    "reconciliation-agent": Scale,
    "order-intake-agent": Package,
    "supply-chain-intelligence-agent": Network,
    "customer-service-chatbot-agent": MessageCircle,
    "email-routing-agent": Mail,
    "knowledge-discovery-agent": BookOpen,
    "document-lifecycle-agent": FileText,
    "regulatory-signal-agent": ShieldCheck,
    "emission-ai-agent": Leaf,
    "cv-safety-monitoring-agent": Eye,
    "product-search-agent": Tag,
    "time-entry-agent": Clock,
    "ap-responder-agent": CreditCard,
    "case-management-agent": ClipboardList,
    "erp-migration-agent": Database,
};

const BUSINESS_FUNCTIONS = [
    "All",
    "Sales",
    "Finance",
    "Operations",
    "Customer Service",
    "HR",
    "IT",
    "Knowledge Management",
    "Product Management",
    "Sustainability",
];

const DOMAINS = [
    "All",
    "AI & Analytics",
    "ERP & Finance",
    "CRM & Sales Automation",
    "Supply Chain & Logistics",
    "Document Processing",
    "Customer Engagement",
    "Workforce Management",
    "IT & Compliance",
];

function AgentCard({ agent }: { agent: AIAgent }) {
    const [liked, setLiked] = useState(false);
    const Icon = AGENT_ICONS[agent.slug] ?? TrendingUp;

    return (
        <div className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 hover:-translate-y-1 flex flex-col relative">
            {/* Invisible full-card link */}
            <Link href={`/ai-agents/${agent.slug}`} className="absolute inset-0 rounded-2xl z-0" aria-label={`View ${agent.name}`} />
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${agent.iconColor}18` }}
                    >
                        <Icon className="w-4 h-4" style={{ color: agent.iconColor }} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                        {agent.category}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    {agent.status === "COMING_SOON" && (
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full border border-amber-200">
                            Soon
                        </span>
                    )}
                    <button
                        onClick={(e) => { e.preventDefault(); setLiked((p) => !p); }}
                        aria-label={liked ? "Unlike agent" : "Like agent"}
                        className="relative z-10 text-gray-300 hover:text-red-400 transition-colors"
                    >
                        <Heart
                            className="w-4 h-4"
                            fill={liked ? "#f87171" : "none"}
                            stroke={liked ? "#f87171" : "currentColor"}
                        />
                    </button>
                </div>
            </div>

            {/* Name + Tagline */}
            <h3 className="text-base font-bold text-[#2D312E] mb-2 leading-snug group-hover:text-[#4A5D4E] transition-colors">
                {agent.name}
            </h3>
            <p className="text-sm text-[#5C635E] leading-relaxed flex-1 mb-5">
                {agent.tagline}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
                {agent.businessFunction && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F1F5F0] text-[#4A5D4E]">
                        {agent.businessFunction}
                    </span>
                )}
                {agent.domain && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-50 text-gray-500">
                        {agent.domain}
                    </span>
                )}
            </div>

            {/* CTA */}
            <Link
                href={`/ai-agents/${agent.slug}`}
                className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#2D312E] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
                View details
                <ExternalLink className="w-3 h-3" />
            </Link>
        </div>
    );
}

export default function AIAgentsGrid() {
    const [agents, setAgents] = useState<AIAgent[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [activeFunction, setActiveFunction] = useState("All");
    const [activeDomain, setActiveDomain] = useState("All");
    const [activeTab, setActiveTab] = useState<"function" | "domain">("function");

    useEffect(() => {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        fetch(`${API_URL}/api/ai-agents`, { credentials: "include" })
            .then((r) => {
                if (!r.ok) throw new Error("API unavailable");
                return r.json();
            })
            .then((data) => {
                const list = Array.isArray(data) && data.length > 0 ? data : STATIC_AGENTS;
                setAgents(list);
                setLoading(false);
            })
            .catch(() => {
                setAgents(STATIC_AGENTS);
                setLoading(false);
            });
    }, []);

    const filtered = useMemo(() => {
        return agents.filter((a) => {
            const matchSearch =
                !search ||
                a.name.toLowerCase().includes(search.toLowerCase()) ||
                a.tagline.toLowerCase().includes(search.toLowerCase()) ||
                a.description.toLowerCase().includes(search.toLowerCase());

            const matchFunction =
                activeFunction === "All" || a.businessFunction === activeFunction;

            const matchDomain =
                activeDomain === "All" || a.domain === activeDomain;

            return matchSearch && matchFunction && matchDomain;
        });
    }, [agents, search, activeFunction, activeDomain]);

    const handleReset = () => {
        setActiveFunction("All");
        setActiveDomain("All");
        setSearch("");
    };

    const isFiltered =
        activeFunction !== "All" || activeDomain !== "All" || search !== "";

    return (
        <section id="agent-grid" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-3">
                            Portfolio
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-[#2D312E] tracking-tighter">
                            Browse Agents
                        </h3>
                    </div>
                    {/* Search */}
                    <div className="relative w-full md:w-72">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search agents..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 text-sm focus:outline-none focus:border-[#4A5D4E] bg-[#F9FAF9] text-[#2D312E] placeholder:text-gray-400"
                        />
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="mb-8">
                    <div className="flex gap-1 mb-4 bg-[#F1F5F0] p-1 rounded-full w-fit">
                        <button
                            onClick={() => setActiveTab("function")}
                            className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${activeTab === "function" ? "bg-white text-[#2D312E] shadow-sm" : "text-gray-500"}`}
                        >
                            Business Function
                        </button>
                        <button
                            onClick={() => setActiveTab("domain")}
                            className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${activeTab === "domain" ? "bg-white text-[#2D312E] shadow-sm" : "text-gray-500"}`}
                        >
                            Domain
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {activeTab === "function" &&
                            BUSINESS_FUNCTIONS.map((fn) => (
                                <button
                                    key={fn}
                                    onClick={() => setActiveFunction(fn)}
                                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${activeFunction === fn
                                        ? "bg-[#2D312E] text-white"
                                        : "bg-[#F1F5F0] text-gray-500 hover:bg-gray-200"
                                        }`}
                                >
                                    {fn}
                                </button>
                            ))}
                        {activeTab === "domain" &&
                            DOMAINS.map((d) => (
                                <button
                                    key={d}
                                    onClick={() => setActiveDomain(d)}
                                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-200 ${activeDomain === d
                                        ? "bg-[#2D312E] text-white"
                                        : "bg-[#F1F5F0] text-gray-500 hover:bg-gray-200"
                                        }`}
                                >
                                    {d}
                                </button>
                            ))}
                        {isFiltered && (
                            <button
                                onClick={handleReset}
                                className="px-5 py-2 rounded-full text-xs font-bold bg-red-50 text-red-500 hover:bg-red-100 transition-all duration-200"
                            >
                                Reset Filters
                            </button>
                        )}
                    </div>
                </div>

                {/* Results Count */}
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">
                    {loading ? "Loading..." : `${filtered.length} agent${filtered.length !== 1 ? "s" : ""} found`}
                </p>

                {/* Grid */}
                {loading ? (
                    <div className="py-32 flex flex-col items-center">
                        <Loader2 className="w-10 h-10 animate-spin text-[#4A5D4E] mb-4" />
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">
                            Loading agents...
                        </p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="py-32 flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-2xl bg-[#F1F5F0] flex items-center justify-center mb-4">
                            <Search className="w-6 h-6 text-gray-300" />
                        </div>
                        <p className="text-[#2D312E] font-bold text-lg mb-2">No agents found</p>
                        <p className="text-gray-400 text-sm max-w-xs">
                            Try adjusting your search or filters to find matching agents.
                        </p>
                        <button
                            onClick={handleReset}
                            className="mt-6 px-6 py-2 rounded-full text-xs font-bold bg-[#2D312E] text-white hover:bg-[#4A5D4E] transition-colors"
                        >
                            Show All Agents
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((agent) => (
                            <AgentCard key={agent.id} agent={agent} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
