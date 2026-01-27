import Link from 'next/link';
import { Calendar, User, ArrowRight, Tag } from 'lucide-react';
import Navbar from "@/components/nfinite/Navbar";
import Footer from "@/components/nfinite/Footer";

async function getBlogs() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';
    try {
        const res = await fetch(`${API_URL}/api/blogs`, { cache: 'no-store' });
        if (!res.ok) return [];
        const data = await res.json();
        return Array.isArray(data) ? data.filter((post: any) => post.published) : [];
    } catch (error) {
        console.error('Fetch blogs failed:', error);
        return [];
    }
}

export const metadata = {
    title: 'Alpha Blog | Insights on AI, Tech & Innovation',
    description: 'Expert perspectives on the future of technology, business automation, and digital strategy.',
};

export default async function BlogPage() {
    const posts = await getBlogs();

    return (
        <main className="min-h-screen bg-cream text-white overflow-x-hidden">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 overflow-hidden bg-cream px-4 sm:px-6 md:px-12 text-left">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-indigo-500 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-purple-500 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 w-full">
                    <div className="max-w-3xl">
                        <span className="inline-block px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest mb-6">
                            Topical Authority
                        </span>
                        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white mb-8 tracking-tight uppercase leading-[1.1] break-words">
                            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 sm:block">Innovation.</span>
                        </h1>
                        <p className="text-xl text-gray-400 font-medium leading-relaxed italic">
                            Exploring the intersection of artificial intelligence, enterprise efficiency, and the future of digital engineering.
                        </p>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="py-12 md:py-24 bg-cream overflow-hidden px-4 sm:px-6 md:px-12">
                <div className="max-w-7xl mx-auto w-full">
                    {posts.length === 0 ? (
                        <div className="text-center py-20 bg-white/5 rounded-[3rem] border border-white/10">
                            <h2 className="text-2xl font-black text-white uppercase">Coming Soon</h2>
                            <p className="text-gray-400 italic mt-2">We are currently preparing high-value content for you.</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                            {posts.map((post: any) => (
                                <Link
                                    href={`/blog/${post.slug}`}
                                    key={post.id}
                                    className="flex flex-col group"
                                >
                                    <div className="relative w-full rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-gray-100 mb-6 md:mb-8 aspect-video">
                                        {post.coverImage ? (
                                            <img
                                                src={post.coverImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-indigo-900 to-black flex items-center justify-center">
                                                <FileText className="w-16 h-16 text-white/5" />
                                            </div>
                                        )}
                                        <div className="absolute top-6 left-6">
                                            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                                {post.category || 'Technology'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex-1 space-y-4">
                                        <div className="flex items-center gap-4 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5 font-black text-indigo-600">
                                                <User className="w-3 h-3" />
                                                {post.author}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>

                                        <h2 className="text-lg md:text-2xl font-black text-white leading-tight group-hover:text-indigo-400 transition-colors uppercase break-words">
                                            {post.title}
                                        </h2>

                                        <p className="text-gray-400 font-medium leading-relaxed italic line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="pt-4 flex items-center gap-2 text-xs font-black text-white uppercase tracking-widest group-hover:gap-4 transition-all">
                                            Read Article <ArrowRight className="w-4 h-4 text-indigo-400" />
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}

function FileText({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <line x1="10" y1="9" x2="8" y2="9" />
        </svg>
    );
}
