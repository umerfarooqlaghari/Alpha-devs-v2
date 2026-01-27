import { ArrowLeft, Calendar, User, Clock, Share2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from "@/components/nfinite/Navbar";
import Footer from "@/components/nfinite/Footer";

async function getBlogPost(slug: string) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';
    try {
        const res = await fetch(`${API_URL}/api/blogs/${slug}`, { cache: 'no-store' });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error('Fetch blog post failed:', error);
        return null;
    }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    if (!post) return {};

    return {
        title: `${post.metaTitle || post.title} | Alpha Blog`,
        description: post.metaDescription || post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: post.coverImage ? [post.coverImage] : [],
            type: 'article',
            publishedTime: post.createdAt,
            authors: [post.author],
        }
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        notFound();
    }

    const estimatedReadTime = Math.ceil(post.content.split(' ').length / 200);

    return (
        <main className="min-h-screen bg-cream">
            <Navbar />
            <article>
                {/* Post Header */}
                <header className="relative pt-24 pb-12 md:pt-32 md:pb-16 bg-cream overflow-hidden px-4 sm:px-6 md:px-12">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.2),transparent_50%)]" />
                    </div>

                    <div className="max-w-7xl mx-auto relative z-10 w-full">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest mb-10 hover:text-indigo-300 transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Articles
                        </Link>

                        <div className="max-w-4xl">
                            <div className="flex flex-wrap items-center gap-6 text-[10px] font-black text-white/50 uppercase tracking-widest mb-8">
                                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full">
                                    {post.category || 'Technology'}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {estimatedReadTime} MIN READ
                                </span>
                            </div>

                            <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-white mb-8 leading-tight uppercase break-words">
                                {post.title}
                            </h1>

                            <div className="flex items-center gap-4 pt-8 border-t border-white/10">
                                <div className="h-12 w-12 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 font-black">
                                    {post.author[0]}
                                </div>
                                <div>
                                    <p className="text-white font-black uppercase text-sm">{post.author}</p>
                                    <p className="text-indigo-400/60 text-xs font-bold uppercase tracking-widest">Alpha Development Team</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Post Body */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-12 md:py-20 w-full overflow-hidden">
                    <div className="max-w-4xl">
                        {post.coverImage && (
                            <div className="mb-8 md:mb-16 -mt-8 md:-mt-32 relative z-20 rounded-3xl md:rounded-[3rem] overflow-hidden shadow-2xl border-4 md:border-8 border-white w-full aspect-video">
                                <img
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        )}

                        <div className="prose prose-sm sm:prose-base md:prose-xl prose-invert prose-indigo max-w-none prose-headings:font-black prose-headings:uppercase prose-p:text-gray-300 prose-p:font-medium prose-p:leading-relaxed prose-strong:text-white md:prose-2xl prose-img:rounded-[2rem] break-words">
                            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
                        </div>

                        {/* Shared Author Block / Call to Action */}
                        <div className="mt-16 md:mt-24 p-6 md:p-12 bg-white/5 rounded-3xl md:rounded-[3rem] border border-white/10 flex flex-col md:flex-row items-center gap-6 md:gap-10 text-white">
                            <div className="h-24 w-24 rounded-full bg-indigo-600 flex flex-shrink-0 items-center justify-center text-4xl text-white font-black">
                                {post.author[0]}
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-black text-white uppercase mb-2">Written by {post.author}</h3>
                                <p className="text-gray-400 font-medium italic mb-6">Expert strategist focusing on AI integration and enterprise-scale digital architecture.</p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                    <Link
                                        href="/contact"
                                        className="px-8 py-3 bg-indigo-600 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg"
                                    >
                                        Work with us
                                    </Link>
                                    <button className="px-8 py-3 border border-white/10 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-2">
                                        <Share2 className="w-4 h-4" /> Share Article
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            <Footer />
        </main>
    );
}
