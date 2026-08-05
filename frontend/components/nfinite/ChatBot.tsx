"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { X, Bot, User, ChevronRight, Phone, Loader } from "lucide-react";
import Vapi from "@vapi-ai/web";
import {
    buildVapiMetadata,
    createEmbedSession,
    getSalesAgentConfigFromEnv,
    isVoiceSessionReady,
    querySalesAgent,
} from "@/lib/salesAgentClient";

interface Message {
    id: string;
    text: string;
    sender: "bot" | "user";
    options?: string[];
    isLoading?: boolean;
}

interface ChatBotProps {
    onClose: () => void;
}

const SALES_AGENT = getSalesAgentConfigFromEnv();

const INITIAL_MESSAGE: Message = {
    id: "1",
    sender: "bot",
    text: "Hello! I am Alpha-Bot, your AI-powered sales assistant from Alpha-Devs. How can I help you today?",
    options: [
        "Show me your products",
        "How does consultancy work?",
        "Tell me about Alpha-Devs",
        "How can I contact the team?",
        "☎️ Call Now",
        "📅 Schedule a Call"
    ]
};

// Fallback responses for common quick questions
const FALLBACK_RESPONSES: Record<string, { text: string; options: string[] }> = {
    "Show me your products": {
        text: "We build high-performance digital solutions across 5 key categories: AI-Powered ERP, Computer Vision, SaaS, Ed-Tech, and Sales Intel. Which area interests you most?",
        options: ["AI & ERP Solutions", "Computer Vision & SOPs", "SaaS & Survey Tools", "Ed-Tech Platforms", "Back to Menu"]
    },
    "Back to Menu": {
        text: "Sure! What else would you like to know?",
        options: INITIAL_MESSAGE.options!
    },
    "☎️ Call Now": {
        text: "Connecting you to our AI sales agent now...",
        options: []
    },
    "📅 Schedule a Call": {
        text: "Great! Let me redirect you to schedule a time that works best for you.",
        options: []
    }
};

export default function ChatBot({ onClose }: ChatBotProps) {
    const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
    const [isLoadingAgent, setIsLoadingAgent] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const vapiRef = useRef<Vapi | null>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        return () => {
            try {
                vapiRef.current?.stop();
            } catch {
                /* ignore */
            }
        };
    }, []);

    const callSalesAgent = async (userQuestion: string): Promise<string> => {
        try {
            setIsLoadingAgent(true);
            const result = await querySalesAgent(userQuestion, SALES_AGENT);
            if (result.ok) {
                return result.answer;
            }
            console.error("Sales agent error:", result.error);
        } catch (error) {
            console.error("Sales agent error:", error);
        } finally {
            setIsLoadingAgent(false);
        }

        return FALLBACK_RESPONSES["Show me your products"]?.text ||
               "I'm having trouble connecting right now. Please reach out to our team directly.";
    };

    const handleOptionClick = async (option: string) => {
        // Handle direct voice call
        if (option === "☎️ Call Now") {
            const userMsg: Message = {
                id: Date.now().toString(),
                sender: "user",
                text: option
            };
            setMessages(prev => [...prev, userMsg]);
            
            // Show connecting message
            const connectingMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: "bot",
                text: "Connecting you to our AI sales agent now...",
                isLoading: true
            };
            setMessages(prev => [...prev, connectingMsg]);

            try {
                const sessionResult = await createEmbedSession(SALES_AGENT);
                if (!sessionResult.ok) {
                    throw new Error(sessionResult.error);
                }
                const data = sessionResult.session;
                const apiKey = (data.vapi_public_key || "").trim();
                const assistantId = (data.vapi_assistant_id || "").trim();

                if (!isVoiceSessionReady(data)) {
                    const backendReason =
                        typeof data?.message === "string" && data.message.trim().length > 0
                            ? data.message
                            : "Call setup is incomplete right now (missing API key or assistant).";
                    setMessages((prev) => {
                        const updated = [...prev];
                        updated.pop();
                        return [
                            ...updated,
                            {
                                id: (Date.now() + 2).toString(),
                                sender: "bot",
                                text: `${backendReason} Please schedule a call instead.`,
                                options: ["📅 Schedule a Call", "Back to Menu"],
                            },
                        ];
                    });
                    return;
                }

                // Use Web SDK with tenant metadata (HTML widget drops metadata → call dies)
                if (vapiRef.current) {
                    try {
                        vapiRef.current.stop();
                    } catch {
                        /* ignore */
                    }
                }
                const vapi = new Vapi(apiKey);
                vapiRef.current = vapi;

                vapi.on("call-start", () => {
                    setMessages((prev) => {
                        const updated = [...prev];
                        updated.pop();
                        return [
                            ...updated,
                            {
                                id: (Date.now() + 2).toString(),
                                sender: "bot",
                                text: "You're connected. Speak anytime — I'm listening.",
                                options: ["Back to Menu"],
                            },
                        ];
                    });
                });

                vapi.on("call-end", () => {
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: Date.now().toString(),
                            sender: "bot",
                            text: "Call ended. Anything else I can help with?",
                            options: ["☎️ Call Now", "📅 Schedule a Call", "Back to Menu"],
                        },
                    ]);
                });

                vapi.on("error", (err: unknown) => {
                    console.error("Vapi error:", err);
                    setMessages((prev) => {
                        const updated = [...prev];
                        if (updated[updated.length - 1]?.isLoading) updated.pop();
                        return [
                            ...updated,
                            {
                                id: (Date.now() + 3).toString(),
                                sender: "bot",
                                text: "Voice call hit an error. Please try again or schedule a call.",
                                options: ["☎️ Call Now", "📅 Schedule a Call", "Back to Menu"],
                            },
                        ];
                    });
                });

                await vapi.start(assistantId, {
                    metadata: buildVapiMetadata(data),
                });
            } catch (error) {
                console.error("Voice call error:", error);
                setMessages((prev) => {
                    const updated = [...prev];
                    updated.pop();
                    return [
                        ...updated,
                        {
                            id: (Date.now() + 2).toString(),
                            sender: "bot",
                            text: "Sorry, I couldn't connect the voice call. Please try again or schedule a call instead.",
                            options: ["📅 Schedule a Call", "Back to Menu"],
                        },
                    ];
                });
            }
            return;
        }

        // Handle schedule call option
        if (option === "📅 Schedule a Call") {
            const userMsg: Message = {
                id: Date.now().toString(),
                sender: "user",
                text: option
            };
            setMessages(prev => [...prev, userMsg]);
            
            setTimeout(() => {
                window.location.href = "/contact?type=booking";
            }, 300);
            return;
        }

        // Add user message
        const userMsg: Message = {
            id: Date.now().toString(),
            sender: "user",
            text: option
        };
        setMessages(prev => [...prev, userMsg]);

        // Check if we have a fallback response for this option
        if (FALLBACK_RESPONSES[option]) {
            setTimeout(() => {
                const response = FALLBACK_RESPONSES[option];
                const botMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    sender: "bot",
                    text: response.text,
                    options: response.options
                };
                setMessages(prev => [...prev, botMsg]);
            }, 500);
        } else {
            // For other questions, call the Sales Agent API
            const loadingMsg: Message = {
                id: (Date.now() + 1).toString(),
                sender: "bot",
                text: "Let me find that information for you...",
                isLoading: true
            };
            setMessages(prev => [...prev, loadingMsg]);

            const answer = await callSalesAgent(option);
            
            setMessages(prev => {
                const updated = [...prev];
                // Remove loading message
                updated.pop();
                
                const botMsg: Message = {
                    id: (Date.now() + 2).toString(),
                    sender: "bot",
                    text: answer,
                    options: [
                        "Ask another question",
                        "☎️ Call Now",
                        "Back to Menu"
                    ]
                };
                return [...updated, botMsg];
            });
        }
    };

    const handleTextInput = async (text: string) => {
        if (!text.trim()) return;

        // Add user message
        const userMsg: Message = {
            id: Date.now().toString(),
            sender: "user",
            text: text
        };
        setMessages(prev => [...prev, userMsg]);

        // Show loading state
        const loadingMsg: Message = {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "Connecting to our AI agent...",
            isLoading: true
        };
        setMessages(prev => [...prev, loadingMsg]);

        // Call Sales Agent
        const answer = await callSalesAgent(text);
        
        setMessages(prev => {
            const updated = [...prev];
            // Remove loading message
            updated.pop();
            
            const botMsg: Message = {
                id: (Date.now() + 2).toString(),
                sender: "bot",
                text: answer,
                options: [
                    "Ask another question",
                    "☎️ Call Now",
                    "Back to Menu"
                ]
            };
            return [...updated, botMsg];
        });
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
                        <h3 className="text-white font-bold text-xs tracking-tight">Alpha Sales Bot</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">AI Powered</span>
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
                                {msg.isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <Loader className="w-4 h-4 animate-spin" />
                                        <span>{msg.text}</span>
                                    </div>
                                ) : (
                                    msg.text
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Options or Input */}
            <div className="p-6 pt-0 space-y-4">
                {/* Quick response buttons */}
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
                                    disabled={isLoadingAgent}
                                    className="w-full text-left p-4 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs font-bold hover:bg-light-blue hover:border-light-blue transition-all duration-300 flex items-center justify-between group disabled:opacity-50"
                                >
                                    {option.includes("☎️") ? (
                                        <>
                                            <span>{option}</span>
                                            <Phone className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                                        </>
                                    ) : option.includes("📅") ? (
                                        <>
                                            <span>{option}</span>
                                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </>
                                    ) : (
                                        <>
                                            <span>{option}</span>
                                            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    )}
                </AnimatePresence>

                {/* Text input for custom questions */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Ask me anything..."
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                handleTextInput((e.target as HTMLInputElement).value);
                                (e.target as HTMLInputElement).value = "";
                            }
                        }}
                        disabled={isLoadingAgent}
                        className="flex-1 px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-light-blue transition-colors disabled:opacity-50"
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 text-center border-t border-white/5">
                <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Powered by Alpha AI Sales Agent</p>
            </div>
        </div>
    );
}
