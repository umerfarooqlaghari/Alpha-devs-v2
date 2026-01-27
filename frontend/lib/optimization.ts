export async function getOptimizationData(path: string) {
    try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const res = await fetch(`${API_URL}/api/optimization/path?path=${encodeURIComponent(path)}`, {
            next: { revalidate: 60 } // Cache for 60 seconds
        });

        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error('Error fetching optimization data:', error);
        return null;
    }
}
