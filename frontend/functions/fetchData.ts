const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const revalidationTime = process.env.NEXT_PUBLIC_REVALIDATION_TIME;

export default async function fetchData(endpoint: string, params?: Record<string, string>) {
    const url = new URL(`${apiUrl}${endpoint}`);

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }
    
    try {
        const res = await fetch(url.toString(), {
            next: {
                revalidate: revalidationTime ? parseInt(revalidationTime) : undefined,
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