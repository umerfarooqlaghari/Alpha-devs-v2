'use client';

import { useState, useEffect } from 'react';
import {
    BarChart3,
    MousePointer2,
    Eye,
    Globe2,
    Clock,
    LayoutDashboard,
    ExternalLink,
    TrendingUp,
    Map
} from 'lucide-react';

interface Stats {
    summary: {
        totalViews: number;
        totalClicks: number;
    };
    pageViews: Array<{ key: string, count: number }>;
    clickCounts: Array<{ key: string, count: number }>;
    recentEvents: Array<{
        id: string,
        type: string,
        target: string,
        ip: string,
        browser: string,
        timestamp: string
    }>;
}

export default function AnalyticsManager() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${API_URL}/api/analytics/stats`);
                const data = await res.json();
                setStats(data);
            } catch (error) {
                console.error('Error fetching analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
        const interval = setInterval(fetchStats, 300000); // Refresh every 5 minutes
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[400px]">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
            </div>
        );
    }

    const maxPageView = Math.max(...(stats?.pageViews.map(v => v.count) || [1]));
    const maxClick = Math.max(...(stats?.clickCounts.map(v => v.count) || [1]));

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3 uppercase">
                    <BarChart3 className="w-8 h-8 text-indigo-600" />
                    Real-time Analytics
                </h1>
                <p className="text-gray-500 font-medium italic">Track user engagement, content performance, and interactions.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <Eye className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Page Views</p>
                        <p className="text-2xl font-black text-gray-900">{stats?.summary.totalViews.toLocaleString()}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] shadow-xl border border-gray-100 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                        <MousePointer2 className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Total Interactions</p>
                        <p className="text-2xl font-black text-gray-900">{stats?.summary.totalClicks.toLocaleString()}</p>
                    </div>
                </div>
                <div className="bg-indigo-600 p-6 rounded-[2rem] shadow-xl flex items-center justify-between text-white group cursor-pointer" onClick={() => window.open('https://clarity.microsoft.com/', '_blank')}>
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                            <Map className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-black opacity-80 uppercase tracking-widest text-white">Heatmaps & Replays</p>
                            <p className="text-xl font-black">Microsoft Clarity</p>
                        </div>
                    </div>
                    <ExternalLink className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Top Pages */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
                    <h3 className="text-lg font-black text-gray-900 uppercase mb-6 flex items-center gap-2">
                        <LayoutDashboard className="w-5 h-5 text-indigo-600" />
                        Most Visited Content
                    </h3>
                    <div className="space-y-4">
                        {stats?.pageViews.map((page, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between text-sm font-bold uppercase tracking-tight">
                                    <span className="text-gray-600 truncate max-w-[70%]">{page.key}</span>
                                    <span className="text-indigo-600">{page.count} views</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${(page.count / maxPageView) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Clicks */}
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
                    <h3 className="text-lg font-black text-gray-900 uppercase mb-6 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-600" />
                        Top Call-to-Actions
                    </h3>
                    <div className="space-y-4">
                        {stats?.clickCounts.map((btn, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex justify-between text-sm font-bold uppercase tracking-tight">
                                    <span className="text-gray-600 truncate max-w-[70%]">{btn.key}</span>
                                    <span className="text-purple-600">{btn.count} clicks</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-purple-500 rounded-full transition-all duration-1000"
                                        style={{ width: `${(btn.count / maxClick) * 100}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Live Feed */}
            <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
                    <h3 className="text-lg font-black text-gray-900 uppercase flex items-center gap-2">
                        <Clock className="w-5 h-5 text-green-600" />
                        Live Activity Feed
                    </h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-full animate-pulse">LIVE STREAM</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
                            <tr>
                                <th className="px-8 py-4">Time</th>
                                <th className="px-8 py-4">Event Type</th>
                                <th className="px-8 py-4">Target</th>
                                <th className="px-8 py-4">Origin Hub (IP)</th>
                                <th className="px-8 py-4">System</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {stats?.recentEvents.map((event) => (
                                <tr key={event.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-8 py-4 text-xs font-medium text-gray-500">
                                        {new Date(event.timestamp).toLocaleTimeString()}
                                    </td>
                                    <td className="px-8 py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-black ${event.type === 'PAGE_VIEW' ? 'bg-indigo-50 text-indigo-600' : 'bg-purple-50 text-purple-600'
                                            }`}>
                                            {event.type}
                                        </span>
                                    </td>
                                    <td className="px-8 py-4 text-xs font-bold text-gray-900">{event.target}</td>
                                    <td className="px-8 py-4 text-xs font-mono text-gray-400">{event.ip || '---'}</td>
                                    <td className="px-8 py-4 text-xs text-gray-400 truncate max-w-[200px]" title={event.browser}>
                                        {event.browser?.split(') ')[0]?.replace('Mozilla/5.0 (', '') || '---'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
