const apiUrl = typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_URL_LOCALHOST
    ? process.env.NEXT_PUBLIC_API_URL_LOCALHOST
    : process.env.NEXT_PUBLIC_API_URL;

const revalidationTime = process.env.NEXT_PUBLIC_REVALIDATION_TIME;

export default async function fetchData(endpoint: string, params?: Record<string, string>) {
    try {
        
        const url = new URL(`${apiUrl}${endpoint}`);

        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }
        

        const res = await fetch(url, {
            next: {
                revalidate: revalidationTime ? parseInt(revalidationTime) : 3600,
            },
            credentials: 'include',
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.statusText}`);
        }

        return await res.json();
    } catch (error: any) {
        console.error(`Error fetching ${endpoint}:`, error.message);
        throw error;
    }
}