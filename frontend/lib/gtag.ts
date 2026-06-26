// Thin wrapper around window.gtag so it's safe to call before GA4 loads
export function gtagEvent(
    eventName: string,
    params?: Record<string, string | number | boolean>
) {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', eventName, params);
    }
}
