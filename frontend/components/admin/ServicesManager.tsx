/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Check, X, Upload, Loader2, Video, Layout, Info, Type, Image as ImageIcon, ArrowUp, ArrowDown } from 'lucide-react';

interface InfoCard {
    id?: string;
    title: string;
    description: string;
    tag: string;
    imageUrl?: string;
    publicId?: string;
    order: number;
}

interface ContentBlock {
    id?: string;
    type: 'text' | 'image' | 'heading';
    content: string;
    style?: {
        fontSize?: string;
        bold?: boolean;
        color?: string;
        align?: 'left' | 'center' | 'right';
    };
    imageUrl?: string;
    publicId?: string;
    order: number;
}

interface Service {
    id: string;
    title: string;
    slug: string;
    description: string;
    keywords: string[];
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    features: string[];
    imageUrl: string | null;
    imagePublicId: string | null;
    videoUrl: string | null;
    order: number;
    infoCards: InfoCard[];
    contentBlocks: ContentBlock[];
}

export default function ServicesManager() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<'basic' | 'hero' | 'cards' | 'content'>('basic');
    const [currentService, setCurrentService] = useState<Partial<Service>>({
        title: '',
        slug: '',
        description: '',
        keywords: [],
        heroTitle: '',
        heroSubtitle: '',
        heroDescription: '',
        features: [],
        imageUrl: '',
        videoUrl: '',
        infoCards: [],
        contentBlocks: [],
        order: 0
    });
    const [keywordInput, setKeywordInput] = useState('');
    const [featureInput, setFeatureInput] = useState('');
    const [uploading, setUploading] = useState<'image' | 'video' | 'card' | 'block' | null>(null);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await fetch(`${API_URL}/api/services`);
            if (res.ok) {
                const data = await res.json();
                setServices(data);
            }
        } catch (error) {
            console.error('Failed to fetch services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'card' | 'block', extraData?: any) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(type);
        try {
            const sigRes = await fetch(`${API_URL}/api/gallery/signature?folder=alpha-devs-services`);
            const { signature, timestamp, cloudName, apiKey } = await sigRes.json();

            const formData = new FormData();
            formData.append('file', file);
            formData.append('signature', signature);
            formData.append('timestamp', timestamp);
            formData.append('api_key', apiKey);
            formData.append('folder', 'alpha-devs-services');

            const resourceType = type === 'video' ? 'video' : 'image';
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (data.error) throw new Error(data.error.message);

            if (type === 'image') {
                setCurrentService({ ...currentService, imageUrl: data.secure_url, imagePublicId: data.public_id });
            } else if (type === 'video') {
                setCurrentService({ ...currentService, videoUrl: data.secure_url });
            } else if (type === 'card') {
                const updatedCards = [...(currentService.infoCards || [])];
                updatedCards[extraData.index] = { ...updatedCards[extraData.index], imageUrl: data.secure_url, publicId: data.public_id };
                setCurrentService({ ...currentService, infoCards: updatedCards });
            } else if (type === 'block') {
                const updatedBlocks = [...(currentService.contentBlocks || [])];
                updatedBlocks[extraData.index] = { ...updatedBlocks[extraData.index], imageUrl: data.secure_url, publicId: data.public_id, content: 'Image uploaded' };
                setCurrentService({ ...currentService, contentBlocks: updatedBlocks });
            }
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed');
        } finally {
            setUploading(null);
        }
    };

    const handleSave = async () => {
        const method = currentService.id ? 'PUT' : 'POST';
        const url = currentService.id
            ? `${API_URL}/api/services/${currentService.id}`
            : `${API_URL}/api/services`;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentService),
            });

            if (res.ok) {
                fetchServices();
                setIsEditing(false);
                resetForm();
            }
        } catch (error) {
            console.error('Save failed:', error);
        }
    };

    const resetForm = () => {
        setCurrentService({
            title: '', slug: '', description: '', keywords: [],
            heroTitle: '', heroSubtitle: '', heroDescription: '',
            features: [], imageUrl: '', videoUrl: '',
            infoCards: [], contentBlocks: [], order: 0
        });
        setKeywordInput('');
        setFeatureInput('');
        setActiveTab('basic');
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;
        try {
            const res = await fetch(`${API_URL}/api/services/${id}`, { method: 'DELETE' });
            if (res.ok) fetchServices();
        } catch (error) {
            console.error('Delete failed');
        }
    };

    // Card/Block Management helpers (Same as product manager)
    const addInfoCard = () => {
        const newCard: InfoCard = { title: '', description: '', tag: '', order: (currentService.infoCards?.length || 0) };
        setCurrentService({ ...currentService, infoCards: [...(currentService.infoCards || []), newCard] });
    };

    const removeInfoCard = (index: number) => {
        const cards = currentService.infoCards?.filter((_, i) => i !== index) || [];
        setCurrentService({ ...currentService, infoCards: cards });
    };

    const updateInfoCard = (index: number, field: keyof InfoCard, value: any) => {
        const cards = [...(currentService.infoCards || [])];
        cards[index] = { ...cards[index], [field]: value };
        setCurrentService({ ...currentService, infoCards: cards });
    };

    const addContentBlock = (type: 'text' | 'image' | 'heading') => {
        const newBlock: ContentBlock = {
            type,
            content: '',
            order: (currentService.contentBlocks?.length || 0),
            style: type === 'text' ? { fontSize: '16px', bold: false, color: '#374151', align: 'left' } : undefined
        };
        setCurrentService({ ...currentService, contentBlocks: [...(currentService.contentBlocks || []), newBlock] });
    };

    const removeContentBlock = (index: number) => {
        const blocks = currentService.contentBlocks?.filter((_, i) => i !== index) || [];
        setCurrentService({ ...currentService, contentBlocks: blocks });
    };

    const updateContentBlock = (index: number, field: string, value: any) => {
        const blocks = [...(currentService.contentBlocks || [])];
        if (field.startsWith('style.')) {
            const styleField = field.split('.')[1];
            blocks[index].style = { ...blocks[index].style, [styleField]: value };
        } else {
            (blocks[index] as any)[field] = value;
        }
        setCurrentService({ ...currentService, contentBlocks: blocks });
    };

    const moveBlock = (index: number, direction: 'up' | 'down') => {
        const blocks = [...(currentService.contentBlocks || [])];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= blocks.length) return;
        [blocks[index], blocks[targetIndex]] = [blocks[targetIndex], blocks[index]];
        setCurrentService({ ...currentService, contentBlocks: blocks });
    };

    if (loading) return <div className="p-8 text-center text-gray-500 uppercase tracking-widest text-xs font-bold">Initialising Services...</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Services Catalog</h2>
                    <p className="text-gray-500 text-sm">Design and deploy high-impact service landing pages with enriched content.</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => { resetForm(); setIsEditing(true); }}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    >
                        <Plus className="w-4 h-4" />
                        Create Service
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-5xl mx-auto animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex border-b border-gray-100 bg-gray-50/50">
                        <button onClick={() => setActiveTab('basic')} className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${activeTab === 'basic' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-gray-400'}`}>
                            <Layout className="w-4 h-4" /> Basic Info
                        </button>
                        <button onClick={() => setActiveTab('hero')} className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${activeTab === 'hero' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-gray-400'}`}>
                            <ImageIcon className="w-4 h-4" /> Hero Content
                        </button>
                        <button onClick={() => setActiveTab('cards')} className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${activeTab === 'cards' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-gray-400'}`}>
                            <Info className="w-4 h-4" /> Detail Cards
                        </button>
                        <button onClick={() => setActiveTab('content')} className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${activeTab === 'content' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-gray-400'}`}>
                            <Type className="w-4 h-4" /> Dynamic Blocks
                        </button>
                    </div>

                    <div className="p-8">
                        {activeTab === 'basic' && (
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Service Title</label>
                                        <input type="text" value={currentService.title} onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm" placeholder="e.g., Computer Vision Solutions" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">URL Slug</label>
                                        <input type="text" value={currentService.slug} onChange={(e) => setCurrentService({ ...currentService, slug: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-mono" placeholder="computer-vision (auto from title)" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Keywords (SEO)</label>
                                        <textarea value={currentService.keywords?.join(', ')} onChange={(e) => setCurrentService({ ...currentService, keywords: e.target.value.split(',').map(s => s.trim()) })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm" placeholder="AI, Machine Learning, RPA..." />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Card Description</label>
                                        <textarea value={currentService.description} onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm min-h-[140px]" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Order priority</label>
                                        <input type="number" value={currentService.order} onChange={(e) => setCurrentService({ ...currentService, order: parseInt(e.target.value) })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'hero' && (
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Hero Header</label>
                                        <input type="text" value={currentService.heroTitle || ''} onChange={(e) => setCurrentService({ ...currentService, heroTitle: e.target.value })} className="w-full px-4 py-4 bg-gray-900 text-white rounded-xl outline-none text-2xl font-bold" placeholder="Visual Intelligence at Scale" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Small Subtitle</label>
                                        <input type="text" value={currentService.heroSubtitle || ''} onChange={(e) => setCurrentService({ ...currentService, heroSubtitle: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Hero Text Body</label>
                                        <textarea value={currentService.heroDescription || ''} onChange={(e) => setCurrentService({ ...currentService, heroDescription: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm min-h-[100px]" />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Visual Content</label>
                                    <div className="relative aspect-video rounded-2xl bg-gray-100 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden hover:border-indigo-400 transition-colors">
                                        {currentService.imageUrl ? <img src={currentService.imageUrl} className="w-full h-full object-cover" /> : <Upload className="w-8 h-8 text-gray-400" />}
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'image')} />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Video Demonstration URL</label>
                                        <input type="url" value={currentService.videoUrl || ''} onChange={(e) => setCurrentService({ ...currentService, videoUrl: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm font-mono" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'cards' && (
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-full flex justify-end">
                                    <button onClick={addInfoCard} className="flex items-center gap-2 text-indigo-600 text-xs font-bold hover:bg-indigo-50 px-3 py-1 rounded-lg transition-all">
                                        <Plus className="w-4 h-4" /> Add Feature Card
                                    </button>
                                </div>
                                {currentService.infoCards?.map((card, idx) => (
                                    <div key={idx} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative group animate-in slide-in-from-bottom duration-300">
                                        <button onClick={() => removeInfoCard(idx)} className="absolute top-4 right-4 text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="relative aspect-square rounded-xl bg-gray-200 border border-gray-300 flex items-center justify-center overflow-hidden">
                                                {card.imageUrl ? <img src={card.imageUrl} className="w-full h-full object-cover" /> : <Upload className="w-4 h-4 text-gray-400" />}
                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'card', { index: idx })} />
                                            </div>
                                            <div className="col-span-2 space-y-3">
                                                <input type="text" value={card.tag} onChange={(e) => updateInfoCard(idx, 'tag', e.target.value)} className="w-full px-3 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold uppercase tracking-widest text-indigo-500" placeholder="TAG" />
                                                <input type="text" value={card.title} onChange={(e) => updateInfoCard(idx, 'title', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold" placeholder="Card Title" />
                                                <textarea value={card.description} onChange={(e) => updateInfoCard(idx, 'description', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[10px] min-h-[60px]" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'content' && (
                            <div className="space-y-6">
                                <div className="flex gap-4 mb-4">
                                    <button onClick={() => addContentBlock('heading')} className="flex-1 py-4 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center gap-2 hover:bg-gray-50 text-gray-400 hover:text-indigo-600 transition-all">
                                        <Type className="w-5 h-5" /> <span className="text-[10px] font-black uppercase">Add Heading</span>
                                    </button>
                                    <button onClick={() => addContentBlock('text')} className="flex-1 py-4 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center gap-2 hover:bg-gray-50 text-gray-400 hover:text-indigo-600 transition-all">
                                        <Type className="w-5 h-5" /> <span className="text-[10px] font-black uppercase">Add Text</span>
                                    </button>
                                    <button onClick={() => addContentBlock('image')} className="flex-1 py-4 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center gap-2 hover:bg-gray-50 text-gray-400 hover:text-indigo-600 transition-all">
                                        <ImageIcon className="w-5 h-5" /> <span className="text-[10px] font-black uppercase">Add Image</span>
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {currentService.contentBlocks?.map((block, idx) => (
                                        <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 relative group hover:shadow-md transition-all">
                                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => moveBlock(idx, 'up')} className="p-1 bg-white border border-gray-200 rounded-lg shadow-sm"><ArrowUp className="w-3 h-3" /></button>
                                                <button onClick={() => moveBlock(idx, 'down')} className="p-1 bg-white border border-gray-200 rounded-lg shadow-sm"><ArrowDown className="w-3 h-3" /></button>
                                            </div>
                                            <button onClick={() => removeContentBlock(idx)} className="absolute top-4 right-4 text-red-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                                            <div className="flex gap-6 items-start">
                                                <div className="w-24 shrink-0"><span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">{block.type}</span></div>
                                                <div className="flex-1 space-y-4">
                                                    {block.type === 'image' ? (
                                                        <div className="relative aspect-video rounded-xl bg-gray-100 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                                                            {block.imageUrl ? <img src={block.imageUrl} className="w-full h-full object-cover" /> : <Upload className="w-6 h-6 text-gray-400" />}
                                                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'block', { index: idx })} />
                                                        </div>
                                                    ) : (
                                                        <textarea value={block.content} onChange={(e) => updateContentBlock(idx, 'content', e.target.value)} className={`w-full p-4 bg-gray-50 rounded-xl outline-none min-h-[100px] ${block.type === 'heading' ? 'text-2xl font-bold' : 'text-sm'}`} placeholder="Enter content..." />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                        <button onClick={() => { resetForm(); setIsEditing(false); }} className="px-8 py-3 bg-white border border-gray-200 text-gray-500 font-bold rounded-xl hover:bg-gray-100 transition-all text-xs uppercase tracking-widest">Cancel</button>
                        <button onClick={handleSave} className="px-10 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 flex items-center gap-2">
                            <Check className="w-4 h-4" /> Deploy Enriched Service
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div key={service.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-500">
                            <div className="aspect-video relative overflow-hidden bg-gray-100">
                                {service.imageUrl ? <img src={service.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><ImageIcon className="w-8 h-8" /></div>}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 duration-500">
                                    <button onClick={() => { setCurrentService(service); setIsEditing(true); }} className="p-3 bg-white rounded-full text-indigo-600 hover:scale-110 shadow-xl"><Edit2 className="w-4 h-4" /></button>
                                    <button onClick={() => handleDelete(service.id)} className="p-3 bg-white rounded-full text-red-600 hover:scale-110 shadow-xl"><Trash2 className="w-4 h-4" /></button>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{service.title}</h4>
                                    <span className="text-[8px] font-black text-gray-300 uppercase">/{service.slug}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 font-medium italic line-clamp-2 mb-4">{service.description}</p>
                                <div className="flex gap-1.5 flex-wrap">
                                    {(service.infoCards?.length || 0) > 0 && <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[8px] font-bold">ENRICHED</span>}
                                    <span className="px-2 py-0.5 bg-gray-50 text-gray-500 rounded text-[8px] font-bold uppercase tracking-tighter">{service.contentBlocks?.length || 0} BLOCKS</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
