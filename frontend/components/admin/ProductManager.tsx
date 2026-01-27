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

interface Product {
    id: string;
    name: string;
    slug: string;
    tagline: string;
    category: string;
    description: string;
    heroTitle: string;
    heroSubtitle: string;
    heroDescription: string;
    features: string[];
    imageUrl: string | null;
    imagePublicId: string | null;
    videoUrl: string | null;
    videoPublicId: string | null;
    infoCards: InfoCard[];
    contentBlocks: ContentBlock[];
    order: number;
}

export default function ProductManager() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState<'basic' | 'hero' | 'cards' | 'content'>('basic');
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({
        name: '',
        slug: '',
        tagline: '',
        category: 'Artificial Intelligence',
        description: '',
        heroTitle: '',
        heroSubtitle: '',
        heroDescription: '',
        features: [],
        infoCards: [],
        contentBlocks: [],
        order: 0,
        imageUrl: '',
        videoUrl: ''
    });
    const [featureInput, setFeatureInput] = useState('');
    const [uploading, setUploading] = useState<'image' | 'video' | 'card' | 'block' | null>(null);

    const categories = [
        "Artificial Intelligence",
        "Enterprise Resource Planning",
        "Computer Vision",
        "Software as a Service",
        "Education Technology"
    ];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch(`${API_URL}/api/products`, {
                credentials: 'include'
            });
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video' | 'card' | 'block', extraData?: any) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(type);
        try {
            const sigRes = await fetch(`${API_URL}/api/gallery/signature?folder=alpha-devs-products`, {
                credentials: 'include'
            });
            const { signature, timestamp, cloudName, apiKey } = await sigRes.json();

            const formData = new FormData();
            formData.append('file', file);
            formData.append('signature', signature);
            formData.append('timestamp', timestamp);
            formData.append('api_key', apiKey);
            formData.append('folder', 'alpha-devs-products');

            const resourceType = type === 'video' ? 'video' : 'image';
            const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (type === 'image') {
                setCurrentProduct({ ...currentProduct, imageUrl: data.secure_url, imagePublicId: data.public_id });
            } else if (type === 'video') {
                setCurrentProduct({ ...currentProduct, videoUrl: data.secure_url, videoPublicId: data.public_id });
            } else if (type === 'card') {
                const updatedCards = [...(currentProduct.infoCards || [])];
                updatedCards[extraData.index] = { ...updatedCards[extraData.index], imageUrl: data.secure_url, publicId: data.public_id };
                setCurrentProduct({ ...currentProduct, infoCards: updatedCards });
            } else if (type === 'block') {
                const updatedBlocks = [...(currentProduct.contentBlocks || [])];
                updatedBlocks[extraData.index] = { ...updatedBlocks[extraData.index], imageUrl: data.secure_url, publicId: data.public_id, content: 'Image uploaded' };
                setCurrentProduct({ ...currentProduct, contentBlocks: updatedBlocks });
            }
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(null);
        }
    };

    const handleSave = async () => {
        const method = currentProduct.id ? 'PUT' : 'POST';
        const url = currentProduct.id
            ? `${API_URL}/api/products/${currentProduct.id}`
            : `${API_URL}/api/products`;

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentProduct),
                credentials: 'include'
            });

            if (res.ok) {
                fetchProducts();
                setIsEditing(false);
                resetForm();
            }
        } catch (error) {
            console.error('Save failed');
        }
    };

    const resetForm = () => {
        setCurrentProduct({
            name: '', slug: '', tagline: '', category: 'Artificial Intelligence',
            description: '', heroTitle: '', heroSubtitle: '', heroDescription: '',
            features: [], infoCards: [], contentBlocks: [], order: 0,
            imageUrl: '', videoUrl: ''
        });
        setActiveTab('basic');
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            const res = await fetch(`${API_URL}/api/products/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (res.ok) fetchProducts();
        } catch (error) {
            console.error('Delete failed');
        }
    };

    // Info Card Management
    const addInfoCard = () => {
        const newCard: InfoCard = { title: '', description: '', tag: '', order: (currentProduct.infoCards?.length || 0) };
        setCurrentProduct({ ...currentProduct, infoCards: [...(currentProduct.infoCards || []), newCard] });
    };

    const removeInfoCard = (index: number) => {
        const cards = currentProduct.infoCards?.filter((_, i) => i !== index) || [];
        setCurrentProduct({ ...currentProduct, infoCards: cards });
    };

    const updateInfoCard = (index: number, field: keyof InfoCard, value: any) => {
        const cards = [...(currentProduct.infoCards || [])];
        cards[index] = { ...cards[index], [field]: value };
        setCurrentProduct({ ...currentProduct, infoCards: cards });
    };

    // Content Block Management
    const addContentBlock = (type: 'text' | 'image' | 'heading') => {
        const newBlock: ContentBlock = {
            type,
            content: '',
            order: (currentProduct.contentBlocks?.length || 0),
            style: type === 'text' ? { fontSize: '16px', bold: false, color: '#374151', align: 'left' } : undefined
        };
        setCurrentProduct({ ...currentProduct, contentBlocks: [...(currentProduct.contentBlocks || []), newBlock] });
    };

    const removeContentBlock = (index: number) => {
        const blocks = currentProduct.contentBlocks?.filter((_, i) => i !== index) || [];
        setCurrentProduct({ ...currentProduct, contentBlocks: blocks });
    };

    const updateContentBlock = (index: number, field: string, value: any) => {
        const blocks = [...(currentProduct.contentBlocks || [])];
        if (field.startsWith('style.')) {
            const styleField = field.split('.')[1];
            blocks[index].style = { ...blocks[index].style, [styleField]: value };
        } else {
            (blocks[index] as any)[field] = value;
        }
        setCurrentProduct({ ...currentProduct, contentBlocks: blocks });
    };

    const moveBlock = (index: number, direction: 'up' | 'down') => {
        const blocks = [...(currentProduct.contentBlocks || [])];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= blocks.length) return;
        [blocks[index], blocks[targetIndex]] = [blocks[targetIndex], blocks[index]];
        setCurrentProduct({ ...currentProduct, contentBlocks: blocks });
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Product Portfolio</h2>
                    <p className="text-gray-500 text-sm">Manage Alpha-Devs high-performance solutions and detailed landing pages.</p>
                </div>
                {!isEditing && (
                    <button
                        onClick={() => { resetForm(); setIsEditing(true); }}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                    >
                        <Plus className="w-4 h-4" />
                        Create Product
                    </button>
                )}
            </div>

            {isEditing ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-5xl mx-auto">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-100 bg-gray-50/50">
                        <button onClick={() => setActiveTab('basic')} className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${activeTab === 'basic' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-gray-400'}`}>
                            <Layout className="w-4 h-4" /> Basic Info
                        </button>
                        <button onClick={() => setActiveTab('hero')} className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${activeTab === 'hero' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-gray-400'}`}>
                            <ImageIcon className="w-4 h-4" /> Hero Content
                        </button>
                        <button onClick={() => setActiveTab('cards')} className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${activeTab === 'cards' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-gray-400'}`}>
                            <Info className="w-4 h-4" /> Info Cards
                        </button>
                        <button onClick={() => setActiveTab('content')} className={`px-6 py-4 text-xs font-bold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 ${activeTab === 'content' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-gray-400'}`}>
                            <Type className="w-4 h-4" /> Rich Content
                        </button>
                    </div>

                    <div className="p-8">
                        {/* Basic Info Tab */}
                        {activeTab === 'basic' && (
                            <div className="grid grid-cols-2 gap-8 animate-in fade-in duration-300">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Internal Name</label>
                                        <input type="text" value={currentProduct.name} onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-black" placeholder="e.g., Alief Wellness" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">URL Slug</label>
                                        <input type="text" value={currentProduct.slug} onChange={(e) => setCurrentProduct({ ...currentProduct, slug: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-mono text-black" placeholder="alief-wellness (auto-generated if empty)" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Category</label>
                                        <select value={currentProduct.category} onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm text-black">
                                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Quick Tagline</label>
                                        <input type="text" value={currentProduct.tagline} onChange={(e) => setCurrentProduct({ ...currentProduct, tagline: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold text-black" placeholder="e.g., Counseling & Therapy Services" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Brief Summary</label>
                                        <textarea value={currentProduct.description} onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm min-h-[140px] text-black" />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Product Card Image</label>
                                        <div className="relative h-36 rounded-2xl bg-gray-100 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden hover:border-indigo-400 transition-colors group">
                                            {currentProduct.imageUrl ? (
                                                <img src={currentProduct.imageUrl} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="text-center">
                                                    {uploading === 'image' ? <Loader2 className="animate-spin w-8 h-8 text-indigo-500 mx-auto" /> : <Upload className="w-8 h-8 text-gray-400 mx-auto" />}
                                                    <span className="text-[10px] font-bold text-gray-400 uppercase mt-2 block">Upload Card Image</span>
                                                </div>
                                            )}
                                            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'image')} />
                                        </div>
                                        <p className="text-[10px] text-gray-400 mt-2">Used on the Products page cards and preview tiles.</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Hero Content Tab */}
                        {activeTab === 'hero' && (
                            <div className="space-y-8 animate-in slide-in-from-right duration-300">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Hero Main Title (Large)</label>
                                            <input type="text" value={currentProduct.heroTitle || ''} onChange={(e) => setCurrentProduct({ ...currentProduct, heroTitle: e.target.value })} className="w-full px-4 py-4 bg-gray-900 text-white rounded-xl outline-none text-2xl font-bold" placeholder="Counseling and Therapy services" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Hero Small Subtitle</label>
                                            <input type="text" value={currentProduct.heroSubtitle || ''} onChange={(e) => setCurrentProduct({ ...currentProduct, heroSubtitle: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm text-black" placeholder="Alief" />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Hero Description</label>
                                            <textarea value={currentProduct.heroDescription || ''} onChange={(e) => setCurrentProduct({ ...currentProduct, heroDescription: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-sm min-h-[100px] text-black" placeholder="Committed to providing a safe and nurturing space for you." />
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Hero/Preview Media</label>
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="relative aspect-video rounded-2xl bg-gray-100 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden hover:border-indigo-400 transition-colors group">
                                                {currentProduct.imageUrl ? (
                                                    <img src={currentProduct.imageUrl} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="text-center">
                                                        {uploading === 'image' ? <Loader2 className="animate-spin w-8 h-8 text-indigo-500 mx-auto" /> : <Upload className="w-8 h-8 text-gray-400 mx-auto" />}
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase mt-2 block">Upload Hero Image</span>
                                                    </div>
                                                )}
                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'image')} />
                                            </div>
                                            <div className="relative p-6 rounded-2xl bg-gray-50 border border-gray-200 flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-gray-200 flex items-center justify-center">
                                                    <Video className="w-6 h-6 text-gray-400" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-xs font-bold uppercase tracking-tight">Product Demo Video</p>
                                                    <p className="text-[10px] text-gray-400 italic">{currentProduct.videoUrl ? 'Video Ready' : 'Choose a file...'}</p>
                                                </div>
                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'video')} accept="video/*" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Info Cards Tab */}
                        {activeTab === 'cards' && (
                            <div className="space-y-6 animate-in slide-in-from-right duration-300">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">Feature Grid Cards</h4>
                                    <button onClick={addInfoCard} className="flex items-center gap-2 text-indigo-600 text-xs font-bold hover:text-indigo-700">
                                        <Plus className="w-4 h-4" /> Add Card
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {currentProduct.infoCards?.map((card, idx) => (
                                        <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 relative group">
                                            <button onClick={() => removeInfoCard(idx)} className="absolute top-4 right-4 p-2 text-red-400 hover:text-red-600 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                            <div className="grid grid-cols-3 gap-4">
                                                <div className="relative aspect-square rounded-xl bg-gray-200 border border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer">
                                                    {card.imageUrl ? <img src={card.imageUrl} className="w-full h-full object-cover" /> : <Upload className="w-4 h-4 text-gray-400" />}
                                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'card', { index: idx })} />
                                                </div>
                                                <div className="col-span-2 space-y-3">
                                                    <input type="text" value={card.tag} onChange={(e) => updateInfoCard(idx, 'tag', e.target.value)} className="w-full px-3 py-1 bg-white border border-gray-200 rounded-lg text-[10px] font-bold uppercase tracking-widest text-indigo-500 outline-none text-black" placeholder="TAG (e.g. 19-60)" />
                                                    <input type="text" value={card.title} onChange={(e) => updateInfoCard(idx, 'title', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold outline-none text-black" placeholder="Card Title" />
                                                    <textarea value={card.description} onChange={(e) => updateInfoCard(idx, 'description', e.target.value)} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-lg text-[10px] outline-none min-h-[60px] text-black" placeholder="Brief description..." />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {(!currentProduct.infoCards || currentProduct.infoCards.length === 0) && (
                                        <div className="col-span-full py-12 border-2 border-dashed border-gray-100 rounded-3xl text-center">
                                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">No cards added yet. Click &quot;Add Card&quot; to begin.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Rich Content Tab */}
                        {activeTab === 'content' && (
                            <div className="space-y-6 animate-in slide-in-from-right duration-300">
                                <div className="flex items-center gap-4 mb-8">
                                    <button onClick={() => addContentBlock('heading')} className="flex-1 py-4 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center gap-2 hover:border-indigo-400 hover:bg-gray-50 transition-all text-gray-400 hover:text-indigo-600">
                                        <Type className="w-5 h-5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Add Heading</span>
                                    </button>
                                    <button onClick={() => addContentBlock('text')} className="flex-1 py-4 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center gap-2 hover:border-indigo-400 hover:bg-gray-50 transition-all text-gray-400 hover:text-indigo-600">
                                        <Type className="w-5 h-5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Add Paragraph</span>
                                    </button>
                                    <button onClick={() => addContentBlock('image')} className="flex-1 py-4 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center gap-2 hover:border-indigo-400 hover:bg-gray-50 transition-all text-gray-400 hover:text-indigo-600">
                                        <ImageIcon className="w-5 h-5" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Add Image</span>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {currentProduct.contentBlocks?.map((block, idx) => (
                                        <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 relative group transition-all hover:shadow-md">
                                            <div className="absolute -left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => moveBlock(idx, 'up')} className="p-1 bg-white border border-gray-200 rounded-lg shadow-sm hover:text-indigo-600"><ArrowUp className="w-3 h-3" /></button>
                                                <button onClick={() => moveBlock(idx, 'down')} className="p-1 bg-white border border-gray-200 rounded-lg shadow-sm hover:text-indigo-600"><ArrowDown className="w-3 h-3" /></button>
                                            </div>
                                            <button onClick={() => removeContentBlock(idx)} className="absolute top-4 right-4 text-red-300 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>

                                            <div className="flex gap-6 items-start">
                                                <div className="w-24 shrink-0">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300">{block.type}</span>
                                                </div>
                                                <div className="flex-1 space-y-4">
                                                    {block.type === 'image' ? (
                                                        <div className="relative aspect-video rounded-xl bg-gray-100 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                                                            {block.imageUrl ? <img src={block.imageUrl} className="w-full h-full object-cover" /> : <Upload className="w-6 h-6 text-gray-400" />}
                                                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileUpload(e, 'block', { index: idx })} />
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <div className="flex gap-4 mb-2">
                                                                <input type="text" value={block.style?.fontSize} onChange={(e) => updateContentBlock(idx, 'style.fontSize', e.target.value)} className="w-20 px-2 py-1 text-[10px] border border-gray-100 rounded bg-gray-50 text-black" placeholder="Size (px)" />
                                                                <button onClick={() => updateContentBlock(idx, 'style.bold', !block.style?.bold)} className={`px-2 py-1 text-[10px] font-bold border rounded ${block.style?.bold ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 text-gray-400 border-gray-100'}`}>B</button>
                                                                <input type="color" value={block.style?.color || '#374151'} onChange={(e) => updateContentBlock(idx, 'style.color', e.target.value)} className="w-8 h-6 border-none bg-transparent cursor-pointer" />
                                                            </div>
                                                            <textarea
                                                                value={block.content}
                                                                onChange={(e) => updateContentBlock(idx, 'content', e.target.value)}
                                                                className={`w-full p-4 bg-gray-50 border-none rounded-xl outline-none min-h-[100px] text-black ${block.type === 'heading' ? 'text-2xl font-bold' : 'text-sm'}`}
                                                                style={{
                                                                    fontSize: block.style?.fontSize,
                                                                    fontWeight: block.style?.bold ? 'bold' : 'normal',
                                                                    color: block.style?.color
                                                                }}
                                                                placeholder={block.type === 'heading' ? 'Enter headline...' : 'Enter paragraph text...'}
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
                        <button onClick={() => { resetForm(); setIsEditing(false); }} className="px-8 py-3 bg-white border border-gray-200 text-gray-500 font-bold rounded-xl hover:bg-gray-100 transition-all text-xs uppercase tracking-widest">Cancel</button>
                        <button onClick={handleSave} className="px-10 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 flex items-center gap-2">
                            <Check className="w-4 h-4" /> Save Comprehensive Product
                        </button>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {loading ? (
                        <div className="col-span-full py-20 flex flex-col items-center">
                            <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-4" />
                            <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-xs">Loading Portfolio...</p>
                        </div>
                    ) : products.map((product) => (
                        <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-500">
                            <div className="aspect-video relative overflow-hidden bg-gray-100">
                                {product.imageUrl ? (
                                    <img src={product.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                                        <ImageIcon className="w-8 h-8" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm text-indigo-600 border border-indigo-100">
                                        {product.category}
                                    </span>
                                </div>
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 duration-500">
                                    <button
                                        onClick={() => { setCurrentProduct(product); setIsEditing(true); }}
                                        className="p-3 bg-white rounded-full text-indigo-600 hover:scale-110 transition-transform shadow-xl"
                                    >
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="p-3 bg-white rounded-full text-red-600 hover:scale-110 transition-transform shadow-xl"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight leading-none">{product.name}</h4>
                                    <span className="text-[8px] font-black text-gray-300 uppercase">/{product.slug}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 font-medium italic line-clamp-1 mb-4">{product.tagline}</p>
                                <div className="flex gap-1.5 overflow-hidden">
                                    {product.infoCards?.length > 0 && (
                                        <div className="flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-md text-[8px] font-bold">
                                            <Info className="w-2 h-2" /> ENRICHED
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1 px-2 py-0.5 bg-gray-50 text-gray-500 rounded-md text-[8px] font-bold uppercase tracking-tighter">
                                        {product.contentBlocks?.length || 0} BLOCKS
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    {!loading && products.length === 0 && (
                        <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                            <Layout className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">No products in your portfolio yet.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
