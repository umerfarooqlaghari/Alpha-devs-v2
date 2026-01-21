import { useState, useEffect } from 'react';
// import { Trash2, Search, Upload, Copy } from 'lucide-react';

interface Media {
    id: string;
    publicId: string;
    url: string;
    format: string;
    folder: string;
}

export default function GalleryTab() {
    const [media, setMedia] = useState<Media[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    useEffect(() => {
        fetchGallery();
    }, []);

    const fetchGallery = async () => {
        try {
            const res = await fetch(`${API_URL}/api/gallery`);
            if (res.ok) {
                const data = await res.json();
                setMedia(data);
            }
        } catch (error) {
            console.error('Failed to fetch gallery:', error);
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
            const formData = new FormData();
            formData.append('file', file);
            formData.append('api_key', apiKey);
            formData.append('timestamp', timestamp.toString());
            formData.append('signature', signature);
            formData.append('folder', 'alpha-devs-gallery');

            const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
                method: 'POST',
                body: formData
            });
            const uploadData = await uploadRes.json();

            if (uploadData.error) throw new Error(uploadData.error.message);

            // 3. Save to Backend
            await fetch(`${API_URL}/api/gallery`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    publicId: uploadData.public_id,
                    url: uploadData.secure_url,
                    format: uploadData.format,
                    width: uploadData.width,
                    height: uploadData.height,
                    size: uploadData.bytes,
                    folder: 'alpha-devs-gallery'
                })
            });

            fetchGallery();
        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this media?')) return;
        try {
            await fetch(`${API_URL}/api/gallery/${id}`, { method: 'DELETE' });
            fetchGallery();
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    const copyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        alert('URL copied to clipboard!');
    };

    const filteredMedia = media.filter(m =>
        m.publicId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Media Gallery</h2>
                <div className="flex gap-4">
                    <div className="relative">
                        {/* <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} /> */}
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
                        <input
                            type="text"
                            placeholder="Search media..."
                            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <label className={`flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
                        {/* <Upload size={20} /> */} <span className="text-lg">↑</span>
                        {isUploading ? 'Uploading...' : 'Upload Media'}
                        <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*,video/*" />
                    </label>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredMedia.map((item) => (
                        <div key={item.id} className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm aspect-square">
                            {['mp4', 'webm', 'mov'].includes(item.format) ? (
                                <video src={item.url} className="w-full h-full object-cover" muted loop onMouseOver={e => e.currentTarget.play()} onMouseOut={e => e.currentTarget.pause()} />
                            ) : (
                                <img src={item.url} alt={item.publicId} className="w-full h-full object-cover" />
                            )}

                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button onClick={() => copyUrl(item.url)} className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-sm" title="Copy URL">
                                    {/* <Copy size={20} /> */} Copy
                                </button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/80 hover:bg-red-500 text-white rounded-full backdrop-blur-sm" title="Delete">
                                    {/* <Trash2 size={20} /> */} Del
                                </button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent text-xs text-white truncate px-3 pb-3">
                                {item.publicId}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
