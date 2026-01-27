/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { Mail, Calendar, MessageSquare, CheckCircle, Clock, Trash2, ExternalLink, Send } from 'lucide-react';

interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    type: 'INQUIRY' | 'BOOKING';
    date: string | null;
    time: string | null;
    status: 'PENDING' | 'REVIEWED' | 'RESPONDED' | 'CLOSED';
    createdAt: string;
}

export default function ContactSubmissionsManager() {
    const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const res = await fetch(`${API_URL}/api/contact`, {
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                setSubmissions(data);
            }
        } catch (error) {
            console.error('Failed to fetch submissions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`${API_URL}/api/contact/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
                credentials: 'include'
            });
            if (res.ok) {
                setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status: newStatus as any } : s));
            }
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const deleteSubmission = async (id: string) => {
        if (!confirm('Are you sure you want to delete this inquiry?')) return;
        try {
            const res = await fetch(`${API_URL}/api/contact/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (res.ok) {
                setSubmissions(prev => prev.filter(s => s.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete submission:', error);
        }
    };

    const filteredSubmissions = filter === 'ALL'
        ? submissions
        : submissions.filter(s => s.status === filter);

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'REVIEWED': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'RESPONDED': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
            case 'CLOSED': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Contact Feedback</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage and track all contact form submissions from your website.</p>
                </div>

                <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                    {['ALL', 'PENDING', 'REVIEWED', 'RESPONDED', 'CLOSED'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${filter === f
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
                </div>
            ) : (
                <div className="grid gap-6">
                    {filteredSubmissions.length === 0 ? (
                        <div className="bg-white p-12 rounded-2xl border border-dashed border-gray-200 text-center">
                            <h3 className="text-lg font-medium text-gray-900">No submissions found</h3>
                        </div>
                    ) : (
                        filteredSubmissions.map((sub) => (
                            <div key={sub.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                                <div className="p-6">
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                                        <div className="flex gap-3">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${sub.type === 'BOOKING' ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                                {sub.name[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-lg font-bold text-gray-900 leading-tight">{sub.name}</h3>
                                                    {sub.type === 'BOOKING' && (
                                                        <span className="bg-emerald-100 text-emerald-700 text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">
                                                            Meeting Request
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-0.5">
                                                    <Mail className="w-3.5 h-3.5" />
                                                    {sub.email}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <select
                                                value={sub.status}
                                                onChange={(e) => updateStatus(sub.id, e.target.value)}
                                                className={`px-3 py-1 rounded-full text-[10px] font-bold border outline-none cursor-pointer text-black ${getStatusColor(sub.status)}`}
                                            >
                                                <option value="PENDING">PENDING</option>
                                                <option value="REVIEWED">REVIEWED</option>
                                                <option value="RESPONDED">RESPONDED</option>
                                                <option value="CLOSED">CLOSED</option>
                                            </select>
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                                {formatDate(sub.createdAt)}
                                            </span>
                                        </div>
                                    </div>

                                    {sub.type === 'BOOKING' && (
                                        <div className="mb-4 flex gap-4 bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10 text-emerald-700">
                                            <div className="flex items-center gap-2 text-xs font-bold">
                                                <Calendar className="w-4 h-4" />
                                                {sub.date}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-bold border-l border-emerald-200 pl-4">
                                                <Clock className="w-4 h-4" />
                                                {sub.time}
                                            </div>
                                        </div>
                                    )}

                                    <div className={`rounded-xl p-5 border ${sub.type === 'BOOKING'
                                        ? 'bg-yellow-50/50 border-yellow-200/50'
                                        : 'bg-gray-50/50 border-gray-100/50'
                                        }`}>
                                        <h4 className={`text-sm font-bold mb-2 flex items-center gap-2 ${sub.type === 'BOOKING' ? 'text-yellow-800' : 'text-gray-700'}`}>
                                            <MessageSquare className={`w-4 h-4 ${sub.type === 'BOOKING' ? 'text-yellow-500' : 'text-indigo-400'}`} />
                                            {sub.subject}
                                        </h4>
                                        <p className={`text-sm leading-relaxed whitespace-pre-wrap ${sub.type === 'BOOKING' ? 'text-yellow-900/80 italic font-medium' : 'text-gray-600'}`}>
                                            {sub.message}
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gray-50/30 px-6 py-3 border-t border-gray-50 flex justify-end gap-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <a
                                        href={`mailto:${sub.email}?subject=Re: ${sub.subject}`}
                                        onClick={() => updateStatus(sub.id, 'RESPONDED')}
                                        className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-indigo-600 transition-colors uppercase tracking-widest"
                                    >
                                        <Send className="w-3 h-3" />
                                        Reply via Email
                                    </a>
                                    <button
                                        onClick={() => deleteSubmission(sub.id)}
                                        className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
