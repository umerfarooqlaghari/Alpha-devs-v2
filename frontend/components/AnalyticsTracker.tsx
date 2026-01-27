'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export default function AnalyticsTracker() {
    const pathname = usePathname();

    // Track Page View
    useEffect(() => {
        let isMounted = true;

        const trackPageView = async () => {
            // Prevent tracking during HMR/fast refresh or duplicate effects
            if (!isMounted) return;

            try {
                const res = await fetch(`${API_URL}/api/analytics/track`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'PAGE_VIEW',
                        target: pathname || '/'
                    })
                });

                if (!res.ok) {
                    console.warn(`[ANALYTICS] Track failed with status ${res.status}`);
                }
            } catch (error) {
                console.error('[ANALYTICS] Network error tracking page view:', error);
            }
        };

        // Small delay to ensure route change is stable
        const timer = setTimeout(trackPageView, 1000);

        return () => {
            isMounted = false;
            clearTimeout(timer);
        };
    }, [pathname]);

    // Track Button Clicks (Global Listener)
    useEffect(() => {
        const handleGlobalClick = async (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const trackId = target.closest('[data-track]')?.getAttribute('data-track');

            if (trackId) {
                try {
                    await fetch(`${API_URL}/api/analytics/track`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            type: 'CLICK',
                            target: trackId
                        })
                    });
                } catch (error) {
                    console.error('Failed to track click:', error);
                }
            }
        };

        window.addEventListener('click', handleGlobalClick);
        return () => window.removeEventListener('click', handleGlobalClick);
    }, []);

    return null; // This component doesn't render anything
}
