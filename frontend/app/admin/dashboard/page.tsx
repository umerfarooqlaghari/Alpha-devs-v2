'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../hooks/useAuth';
import ServicesManager from '../../../components/admin/ServicesManager';
import GalleryTab from '../../../components/admin/GalleryTab';
import TestimonialsManager from '../../../components/admin/TestimonialsManager';
import ProductManager from '../../../components/admin/ProductManager';
import ContactSubmissionsManager from '../../../components/admin/ContactSubmissionsManager';
import MediaContentManager from '../../../components/admin/MediaContentManager';

export default function DashboardPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'gallery' | 'testimonials' | 'products' | 'forms' | 'media'>('overview');

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

    const renderContent = () => {
        switch (activeTab) {
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
            default:
                return (
                    <div className="p-6">
                        <h2 className="text-xl font-bold mb-4">Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                                <p className="text-2xl font-bold text-gray-900 mt-2">1,234</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-gray-500 text-sm font-medium">Active Services</h3>
                                <p className="text-2xl font-bold text-gray-900 mt-2">9</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h3 className="text-gray-500 text-sm font-medium">Media Gallery</h3>
                                <p className="text-2xl font-bold text-gray-900 mt-2">42</p>
                            </div>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
                <div className="h-16 flex items-center px-6 border-b border-gray-200">
                    <span className="text-xl font-bold text-indigo-600">Alpha Admin</span>
                </div>
                <div className="p-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'services' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Services
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'products' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Our Products
                    </button>
                    <button
                        onClick={() => setActiveTab('testimonials')}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'testimonials' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Client Success
                    </button>
                    <button
                        onClick={() => setActiveTab('gallery')}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'gallery' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Media Gallery
                    </button>
                    <button
                        onClick={() => setActiveTab('media')}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'media' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Media Content
                    </button>
                    <button
                        onClick={() => setActiveTab('forms')}
                        className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === 'forms' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        Forms & Inquiries
                    </button>
                </div>
                <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                            {user.name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{user.name || 'User'}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
                <header className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4">
                    <span className="font-bold text-indigo-600">Alpha Admin</span>
                    <button onClick={logout} className="text-sm text-red-600">Logout</button>
                </header>
                <main className="h-[calc(100vh-4rem)] overflow-auto bg-gray-50 p-8">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
}
