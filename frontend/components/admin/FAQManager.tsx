'use client';

import { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Save,
    X,
    Loader2,
    CheckCircle2,
    AlertCircle,
    MessageCircle,
    ChevronDown,
    ChevronUp,
    ListFilter,
    MoveUp,
    MoveDown
} from 'lucide-react';

interface FAQ {
    id: string;
    question: string;
    answer: string;
    category: string;
    order: number;
    createdAt: string;
}

export default function FAQManager() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentFaq, setCurrentFaq] = useState<Partial<FAQ> | null>(null);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/faqs`);
            const data = await res.json();
            setFaqs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Fetch FAQs error:', error);
            setStatus({ type: 'error', message: 'Failed to fetch FAQs.' });
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setCurrentFaq({
            question: '',
            answer: '',
            category: 'General',
            order: faqs.length
        });
        setIsEditing(true);
    };

    const handleEdit = (faq: FAQ) => {
        setCurrentFaq(faq);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this FAQ?')) return;
        try {
            const res = await fetch(`${API_URL}/api/faqs/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setFaqs(faqs.filter(f => f.id !== id));
                setStatus({ type: 'success', message: 'FAQ deleted successfully.' });
            }
        } catch (error) {
            console.error('Delete error:', error);
            setStatus({ type: 'error', message: 'Failed to delete FAQ.' });
        }
    };

    const handleSave = async () => {
        if (!currentFaq?.question || !currentFaq?.answer) {
            setStatus({ type: 'error', message: 'Question and Answer are required.' });
            return;
        }

        setSaving(true);
        try {
            const method = currentFaq.id ? 'PUT' : 'POST';
            const url = currentFaq.id ? `${API_URL}/api/faqs/${currentFaq.id}` : `${API_URL}/api/faqs`;

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentFaq)
            });

            if (!res.ok) throw new Error('Failed to save');

            await fetchFaqs();
            setIsEditing(false);
            setStatus({ type: 'success', message: 'FAQ saved successfully!' });
        } catch (error) {
            console.error('Save error:', error);
            setStatus({ type: 'error', message: 'Failed to save FAQ.' });
        } finally {
            setSaving(false);
        }
    };

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isEditing) {
        return (
            <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-gray-900 uppercase">
                        {currentFaq?.id ? 'Edit FAQ' : 'New FAQ Question'}
                    </h2>
                    <div className="flex gap-3">
                        <button onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-full border border-gray-200 font-bold hover:bg-gray-50 transition-all">
                            CANCEL
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-indigo-600 text-white px-8 py-2 rounded-full font-black flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg hover:scale-105 disabled:opacity-50"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {saving ? 'SAVING...' : 'SAVE FAQ'}
                        </button>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl space-y-8">
                    <div className="space-y-4">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Question</label>
                        <input
                            type="text"
                            value={currentFaq?.question || ''}
                            onChange={(e) => setCurrentFaq({ ...currentFaq, question: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-100 transition-all font-bold text-black"
                            placeholder="What is your return policy?"
                        />
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Answer</label>
                        <textarea
                            rows={8}
                            value={currentFaq?.answer || ''}
                            onChange={(e) => setCurrentFaq({ ...currentFaq, answer: e.target.value })}
                            className="w-full px-6 py-6 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-100 transition-all font-medium leading-relaxed text-black"
                            placeholder="Provide a concise and helpful answer..."
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Category</label>
                            <input
                                type="text"
                                value={currentFaq?.category || ''}
                                onChange={(e) => setCurrentFaq({ ...currentFaq, category: e.target.value })}
                                className="w-full px-6 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-100 text-sm font-medium text-black"
                                placeholder="e.g. Services, Pricing"
                            />
                        </div>
                        <div className="space-y-4">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Display Order</label>
                            <input
                                type="number"
                                value={currentFaq?.order ?? 0}
                                onChange={(e) => setCurrentFaq({ ...currentFaq, order: parseInt(e.target.value) })}
                                className="w-full px-6 py-3 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-100 text-sm font-medium text-black"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3 uppercase">
                        <MessageCircle className="w-8 h-8 text-indigo-600" />
                        FREQUENTLY ASKED QUESTIONS
                    </h1>
                    <p className="text-gray-500 font-medium italic">Manage questions and answers for your clients.</p>
                </div>

                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full font-black text-sm hover:bg-indigo-700 transition-all shadow-lg hover:scale-105"
                >
                    <Plus className="w-5 h-5" />
                    ADD NEW FAQ
                </button>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
                <Search className="w-5 h-5 text-gray-400 ml-4" />
                <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:ring-0 font-medium text-black"
                />
                <ListFilter className="w-5 h-5 text-gray-400 mr-4" />
            </div>

            {loading ? (
                <div className="p-20 flex flex-col items-center justify-center">
                    <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
                    <p className="mt-4 text-gray-500 font-bold uppercase tracking-widest">Loading FAQs...</p>
                </div>
            ) : filteredFaqs.length === 0 ? (
                <div className="p-20 text-center bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-black text-gray-900 uppercase">No FAQs found</h3>
                    <p className="text-gray-500 mt-2 italic font-medium">Add frequently asked questions to help your users.</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredFaqs.map((faq) => (
                        <div key={faq.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden group">
                            <div className="p-6 flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-black">
                                        {faq.order + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{faq.category}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleEdit(faq)}
                                        className="p-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(faq.id)}
                                        className="p-2 bg-gray-50 text-gray-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
