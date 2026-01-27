'use client';

import { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    Save,
    X,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Image as ImageIcon,
    FileText,
    Globe,
    User,
    Tag,
    Calendar
} from 'lucide-react';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    author: string;
    category: string;
    tags: string;
    published: boolean;
    metaTitle: string;
    metaDescription: string;
    createdAt: string;
}

export default function BlogManager() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState<Partial<BlogPost> | null>(null);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/blogs`);
            const data = await res.json();
            setPosts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Fetch posts error:', error);
            setStatus({ type: 'error', message: 'Failed to fetch blog posts.' });
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setCurrentPost({
            title: '',
            slug: '',
            excerpt: '',
            content: '',
            author: 'Alpha Team',
            category: 'Technology',
            published: false,
            metaTitle: '',
            metaDescription: ''
        });
        setIsEditing(true);
    };

    const handleEdit = (post: BlogPost) => {
        setCurrentPost(post);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            const res = await fetch(`${API_URL}/api/blogs/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setPosts(posts.filter(p => p.id !== id));
                setStatus({ type: 'success', message: 'Post deleted successfully.' });
            }
        } catch (error) {
            console.error('Delete error:', error);
            setStatus({ type: 'error', message: 'Failed to delete post.' });
        }
    };

    const handleSave = async () => {
        if (!currentPost?.title || !currentPost?.slug) {
            setStatus({ type: 'error', message: 'Title and Slug are required.' });
            return;
        }

        setSaving(true);
        try {
            const method = currentPost.id ? 'PUT' : 'POST';
            const url = currentPost.id ? `${API_URL}/api/blogs/${currentPost.id}` : `${API_URL}/api/blogs`;

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentPost)
            });

            if (!res.ok) throw new Error('Failed to save');

            await fetchPosts();
            setIsEditing(false);
            setStatus({ type: 'success', message: 'Blog post saved successfully!' });
        } catch (error) {
            console.error('Save error:', error);
            setStatus({ type: 'error', message: 'Failed to save blog post.' });
        } finally {
            setSaving(false);
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isEditing) {
        return (
            <div className="space-y-6 animate-in fade-in duration-500">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-gray-900 uppercase">
                        {currentPost?.id ? 'Edit Blog Post' : 'Create New Post'}
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
                            {saving ? 'SAVING...' : 'SAVE POST'}
                        </button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-xl">
                        <div className="space-y-4">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Post Title</label>
                            <input
                                type="text"
                                value={currentPost?.title || ''}
                                onChange={(e) => setCurrentPost({ ...currentPost, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-100 transition-all text-xl font-bold text-black"
                                placeholder="Enter post title..."
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Content</label>
                            <textarea
                                rows={15}
                                value={currentPost?.content || ''}
                                onChange={(e) => setCurrentPost({ ...currentPost, content: e.target.value })}
                                className="w-full px-8 py-8 rounded-[2rem] bg-gray-50 border-none focus:ring-2 focus:ring-indigo-100 transition-all font-serif leading-relaxed text-black"
                                placeholder="Write your content here..."
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Excerpt</label>
                            <textarea
                                rows={3}
                                value={currentPost?.excerpt || ''}
                                onChange={(e) => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-100 transition-all text-sm font-medium text-black"
                                placeholder="Brief summary of the post..."
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl space-y-6">
                            <h3 className="font-black text-gray-900 uppercase flex items-center gap-2">
                                <Settings className="w-4 h-4 text-indigo-600" />
                                Publishing Settings
                            </h3>

                            <div className="space-y-4">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Slug (URL Path)</label>
                                <input
                                    type="text"
                                    value={currentPost?.slug || ''}
                                    onChange={(e) => setCurrentPost({ ...currentPost, slug: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-100 text-sm font-medium text-black"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Category</label>
                                <input
                                    type="text"
                                    value={currentPost?.category || ''}
                                    onChange={(e) => setCurrentPost({ ...currentPost, category: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-100 text-sm font-medium text-black"
                                />
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
                                <input
                                    type="checkbox"
                                    checked={currentPost?.published || false}
                                    onChange={(e) => setCurrentPost({ ...currentPost, published: e.target.checked })}
                                    className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="text-sm font-bold text-gray-700">Publish Immediately</span>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl space-y-6">
                            <h3 className="font-black text-gray-900 uppercase flex items-center gap-2">
                                <Globe className="w-4 h-4 text-indigo-600" />
                                Search Optimization (SEO)
                            </h3>

                            <div className="space-y-4">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Meta Title</label>
                                <input
                                    type="text"
                                    value={currentPost?.metaTitle || ''}
                                    onChange={(e) => setCurrentPost({ ...currentPost, metaTitle: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-100 text-sm font-medium text-black"
                                />
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Meta Description</label>
                                <textarea
                                    rows={4}
                                    value={currentPost?.metaDescription || ''}
                                    onChange={(e) => setCurrentPost({ ...currentPost, metaDescription: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-indigo-100 text-sm font-medium text-black"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3 uppercase">
                        <FileText className="w-8 h-8 text-indigo-600" />
                        BLOG POSTS
                    </h1>
                    <p className="text-gray-500 font-medium italic">Create and manage content for your Topical Authority Map.</p>
                </div>

                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-full font-black text-sm hover:bg-indigo-700 transition-all shadow-lg hover:scale-105"
                >
                    <Plus className="w-5 h-5" />
                    CREATE NEW POST
                </button>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
                <Search className="w-5 h-5 text-gray-400 ml-4" />
                <input
                    type="text"
                    placeholder="Search by title or category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:ring-0 font-medium text-black"
                />
            </div>

            {loading ? (
                <div className="p-20 flex flex-col items-center justify-center">
                    <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
                    <p className="mt-4 text-gray-500 font-bold uppercase tracking-widest">Fetching Posts...</p>
                </div>
            ) : filteredPosts.length === 0 ? (
                <div className="p-20 text-center bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
                    <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                        <FileText className="w-10 h-10 text-gray-200" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 uppercase">No posts found</h3>
                    <p className="text-gray-500 mt-2 italic font-medium">Start building your authority by creating your first blog post.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post) => (
                        <div key={post.id} className="bg-white group rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col">
                            <div className="relative h-48 bg-gray-900 overflow-hidden">
                                {post.coverImage ? (
                                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                                        <FileText className="w-12 h-12 text-white/20" />
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${post.published ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'
                                        }`}>
                                        {post.published ? 'Published' : 'Draft'}
                                    </span>
                                </div>
                                <div className="absolute bottom-4 left-4">
                                    <span className="bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">
                                        {post.category || 'Technology'}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 space-y-4 flex-1">
                                <h3 className="text-xl font-black text-gray-900 leading-tight line-clamp-2 uppercase">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-500 font-medium line-clamp-3 italic">
                                    {post.excerpt || 'No excerpt provided.'}
                                </p>

                                <div className="pt-6 border-t border-gray-50 flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(post)}
                                            className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all border border-transparent hover:border-indigo-100"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
                                            className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function Settings({ className }: { className?: string }) {
    return <Globe className={className} />;
}
