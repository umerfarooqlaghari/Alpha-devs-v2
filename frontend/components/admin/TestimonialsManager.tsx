
'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
    id: string;
    author: string;
    role: string;
    company: string;
    quote: string;
    image: string | null;
}

export default function TestimonialsManager() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        author: '',
        role: '',
        company: '',
        quote: '',
        image: ''
    });

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await fetch(`${API_URL}/api/testimonials`);
            if (res.ok) {
                const data = await res.json();
                setTestimonials(data);
            }
        } catch (error) {
            console.error('Failed to fetch testimonials:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            // 1. Get Signature
            const sigRes = await fetch(`${API_URL}/api/gallery/signature?folder=alpha-devs-testimonials`);
            const { signature, timestamp, cloudName, apiKey } = await sigRes.json();

            // 2. Upload to Cloudinary
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);
            uploadFormData.append('api_key', apiKey);
            uploadFormData.append('timestamp', timestamp.toString());
            uploadFormData.append('signature', signature);
            uploadFormData.append('folder', 'alpha-devs-testimonials');

            const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: uploadFormData
            });
            const uploadData = await uploadRes.json();

            if (uploadData.error) throw new Error(uploadData.error.message);

            // 3. Set URL in form
            setFormData(prev => ({ ...prev, image: uploadData.secure_url }));
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = {
            ...formData,
            image: formData.image || null
        };

        try {
            const url = editingTestimonial
                ? `${API_URL}/api/testimonials/${editingTestimonial.id}`
                : `${API_URL}/api/testimonials`;

            const method = editingTestimonial ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                fetchTestimonials();
                closeModal();
            }
        } catch (error) {
            console.error('Failed to save testimonial:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;
        try {
            await fetch(`${API_URL}/api/testimonials/${id}`, { method: 'DELETE' });
            fetchTestimonials();
        } catch (error) {
            console.error('Failed to delete testimonial:', error);
        }
    };

    const openModal = (testimonial?: Testimonial) => {
        if (testimonial) {
            setEditingTestimonial(testimonial);
            setFormData({
                author: testimonial.author,
                role: testimonial.role,
                company: testimonial.company,
                quote: testimonial.quote,
                image: testimonial.image || ''
            });
        } else {
            setEditingTestimonial(null);
            setFormData({ author: '', role: '', company: '', quote: '', image: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingTestimonial(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Client Success Stories</h2>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Add Testimonial
                </button>
            </div>

            {isLoading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="grid gap-6">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-start justify-between group hover:shadow-md transition-all">
                            <div className="flex gap-4">
                                <div className="h-16 w-16 bg-gray-100 rounded-full overflow-hidden relative flex-shrink-0">
                                    {t.image ? (
                                        <img src={t.image} className="w-full h-full object-cover" alt={t.author} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400 text-xs">No Img</div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{t.author}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.role} @ {t.company}</p>
                                    <blockquote className="mt-3 text-gray-600 dark:text-gray-300 italic border-l-2 border-indigo-200 pl-3">
                                        &quot;{t.quote}&quot;
                                    </blockquote>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => openModal(t)} className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(t.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Author Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none text-black"
                                        value={formData.author}
                                        onChange={e => setFormData({ ...formData, author: e.target.value })}
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none text-black"
                                        value={formData.role}
                                        onChange={e => setFormData({ ...formData, role: e.target.value })}
                                        placeholder="CTO"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Company</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formData.company}
                                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                                    placeholder="Acme Corp"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Quote</label>
                                <textarea
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none text-black"
                                    rows={4}
                                    required
                                    value={formData.quote}
                                    onChange={e => setFormData({ ...formData, quote: e.target.value })}
                                    placeholder="They transformed our business..."
                                />
                            </div>

                            {/* Image Upload */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Author Photo (Optional)</label>
                                <div className="flex items-center gap-3">
                                    <label className={`flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer border border-gray-300 dark:border-gray-600 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <span>{isUploading ? 'Uploading...' : 'Upload Photo'}</span>
                                        <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*" />
                                    </label>
                                </div>
                                {formData.image && (
                                    <div className="mt-2 h-16 w-16 rounded-full overflow-hidden border border-gray-200">
                                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUploading}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                                >
                                    {editingTestimonial ? 'Save Changes' : 'Add Testimonial'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
