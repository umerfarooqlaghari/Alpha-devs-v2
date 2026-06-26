
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { X, Send, Bot, User, ChevronRight } from "lucide-react";

interface Message {
    id: string;
    text: string;
    sender: "bot" | "user";
    options?: string[];
}

interface ChatBotProps {
    onClose: () => void;
}

const INITIAL_MESSAGE: Message = {
    id: "1",
    sender: "bot",
    text: "Hello! I am Alpha-Bot, your digital guide to Alpha-Devs. What would you like to explore today?",
    options: [
        "Show me your products",
        "How does consultancy work?",
        "Tell me about Alpha-Devs",
        "How can I contact the team?"
    ]
};

const KNOWLEDGE_BASE: Record<string, { text: string; options: string[] }> = {
    "Show me your products": {
        text: "We build high-performance digital solutions across 5 key categories: AI-Powered ERP, Computer Vision, SaaS, Ed-Tech, and Sales Intel. Which area interests you most?",
        options: ["AI & ERP Solutions", "Computer Vision & SOPs", "SaaS & Survey Tools", "Ed-Tech Platforms", "Back to Menu"]
    },
    "AI & ERP Solutions": {
        text: "Our AI-Powered ERP Query Intelligence System provides smart insights and instant answers from your corporate data. It's designed for enterprises that need real-time data clarity.",
        options: ["Enterprise vs Standard", "Request ERP Demo", "Back to Products"]
    },
    "Computer Vision & SOPs": {
        text: "Our CV Surveillance system detects SOP violations in real-time. It’s perfect for industrial safety and retail compliance monitoring.",
        options: ["Security Features", "Industrial Use-Cases", "Back to Products"]
    },
    "SaaS & Survey Tools": {
        text: "From Alpha Survey for complex data gathering to Alpha Sales Scheduler for pipeline management, our SaaS tools are built to scale with your user base.",
        options: ["Alpha Survey", "Sales Scheduler", "Back to Products"]
    },
    "Ed-Tech Platforms": {
        text: "Mentore is our flagship Ed-Tech platform, designed to bridge the gap between traditional learning and modern digital accessibility.",
        options: ["Learning Management", "Live Classes", "Back to Products"]
    },
    "How does consultancy work?": {
        text: "Our product consultancy is a strategic 7-phase journey. We go far beyond code—we engineer your business success from the ground up.",
        options: ["The Discovery Phase", "Design Thinking", "Architectural Engineering", "Back to Menu"]
    },
    "The Discovery Phase": {
        text: "Discovery is our 'Deep Dive'. We conduct market audits, stakeholder workshops, and user persona mapping to ensure we're solving the right problem.",
        options: ["Market Audits", "User Personas", "Back to Consultancy"]
    },
    "Design Thinking": {
        text: "We translate strategy into visual blueprints through low-fidelity wireframes, hi-fi interactive prototypes, and a core visual identity.",
        options: ["UI/UX Blueprinting", "Prototyping", "Back to Consultancy"]
    },
    "Architectural Engineering": {
        text: "We blueprint scalable, cloud-native architectures and implement agile development cycles with bi-weekly sprints and full transparency.",
        options: ["System Design", "Agile Cycles", "Back to Consultancy"]
    },
    "Tell me about Alpha-Devs": {
        text: "Founded by FAST alumni, Alpha-Devs has grown into a global powerhouse with 15+ specialists delivering excellence across USA, Europe, and South Asia.",
        options: ["The Founders", "Global Reach", "Our Mission", "Back to Menu"]
    },
    "The Founders": {
        text: "Alpha-Devs was born from the technical mastery of two FAST alumni who transitioned from the corporate world to build a software consultancy rooted in 'Digital Excellence'.",
        options: ["View Portfolio", "Back to About"]
    },
    "Global Reach": {
        text: "We deliver world-class digital products to over 15+ industries across borders, operating primarily in the USA, Europe, and South Asia.",
        options: ["Industries Served", "Back to About"]
    },
    "How can I contact the team?": {
        text: "Ready to start? You can reach us at info@alphadevs.com or call us at +92 300-9243063. We are based in Karachi, Pakistan.",
        options: ["Book a Call", "Office Location", "Back to Menu"]
    },
    "Back to Menu": {
        text: "Sure! What else would you like to know?",
        options: INITIAL_MESSAGE.options!
    },
    "Back to Products": {
        text: "Returning to product categories. What's next?",
        options: ["AI & ERP Solutions", "Computer Vision & SOPs", "SaaS & Survey Tools", "Ed-Tech Platforms", "Back to Menu"]
    },
    "Back to Consultancy": {
        text: "Returning to consultancy phases. Which stage would you like to explore?",
        options: ["The Discovery Phase", "Design Thinking", "Architectural Engineering", "Back to Menu"]
    },
    "Back to About": {
        text: "Returning to company info. What else can I share?",
        options: ["The Founders", "Global Reach", "Our Mission", "Back to Menu"]
    }
};

export default function ChatBot({ onClose }: ChatBotProps) {
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleOptionClick = (option: string) => {
        // Add user message
        const userMsg: Message = {
            // eslint-disable-next-line react-hooks/purity
            id: Date.now().toString(),
            sender: "user",
            text: option
        };
        setMessages(prev => [...prev, userMsg]);

        // Mock bot response
        setTimeout(() => {
            if (option === "Go to Contact Page" || option === "Book a Call") {
                window.location.href = "/contact?type=booking";
                return;
            }
            if (option === "Email Support") {
                window.location.href = "mailto:info@alphadevs.com";
                return;
            }

            const response = KNOWLEDGE_BASE[option] || {
                text: "I'm still learning about that! However, our team is always ready to help you directly.",
                options: ["Go to Contact Page", "Email Support", "Back to Menu"]
            };

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: "bot",
                text: response.text,
                options: response.options
            };
            setMessages(prev => [...prev, botMsg]);
        }, 500);
    };

    return (
        <div className="w-full h-full bg-[#1A1D1B]/95 backdrop-blur-2xl rounded-[2rem] border border-white/10 shadow-2xl flex flex-col overflow-hidden">
            {/* Header */}
            <div className="p-6 bg-white/[0.02] border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-light-blue/20 flex items-center justify-center text-light-blue">
                        <Bot className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-white font-bold text-xs tracking-tight">Alpha Bot</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Active Now</span>
                        </div>
                    </div>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                            <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center ${msg.sender === "user" ? "bg-white/10 text-white" : "bg-light-blue/20 text-light-blue"
                                }`}>
                                {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                            </div>
                            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === "user"
                                ? "bg-white text-black font-medium"
                                : "bg-white/[0.03] border border-white/5 text-gray-300"
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Options */}
            <div className="p-6 pt-0">
                <AnimatePresence>
                    {messages[messages.length - 1].options && (
                        <div className="flex flex-col gap-2">
                            {messages[messages.length - 1].options?.map((option, i) => (
                                <motion.button
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => handleOptionClick(option)}
                                    className="w-full text-left p-4 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs font-bold hover:bg-light-blue hover:border-light-blue transition-all duration-300 flex items-center justify-between group"
                                >
                                    {option}
                                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </motion.button>
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-4 text-center border-t border-white/5">
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Driven by Alpha Intelligence</p>
            </div>
        </div>
    );
}
