'use client';

import { useState, useEffect } from 'react';

interface Service {
    id: string;
    title: string;
    description: string;
    keywords: string[];
    videoUrl: string | null;
    order: number;
}

export default function ServicesManager() {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        keywords: '',
        videoUrl: '',
        order: 0
    });

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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
            setIsLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            // 1. Get Signature
            const sigRes = await fetch(`${API_URL}/api/gallery/signature`);
            const { signature, timestamp, cloudName, apiKey } = await sigRes.json();

            // 2. Upload to Cloudinary
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);
            uploadFormData.append('api_key', apiKey);
            uploadFormData.append('timestamp', timestamp.toString());
            uploadFormData.append('signature', signature);
            uploadFormData.append('folder', 'alpha-devs-services');

            const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
                method: 'POST',
                body: uploadFormData
            });
            const uploadData = await uploadRes.json();

            if (uploadData.error) throw new Error(uploadData.error.message);

            // 3. Set URL in form
            setFormData(prev => ({ ...prev, videoUrl: uploadData.secure_url }));
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
            keywords: formData.keywords.split(',').map(k => k.trim()).filter(k => k),
            videoUrl: formData.videoUrl || null // Handle empty string as null
        };

        try {
            const url = editingService
                ? `${API_URL}/api/services/${editingService.id}`
                : `${API_URL}/api/services`;

            const method = editingService ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                fetchServices();
                closeModal();
            }
        } catch (error) {
            console.error('Failed to save service:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return;
        try {
            await fetch(`${API_URL}/api/services/${id}`, { method: 'DELETE' });
            fetchServices();
        } catch (error) {
            console.error('Failed to delete service:', error);
        }
    };

    const openModal = (service?: Service) => {
        if (service) {
            setEditingService(service);
            setFormData({
                title: service.title,
                description: service.description || '',
                keywords: service.keywords.join(', '),
                videoUrl: service.videoUrl || '',
                order: service.order
            });
        } else {
            setEditingService(null);
            setFormData({ title: '', description: '', keywords: '', videoUrl: '', order: 0 });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingService(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Services Management</h2>
                <button
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Add Service
                </button>
            </div>

            {isLoading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="grid gap-6">
                    {services.map((service) => (
                        <div key={service.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm flex items-start justify-between group hover:shadow-md transition-all">
                            <div className="flex gap-4">
                                <div className="h-24 w-40 bg-gray-100 rounded-lg overflow-hidden relative flex-shrink-0">
                                    {service.videoUrl ? (
                                        <video src={service.videoUrl} className="w-full h-full object-cover" muted />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-400">
                                            No Video
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{service.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{service.description}</p>
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {service.keywords.map((kw, i) => (
                                            <span key={i} className="px-2 py-1 text-xs font-medium bg-indigo-50 text-indigo-700 rounded-md dark:bg-indigo-900/30 dark:text-indigo-300">
                                                {kw}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => openModal(service)} className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(service.id)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
                                {editingService ? 'Edit Service' : 'Add New Service'}
                            </h3>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                <textarea
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    rows={3}
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Keywords (comma separated)</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    placeholder="AI, ML, Automation"
                                    value={formData.keywords}
                                    onChange={e => setFormData({ ...formData, keywords: e.target.value })}
                                />
                            </div>

                            {/* Video Section */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Video (Optional)</label>

                                {/* Upload Button */}
                                <div className="flex items-center gap-3">
                                    <label className={`flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer border border-gray-300 dark:border-gray-600 ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                                        <span>{isUploading ? 'Uploading...' : 'Upload Video'}</span>
                                        <input type="file" className="hidden" onChange={handleFileUpload} accept="video/*" />
                                    </label>
                                    <span className="text-xs text-gray-500">Max 100MB</span>
                                </div>

                                <div className="relative">
                                    <input
                                        type="url"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none pl-16"
                                        placeholder="https://..."
                                        value={formData.videoUrl}
                                        onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
                                    />
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-sm">URL:</span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Order Priority</label>
                                <input
                                    type="number"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                    value={formData.order}
                                    onChange={e => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                />
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
                                    {editingService ? 'Save Changes' : 'Create Service'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
