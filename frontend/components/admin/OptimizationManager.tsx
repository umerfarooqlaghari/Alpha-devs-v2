/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import {
    Settings,
    Search,
    Code,
    FileCode,
    Save,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Globe,
    Facebook,
    Twitter,
    Type,
    AlignLeft,
    Layers,
    Terminal,
    Plus,
    Trash2,
    ImageIcon
} from 'lucide-react';

interface SiteOptimization {
    id?: string;
    pagePath: string;
    title?: string;
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    structuredData?: any;
    headerScripts?: string;
    bodyScripts?: string;
    footerScripts?: string;
}

const PAGES = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Consultancy', path: '/consultancy' },
    { name: 'Products', path: '/products' },
    { name: 'Contact', path: '/contact' },
    { name: 'Global (All Pages)', path: '*' }
];

export default function OptimizationManager() {
    const [activePage, setActivePage] = useState(PAGES[0].path);
    const [activeSubTab, setActiveSubTab] = useState<'meta' | 'structured' | 'scripts'>('meta');
    const [optimizationData, setOptimizationData] = useState<SiteOptimization | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    useEffect(() => {
        fetchOptimization();
    }, [activePage]);

    const fetchOptimization = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/optimization/path?path=${encodeURIComponent(activePage)}`);
            const data = await res.json();
            setOptimizationData(data || { pagePath: activePage });
        } catch (error) {
            console.error('Fetch optimization error:', error);
            setStatus({ type: 'error', message: 'Failed to fetch optimization data.' });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field: keyof SiteOptimization, value: any) => {
        setOptimizationData(prev => prev ? { ...prev, [field]: value } : { pagePath: activePage, [field]: value });
    };

    const handleSave = async () => {
        setSaving(true);
        setStatus(null);
        try {
            const res = await fetch(`${API_URL}/api/optimization`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(optimizationData)
            });

            if (!res.ok) throw new Error('Failed to save');

            setStatus({ type: 'success', message: 'Optimization settings saved successfully!' });
        } catch (error) {
            console.error('Save error:', error);
            setStatus({ type: 'error', message: 'Failed to save settings.' });
        } finally {
            setSaving(false);
        }
    };

    if (loading && !optimizationData) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3 uppercase">
                        <Globe className="w-8 h-8 text-indigo-600" />
                        AEO & SEO OPTIMIZATION
                    </h1>
                    <p className="text-gray-500 font-medium italic">Manage meta tags, JSON-LD structured data, and custom scripts.</p>
                </div>

                <div className="flex items-center gap-3">
                    {status && (
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold animate-in slide-in-from-top duration-300 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                            }`}>
                            {status.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            {status.message}
                        </div>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-full font-black text-sm hover:bg-indigo-700 transition-all shadow-lg hover:scale-105 disabled:opacity-50 disabled:scale-100"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? 'SAVING...' : 'SAVE CHANGES'}
                    </button>
                </div>
            </div>

            {/* Page Selector */}
            <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-2xl w-fit">
                {PAGES.map((page) => (
                    <button
                        key={page.path}
                        onClick={() => { setActivePage(page.path); setStatus(null); }}
                        className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-black transition-all duration-300 ${activePage === page.path
                            ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-gray-200'
                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                    >
                        {page.name.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-4 gap-8">
                {/* Secondary Tabs (Sub-tabs) */}
                <div className="lg:col-span-1 space-y-2">
                    <button
                        onClick={() => setActiveSubTab('meta')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-black transition-all ${activeSubTab === 'meta' ? 'bg-indigo-600 text-white shadow-lg lg:translate-x-2' : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Search className="w-4 h-4" />
                        META HEAD TAGS
                    </button>
                    <button
                        onClick={() => setActiveSubTab('structured')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-black transition-all ${activeSubTab === 'structured' ? 'bg-indigo-600 text-white shadow-lg lg:translate-x-2' : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <FileCode className="w-4 h-4" />
                        JSON-LD (AEO)
                    </button>
                    <button
                        onClick={() => setActiveSubTab('scripts')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-black transition-all ${activeSubTab === 'scripts' ? 'bg-indigo-600 text-white shadow-lg lg:translate-x-2' : 'bg-white text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        <Terminal className="w-4 h-4" />
                        CUSTOM SCRIPTS
                    </button>
                </div>

                {/* Content Panel */}
                <div className="lg:col-span-3 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden min-h-[500px]">
                    <div className="p-8 md:p-12">
                        {activeSubTab === 'meta' && (
                            <div className="space-y-8 animate-in slide-in-from-right duration-500">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Type className="w-3 h-3" /> Page Title
                                        </label>
                                        <input
                                            type="text"
                                            value={optimizationData?.title || ''}
                                            onChange={(e) => handleInputChange('title', e.target.value)}
                                            placeholder="Alpha Development | Engineering Excellence"
                                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-black"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                            <Layers className="w-3 h-3" /> Keywords
                                        </label>
                                        <input
                                            type="text"
                                            value={optimizationData?.keywords || ''}
                                            onChange={(e) => handleInputChange('keywords', e.target.value)}
                                            placeholder="software, ai, erp, digital transformation"
                                            className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-black"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <AlignLeft className="w-3 h-3" /> Description
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={optimizationData?.description || ''}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        placeholder="Engineering high-performance AI, ERP, and custom digital ecosystems..."
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all font-medium text-black"
                                    />
                                </div>

                                <div className="pt-8 border-t border-gray-50">
                                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Social Sharing (Open Graph)</h3>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <label className="text-xs font-bold text-gray-600 flex items-center gap-2">
                                                <Facebook className="w-3 h-3" /> OG Title
                                            </label>
                                            <input
                                                type="text"
                                                value={optimizationData?.ogTitle || ''}
                                                onChange={(e) => handleInputChange('ogTitle', e.target.value)}
                                                className="w-full px-6 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all text-sm font-medium text-black"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <label className="text-xs font-bold text-gray-600 flex items-center gap-2">
                                                <ImageIcon className="w-3 h-3" /> OG Image URL
                                            </label>
                                            <input
                                                type="text"
                                                value={optimizationData?.ogImage || ''}
                                                onChange={(e) => handleInputChange('ogImage', e.target.value)}
                                                placeholder="https://cloudinary.com/..."
                                                className="w-full px-6 py-3 rounded-xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all text-sm font-medium text-black"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSubTab === 'structured' && (
                            <div className="space-y-6 animate-in slide-in-from-right duration-500">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h3 className="text-lg font-black text-gray-900 tracking-tight uppercase">Structured Data (JSON-LD)</h3>
                                        <p className="text-sm text-gray-500 font-medium italic">Help AI Answer Engines understand your content structure.</p>
                                    </div>
                                    <a href="https://validator.schema.org/" target="_blank" rel="noreferrer" className="text-xs font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors">
                                        SCHEMA VALIDATOR
                                    </a>
                                </div>
                                <div className="relative group">
                                    <div className="absolute top-4 right-4 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white/50 px-2 py-1 rounded-md">JSON FORMAT</div>
                                    <textarea
                                        rows={15}
                                        value={optimizationData?.structuredData ? JSON.stringify(optimizationData.structuredData, null, 2) : ''}
                                        onChange={(e) => {
                                            try {
                                                const parsed = e.target.value ? JSON.parse(e.target.value) : null;
                                                handleInputChange('structuredData', parsed);
                                            } catch (err) {
                                                // Allow typing invalid json but don't parse it yet
                                                setOptimizationData(prev => prev ? { ...prev, structuredData: e.target.value as any } : { pagePath: activePage, structuredData: e.target.value as any });
                                            }
                                        }}
                                        placeholder={`{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Alpha Development",
  "url": "https://alphadevs.com"
}`}
                                        className="w-full px-8 py-8 rounded-[2rem] bg-gray-900 text-green-400 font-mono text-sm border-none focus:ring-4 focus:ring-indigo-100 transition-all"
                                    />
                                </div>
                                <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex gap-3">
                                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                    <p className="text-xs text-blue-800 font-medium leading-relaxed">
                                        Properly formatted JSON-LD significantly improves your site's visibility in Google Search Rich Results and AI-powered answer engines. Use the validator tool to ensure your data is accurate.
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeSubTab === 'scripts' && (
                            <div className="space-y-8 animate-in slide-in-from-right duration-500">
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Code className="w-3 h-3" /> Header Scripts
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={optimizationData?.headerScripts || ''}
                                        onChange={(e) => handleInputChange('headerScripts', e.target.value)}
                                        placeholder="<script>Google Tag Manager...</script>"
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all font-mono text-xs text-black"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Terminal className="w-3 h-3" /> Body (Start) Scripts
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={optimizationData?.bodyScripts || ''}
                                        onChange={(e) => handleInputChange('bodyScripts', e.target.value)}
                                        placeholder="<!-- Use for noscript tags or heatmaps -->"
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all font-mono text-xs text-black"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <Layers className="w-3 h-3" /> Footer (End) Scripts
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={optimizationData?.footerScripts || ''}
                                        onChange={(e) => handleInputChange('footerScripts', e.target.value)}
                                        placeholder="<!-- Interactive widgets or analytics trackers -->"
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all font-mono text-xs text-black"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
