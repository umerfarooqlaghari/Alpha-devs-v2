'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import ServicesManager from '../../../components/admin/ServicesManager';
import GalleryTab from '../../../components/admin/GalleryTab';
import TestimonialsManager from '../../../components/admin/TestimonialsManager';
import ProductManager from '../../../components/admin/ProductManager';
import ContactSubmissionsManager from '../../../components/admin/ContactSubmissionsManager';
import MediaContentManager from '@/components/admin/MediaContentManager';
import OptimizationManager from '@/components/admin/OptimizationManager';
import BlogManager from '@/components/admin/BlogManager';
import FAQManager from '@/components/admin/FAQManager';
import AnalyticsManager from '@/components/admin/AnalyticsManager';
import {
    LayoutDashboard,
    Briefcase,
    Image as ImageIcon,
    MessageSquare,
    FileText,
    Globe,
    LogOut,
    PlusCircle,
    Package,
    Search,
    HelpCircle,
    BarChart3
} from 'lucide-react';

export default function DashboardPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('analytics');

    useEffect(() => {
        if (!loading && !user) {
            router.push('/admin/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="flex h-screen items-center justify-center bg-gray-900">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
            </div>
        );
    }

    const tabs = [
        { id: 'analytics', name: 'Real-time Analytics', icon: BarChart3 },
        { id: 'blogs', name: 'Blog Posts', icon: FileText },
        { id: 'faqs', name: 'FAQs', icon: HelpCircle },
        { id: 'optimization', name: 'SEO & AEO', icon: Globe },
        { id: 'services', name: 'Services', icon: Briefcase },
        { id: 'products', name: 'Products', icon: Package },
        { id: 'gallery', name: 'Gallery', icon: ImageIcon },
        { id: 'testimonials', name: 'Client Success', icon: MessageSquare },
        { id: 'media', name: 'Media Content', icon: Search },
        { id: 'forms', name: 'Forms & Inquiries', icon: PlusCircle },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'analytics':
                return <AnalyticsManager />;
            case 'blogs':
                return <BlogManager />;
            case 'faqs':
                return <FAQManager />;
            case 'services':
                return <ServicesManager />;
            case 'gallery':
                return <GalleryTab />;
            case 'testimonials':
                return <TestimonialsManager />;
            case 'products':
                return <ProductManager />;
            case 'forms':
                return <ContactSubmissionsManager />;
            case 'media':
                return <MediaContentManager />;
            case 'optimization':
                return <OptimizationManager />;
            default:
                return (
                    <div className="flex flex-col items-center justify-center h-[600px] text-gray-500">
                        <LayoutDashboard className="w-16 h-16 mb-4 opacity-20" />
                        <p className="text-xl font-bold uppercase tracking-widest">Select a module to manage</p>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:block relative">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <span className="text-xl font-bold text-indigo-600">Alpha Admin</span>
                </div>
                <div className="p-4 space-y-1">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id
                                    ? 'bg-indigo-50 text-indigo-600 shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-50'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.name}
                            </button>
                        );
                    })}
                </div>
                <div className="absolute bottom-0 w-full p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold shadow-inner">
                            {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-black text-gray-900 truncate uppercase">{user.name || 'Admin'}</p>
                            <p className="text-[10px] text-gray-500 truncate font-medium">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100 transition-all active:scale-95"
                    >
                        <LogOut className="w-4 h-4" />
                        LOGOUT
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <header className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
                    <span className="font-bold text-indigo-600">Alpha Admin</span>
                    <button onClick={logout} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <LogOut className="w-5 h-5" />
                    </button>
                </header>
                <main className="flex-1 overflow-auto bg-gray-50 scrollbar-hide">
                    <div className="p-8">
                        {renderTabContent()}
                    </div>
                </main>
            </div>
        </div>
    );
}
