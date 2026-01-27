'use client';

import { useState, useEffect } from 'react';
import { Plus, Minus, Search, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Navbar from "@/components/nfinite/Navbar";
import Footer from "@/components/nfinite/Footer";

interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
}

export default function FAQContent() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [searchTerm, setSearchTerm] = useState('');

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const res = await fetch(`${API_URL}/api/faqs`);
                const data = await res.json();
                setFaqs(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Fetch FAQs failed:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFaqs();
    }, []);

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-cream">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden bg-cream px-4 sm:px-6 md:px-12">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-indigo-500 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-purple-500 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center w-full">
                    <span className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest mb-6">
                        Support Center
                    </span>
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-8 tracking-tight uppercase leading-[1.1] break-words">
                        How can we <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 sm:block">help?</span>
                    </h1>
                    <div className="max-w-2xl mx-auto relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-400 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-white/10 border border-white/10 backdrop-blur-md px-12 py-4 md:px-16 md:py-6 rounded-full text-white placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-2xl text-sm md:text-base"
                        />
                    </div>
                </div>
            </section>

            {/* FAQ List */}
            <section className="py-12 md:py-24 overflow-hidden px-4 sm:px-6 md:px-12">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="max-w-4xl mx-auto space-y-16">
                        {loading ? (
                            <div className="py-20 flex justify-center">
                                <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
                            </div>
                        ) : filteredFaqs.length === 0 ? (
                            <div className="text-center py-20 bg-white/5 rounded-[3rem] shadow-sm border border-white/10">
                                <HelpCircle className="w-16 h-16 text-white/10 mx-auto mb-6" />
                                <h2 className="text-2xl font-black text-white uppercase">No results found</h2>
                                <p className="text-gray-400 italic mt-2">Try different keywords or contact us directly.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {filteredFaqs.map((faq, index) => (
                                    <div
                                        key={faq.id}
                                        className={`bg-white/5 rounded-[1.5rem] md:rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${openIndex === index
                                            ? 'border-indigo-500/30 bg-white/10 shadow-2xl shadow-indigo-500/5'
                                            : 'border-white/5 shadow-sm hover:border-white/10'
                                            }`}
                                    >
                                        <button
                                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                            className="w-full px-6 py-6 md:px-10 md:py-8 flex items-center justify-between text-left group gap-4"
                                        >
                                            <div className="flex flex-col gap-2">
                                                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">
                                                    {faq.category || 'General'}
                                                </span>
                                                <h3 className="text-xl font-black text-white uppercase leading-tight group-hover:text-indigo-400 transition-colors">
                                                    {faq.question}
                                                </h3>
                                            </div>
                                            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center transition-all ${openIndex === index ? 'bg-indigo-600 text-white rotate-0' : 'bg-white/10 text-gray-400 rotate-180'
                                                }`}>
                                                {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                            </div>
                                        </button>

                                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                                            }`}>
                                            <div className="px-6 pb-6 md:px-10 md:pb-10">
                                                <div className="pt-6 border-t border-white/10">
                                                    <p className="text-gray-300 text-base md:text-lg font-medium leading-relaxed italic">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* CTA Footer */}
                        <div className="bg-indigo-600 rounded-[2rem] md:rounded-[3.5rem] p-8 md:p-16 relative overflow-hidden shadow-2xl group">
                            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
                                <div className="text-center md:text-left max-w-xl">
                                    <h2 className="text-2xl md:text-4xl font-black text-white uppercase leading-none mb-4 md:mb-6">
                                        Still have <br className="hidden md:block" /> questions?
                                    </h2>
                                    <p className="text-indigo-100 font-medium italic opacity-80 text-base md:text-lg">
                                        Our technical team is ready to help you navigate your AI transformation journey.
                                    </p>
                                </div>
                                <Link
                                    href="/contact"
                                    className="bg-white text-indigo-600 px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center gap-3 shadow-xl hover:scale-105 active:scale-95"
                                >
                                    GET IN TOUCH <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
