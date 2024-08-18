const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const revalidationTime = process.env.NEXT_PUBLIC_REVALIDATION_TIME;

export default async function getAllPossiblePaths() {
    const url = new URL(`${apiUrl}getAllPossiblePaths`);

    try {
        const res = await fetch(url, {
            next: {
                revalidate: revalidationTime ? parseInt(revalidationTime) : undefined, // Turning into number or undefined
            }, // Caching for revalidationTime 
            credentials: 'include', 
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch possible paths: ${res.statusText}`);
        }

        const data = await res.json();

        
        return data.paths.map((path: string) => ({
            slug: path.split('/').filter(Boolean)
        }));

    } catch (error: any) {
        console.error('Error getting all possible paths:', error.message);
        return []; 
    }
}