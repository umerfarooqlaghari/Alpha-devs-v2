/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, Phone, MapPin } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function ContactForm() {
    const searchParams = useSearchParams();
    const [formType, setFormType] = useState<'INQUIRY' | 'BOOKING'>('INQUIRY');

    useEffect(() => {
        const type = searchParams.get('type');
        if (type === 'booking') {
            setFormType('BOOKING');
        }
    }, [searchParams]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        date: '',
        time: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    type: formType,
                    subject: formType === 'BOOKING' ? `Meeting Request: ${formData.subject}` : formData.subject
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }

            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '', date: '', time: '' });
        } catch (error: any) {
            console.error('Submission error:', error);
            setStatus('error');
            setErrorMessage(error.message || 'Failed to send message. Please try again.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <div className="bg-white/[0.03] border border-white/5 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden group shadow-2xl backdrop-blur-sm">
            {/* Background Accent */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-light-blue/5 rounded-full blur-3xl -z-0" />

            {status === 'success' ? (
                <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-light-blue/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-light-blue" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                    <p className="text-dark-navy/60 max-w-sm mx-auto mb-8">
                        Thank you for reaching out. We&apos;ve received your request and sent a confirmation email to your inbox.
                    </p>
                    <button
                        onClick={() => setStatus('idle')}
                        className="text-light-blue font-bold tracking-widest uppercase text-xs hover:text-white transition-colors"
                    >
                        Send another message
                    </button>
                </div>
            ) : (
                <>
                    <div className="mb-10">
                        <div className="flex gap-2 mb-8 bg-white/5 p-1 rounded-2xl w-fit">
                            <button
                                type="button"
                                onClick={() => setFormType('INQUIRY')}
                                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${formType === 'INQUIRY' ? 'bg-light-blue text-black shadow-lg shadow-light-blue/20' : 'text-white/40 hover:text-white'}`}
                            >
                                GENERAL INQUIRY
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormType('BOOKING')}
                                className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${formType === 'BOOKING' ? 'bg-light-blue text-black shadow-lg shadow-light-blue/20' : 'text-white/40 hover:text-white'}`}
                            >
                                BOOK A CALL
                            </button>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            {formType === 'INQUIRY' ? (
                                <>Let&apos;s start a <span className="text-light-blue italic">conversation.</span></>
                            ) : (
                                <>Schedule your <span className="text-light-blue italic">consultation.</span></>
                            )}
                        </h2>
                        <p className="text-dark-navy/50 text-sm max-w-md">
                            {formType === 'INQUIRY'
                                ? "Fill out the form below and our team will get back to you within 24 hours."
                                : "Pick a date and time that works for you, and we'll confirm the meeting via email."}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-4">Full Name</label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-light-blue/50 transition-all placeholder:text-white/10"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-4">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-light-blue/50 transition-all placeholder:text-white/10"
                                />
                            </div>
                        </div>

                        {formType === 'BOOKING' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-4">Preferred Date</label>
                                    <input
                                        required
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-light-blue/50 transition-all [color-scheme:dark]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-4">Preferred Time</label>
                                    <input
                                        required
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-light-blue/50 transition-all [color-scheme:dark]"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-4">
                                {formType === 'BOOKING' ? 'Consultation Topic' : 'Subject'}
                            </label>
                            <input
                                required
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder={formType === 'BOOKING' ? "e.g. Project Strategy, API Audit" : "How can we help you?"}
                                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-light-blue/50 transition-all placeholder:text-white/10"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-4">
                                {formType === 'BOOKING' ? 'Additional Details' : 'Message'}
                            </label>
                            <textarea
                                required
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder={formType === 'BOOKING' ? "Briefly describe what you'd like to discuss..." : "Tell us about your project..."}
                                rows={formType === 'BOOKING' ? 3 : 5}
                                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-light-blue/50 transition-all placeholder:text-white/10 resize-none"
                            />
                        </div>

                        {status === 'error' && (
                            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-500 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        <button
                            disabled={status === 'loading'}
                            type="submit"
                            className="w-full bg-light-blue text-black font-bold py-5 rounded-2xl hover:bg-white transition-all transform hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed group duration-300 shadow-lg shadow-light-blue/10"
                        >
                            {status === 'loading' ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {formType === 'BOOKING' ? 'BOOKING...' : 'SENDING...'}
                                </>
                            ) : (
                                <>
                                    {formType === 'BOOKING' ? 'CONFIRM BOOKING' : 'SEND MESSAGE'}
                                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </>
            )}
            <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000">
                {[
                    { icon: <Mail className="w-6 h-6" />, label: "Email Us", value: "info@alphadevs.com" },
                    { icon: <Phone className="w-6 h-6" />, label: "Call Us", value: "+92 300-9243063" },
                    { icon: <MapPin className="w-6 h-6" />, label: "Visit Us", value: "Karachi, Pakistan" },
                ].map((item, idx) => (
                    <div key={idx} className="bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.05] transition-all group">
                        <div className="w-12 h-12 bg-light-blue/10 rounded-2xl flex items-center justify-center text-light-blue mb-4 group-hover:scale-110 transition-transform">
                            {item.icon}
                        </div>
                        <h3 className="text-white/40 font-bold uppercase tracking-widest text-[10px] mb-2">{item.label}</h3>
                        <p className="text-white font-bold">{item.value}</p>
                    </div>
                ))}
            </div>
        </div>

    );
}
