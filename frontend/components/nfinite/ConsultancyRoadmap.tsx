
"use client";

import { motion } from "framer-motion";
import {
    Search,
    Lightbulb,
    PenTool,
    Code2,
    ShieldCheck,
    Rocket,
    TrendingUp,
    ChevronRight,
    CheckCircle2
} from "lucide-react";

const phases = [
    {
        title: "Strategic Discovery",
        subtitle: "Phase 01",
        shortDesc: "The Deep Dive.",
        icon: <Search className="w-6 h-6" />,
        details: [
            "Market Audit: Competitive analysis and whitespace identification.",
            "Stakeholder Workshops: Aligning business goals with user needs.",
            "User Personas & Journeys: Mapping the emotional and functional path."
        ],
        color: "bg-blue-500/10 text-blue-400"
    },
    {
        title: "Concept Engineering",
        subtitle: "Phase 02",
        shortDesc: "Defining the Core.",
        icon: <Lightbulb className="w-6 h-6" />,
        details: [
            "Problem Framing: Defining the exact 'Why' and 'How'.",
            "Feasibility Audit: Technical risk assessment.",
            "MVP Scope: Determining the leanest path to market validation."
        ],
        color: "bg-amber-500/10 text-amber-400"
    },
    {
        title: "Design Thinking",
        subtitle: "Phase 03",
        shortDesc: "Visualizing the Future.",
        icon: <PenTool className="w-6 h-6" />,
        details: [
            "UI/UX Blueprinting: Low-fidelity wireframes and user flows.",
            "Hi-Fi Prototyping: Interactive mockups for validation.",
            "Visual Identity: Establishing the aesthetic core."
        ],
        color: "bg-purple-500/10 text-purple-400"
    },
    {
        title: "Architectural Engineering",
        subtitle: "Phase 04",
        shortDesc: "Building the Engine.",
        icon: <Code2 className="w-6 h-6" />,
        details: [
            "System Design: Scalable cloud-native architecture.",
            "Agile Development: Bi-weekly sprints with full transparency.",
            "Clean Code Standards: Ensuring long-term maintainability."
        ],
        color: "bg-emerald-500/10 text-emerald-400"
    },
    {
        title: "Rigorous QA",
        subtitle: "Phase 05",
        shortDesc: "The Barrier of Entry.",
        icon: <ShieldCheck className="w-6 h-6" />,
        details: [
            "Security Audits: Penetration testing and data safety.",
            "Stress Testing: Ensuring performance under extreme load.",
            "Automated Testing: 100% vital path coverage."
        ],
        color: "bg-rose-500/10 text-rose-400"
    },
    {
        title: "Deployment & Launch",
        subtitle: "Phase 06",
        shortDesc: "Market Entry.",
        icon: <Rocket className="w-6 h-6" />,
        details: [
            "CI/CD Implementation: Seamless, zero-downtime releases.",
            "Go-To-Market Support: Technical assistance during launch.",
            "Infrastructure Monitoring: Real-time health metrics."
        ],
        color: "bg-cyan-500/10 text-cyan-400"
    },
    {
        title: "Continuous Evolution",
        subtitle: "Phase 07",
        shortDesc: "Scaling Beyond.",
        icon: <TrendingUp className="w-6 h-6" />,
        details: [
            "User Data Analysis: Feedback-driven iterations.",
            "Feature Scaling: Adding complexity based on market demand.",
            "Technical Debt Management: Keeping the engine fast."
        ],
        color: "bg-indigo-500/10 text-indigo-400"
    }
];

export default function ConsultancyRoadmap() {
    return (
        <section className="py-24 px-6 md:px-12 bg-[#121212] relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Our Roadmap to Success</h2>
                    <p className="text-gray-400 text-xl max-w-2xl">A systematic, multi-disciplinary approach to engineering world-class products.</p>
                </div>

                <div className="relative">
                    {/* Vertical Line for Desktop */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent hidden md:block"></div>

                    <div className="space-y-24">
                        {phases.map((phase, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className={`flex flex-col ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-24 relative`}
                            >
                                {/* Center Circle */}
                                <div className="absolute left-1/2 -translate-x-1/2 top-0 md:top-1/2 md:-translate-y-1/2 w-4 h-4 bg-white rounded-full hidden md:block z-10 shadow-[0_0_20px_rgba(255,255,255,0.5)]"></div>

                                {/* Content Side */}
                                <div className="w-full md:w-1/2">
                                    <div className={`p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500 group`}>
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className={`p-4 rounded-2xl ${phase.color} group-hover:scale-110 transition-transform`}>
                                                {phase.icon}
                                            </div>
                                            <div>
                                                <span className="text-xs font-bold tracking-[0.2em] text-light-blue uppercase">{phase.subtitle}</span>
                                                <h3 className="text-2xl md:text-3xl font-bold text-white mt-1 uppercase leading-none tracking-tight">{phase.title}</h3>
                                            </div>
                                        </div>

                                        <p className="text-light-blue font-bold text-sm mb-6 flex items-center gap-2">
                                            <ChevronRight className="w-4 h-4" />
                                            {phase.shortDesc}
                                        </p>

                                        <ul className="space-y-3">
                                            {phase.details.map((detail, dIdx) => (
                                                <li key={dIdx} className="flex items-start gap-3 text-gray-400 text-sm md:text-base leading-relaxed">
                                                    <CheckCircle2 className="w-5 h-5 text-white/20 shrink-0 mt-0.5" />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Placeholder for empty side */}
                                <div className="hidden md:block md:w-1/2"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
