/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import {
    Upload,
    Image as ImageIcon,
    Video as VideoIcon,
    Save,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Home,
    Info,
    Layout,
    Briefcase,
    PhoneCall,
    MonitorPlay,
    Trash2
} from 'lucide-react';

interface PageMedia {
    id?: string;
    pageName: string;
    sectionName: string;
    fieldName: string;
    mediaType: 'image' | 'video';
    url: string;
    publicId?: string;
}

const PAGES = [
    {
        name: 'Home', icon: Home, sections: [
            {
                name: 'Hero', fields: [
                    { name: 'backgroundVideo', label: 'Background Video', type: 'video' },
                    { name: 'backgroundImage', label: 'Background Image (Fallback)', type: 'image' }
                ]
            }
        ]
    },
    {
        name: 'About', icon: Info, sections: [
            {
                name: 'Hero', fields: [
                    { name: 'heroImage', label: 'Hero Image', type: 'image' },
                    { name: 'heroVideo', label: 'Hero Video', type: 'video' }
                ]
            }
        ]
    },
    {
        name: 'Consultancy', icon: Briefcase, sections: [
            {
                name: 'Hero', fields: [
                    { name: 'heroMedia', label: 'Hero Media', type: 'image' }
                ]
            }
        ]
    },
    {
        name: 'Services', icon: Layout, sections: [
            {
                name: 'Hero', fields: [
                    { name: 'headerImage', label: 'Header Image', type: 'image' }
                ]
            }
        ]
    },
    {
        name: 'Contact', icon: PhoneCall, sections: [
            {
                name: 'Hero', fields: [
                    { name: 'bannerImage', label: 'Banner Image', type: 'image' }
                ]
            }
        ]
    }
];

export default function MediaContentManager() {
    const [activePage, setActivePage] = useState(PAGES[0].name);
    const [mediaItems, setMediaItems] = useState<PageMedia[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [uploadingField, setUploadingField] = useState<string | null>(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    useEffect(() => {
        fetchMedia();
    }, []);

    const fetchMedia = async () => {
        try {
            const res = await fetch(`${API_URL}/api/pagemedia`);
            const data = await res.json();
            setMediaItems(data);
        } catch (error) {
            console.error('Fetch media error:', error);
        } finally {
            setLoading(false);
        }
    };

    const getMediaValue = (page: string, section: string, field: string) => {
        return mediaItems.find(m => m.pageName === page && m.sectionName === section && m.fieldName === field);
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, page: string, section: string, field: string, type: 'image' | 'video') => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploadingField(field);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');

        try {
            const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();

            // Save to backend
            await saveMedia(page, section, field, type, data.secure_url, data.public_id);
            await fetchMedia();
            setStatus({ type: 'success', message: 'Media uploaded and saved successfully!' });
        } catch (error) {
            console.error('Upload error:', error);
            setStatus({ type: 'error', message: 'Failed to upload media.' });
        } finally {
            setUploadingField(null);
        }
    };

    const saveMedia = async (pageName: string, sectionName: string, fieldName: string, mediaType: string, url: string, publicId: string) => {
        setSaving(true);
        try {
            const res = await fetch(`${API_URL}/api/pagemedia`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pageName, sectionName, fieldName, mediaType, url, publicId }),
            });
            if (!res.ok) throw new Error('Failed to save');
        } catch (error) {
            console.error('Save error:', error);
            throw error;
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    const currentPage = PAGES.find(p => p.name === activePage);

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                        <MonitorPlay className="w-8 h-8 text-indigo-600" />
                        MEDIA CONTENT
                    </h1>
                    <p className="text-gray-500 font-medium">Manage sitewide images and videos by page.</p>
                </div>

                {status && (
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold animate-in slide-in-from-top duration-300 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                        {status.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        {status.message}
                    </div>
                )}
            </div>

            {/* Main Tabs */}
            <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-2xl w-fit">
                {PAGES.map((page) => (
                    <button
                        key={page.name}
                        onClick={() => { setActivePage(page.name); setStatus(null); }}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all duration-300 ${activePage === page.name
                                ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-gray-200'
                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                    >
                        <page.icon className="w-4 h-4" />
                        {page.name.toUpperCase()}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="grid lg:grid-cols-2 gap-8">
                {currentPage?.sections.map((section, idx) => (
                    <div key={idx} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                            <h2 className="text-lg font-black text-gray-900 tracking-tight uppercase">
                                {section.name} SECTION Assets
                            </h2>
                            <span className="text-[10px] font-black text-gray-400 bg-white px-2 py-1 rounded-full border border-gray-100">
                                {section.fields.length} FIELDS
                            </span>
                        </div>

                        <div className="p-8 space-y-8 flex-1">
                            {section.fields.map((field, fIdx) => {
                                const media = getMediaValue(currentPage.name, section.name, field.name);
                                const isUploading = uploadingField === field.name;

                                return (
                                    <div key={fIdx} className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-black text-gray-700 uppercase tracking-wider">
                                                {field.label}
                                            </label>
                                            {media && (
                                                <div className="flex items-center gap-2 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                                    <CheckCircle2 className="w-3 h-3" /> ATTACHED
                                                </div>
                                            )}
                                        </div>

                                        <div className="relative group overflow-hidden bg-gray-50 rounded-3xl aspect-video border-2 border-dashed border-gray-200 flex flex-col items-center justify-center transition-all hover:border-indigo-300">
                                            {media ? (
                                                <>
                                                    {field.type === 'video' ? (
                                                        <video
                                                            src={media.url}
                                                            className="w-full h-full object-cover rounded-2xl"
                                                            controls
                                                        />
                                                    ) : (
                                                        <img
                                                            src={media.url}
                                                            alt={field.label}
                                                            className="w-full h-full object-cover rounded-2xl"
                                                        />
                                                    )}
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                                                        <label className="bg-white text-black p-4 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-xl">
                                                            <Upload className="w-6 h-6" />
                                                            <input
                                                                type="file"
                                                                className="hidden"
                                                                accept={field.type === 'video' ? 'video/*' : 'image/*'}
                                                                onChange={(e) => handleFileUpload(e, currentPage.name, section.name, field.name, field.type as any)}
                                                                disabled={isUploading}
                                                            />
                                                        </label>
                                                        <button className="bg-red-500 text-white p-4 rounded-full hover:scale-110 transition-transform shadow-xl">
                                                            <Trash2 className="w-6 h-6" />
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <label className="cursor-pointer flex flex-col items-center gap-4 group">
                                                    <div className="p-5 bg-white rounded-full shadow-sm text-gray-400 group-hover:text-indigo-600 transition-colors">
                                                        {field.type === 'video' ? <VideoIcon className="w-8 h-8" /> : <ImageIcon className="w-8 h-8" />}
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-sm font-black text-gray-900">Upload {field.type.toUpperCase()}</p>
                                                        <p className="text-xs text-gray-500 font-medium tracking-tight">Click to browse files</p>
                                                    </div>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept={field.type === 'video' ? 'video/*' : 'image/*'}
                                                        onChange={(e) => handleFileUpload(e, currentPage.name, section.name, field.name, field.type as any)}
                                                        disabled={isUploading}
                                                    />
                                                </label>
                                            )}

                                            {isUploading && (
                                                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 z-20">
                                                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                                                    <p className="text-sm font-black text-indigo-600 animate-pulse">OPTIMIZING ASSETS...</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}

                {/* Integration Info Card */}
                <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[2rem] p-10 text-white space-y-6 flex flex-col justify-center">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                        <MonitorPlay className="w-8 h-8 text-white" />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-black tracking-tight uppercase">Unified Media Hub</h3>
                        <p className="text-indigo-100 font-medium leading-relaxed">
                            This panel centralizes media management for all core pages. Changes here propagate instantly across your frontend infrastructure.
                        </p>
                    </div>
                    <div className="pt-4 grid grid-cols-2 gap-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <p className="text-[10px] font-black uppercase text-indigo-200 mb-1">Status</p>
                            <p className="text-sm font-bold">Cloudinary Integrated</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                            <p className="text-[10px] font-black uppercase text-indigo-200 mb-1">Support</p>
                            <p className="text-sm font-bold">4K Video & HD Images</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
