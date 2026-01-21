"use client";

import React, { Suspense } from 'react';
import Navbar from "@/components/nfinite/Navbar";
import ContactHero from "@/components/nfinite/ContactHero";
import ContactForm from "@/components/nfinite/ContactForm";
import Footer from "@/components/nfinite/Footer";
import { MessageSquare } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-cream selection:bg-light-blue selection:text-black">
            <Navbar />

            <article>
                <ContactHero />

                {/* Contact Form Section */}
                <section className="pb-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                            {/* Form Side */}
                            <div className="lg:col-span-12 max-w-4xl mx-auto w-full">
                                <Suspense fallback={<div className="text-white text-center">Loading form...</div>}>
                                    <ContactForm />
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ / Additional Support Section */}
                <section className="py-24 border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <div className="inline-flex items-center gap-2 bg-light-blue/10 px-4 py-2 rounded-full text-light-blue text-xs font-bold mb-8">
                            <MessageSquare className="w-4 h-4" />
                            SUPPORT 24/7
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Need instant help?</h2>
                        <p className="text-dark-navy/50 mb-12 max-w-lg mx-auto">
                            Check our documentation or reach out to our dedicated support team for technical assistance.
                        </p>
                        <button className="px-10 py-4 border-2 border-white/10 rounded-2xl text-white font-bold hover:bg-white hover:text-black hover:border-white transition-all">
                            VISIT SUPPORT CENTER
                        </button>
                    </div>
                </section>
            </article>

            <Footer />
        </main>
    );
}
