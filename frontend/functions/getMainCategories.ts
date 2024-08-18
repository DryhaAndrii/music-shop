const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const revalidationTime = process.env.NEXT_PUBLIC_REVALIDATION_TIME;

export default async function getMainCategories() {
    const res = await fetch(`${apiUrl}getMainCategories`, {
        next: {
            revalidate: revalidationTime ? parseInt(revalidationTime) : undefined, // Turning into number or undefined
        }, 
        credentials: 'include', 
    });

    if (!res.ok) {
        throw new Error('Failed to fetch main categories');
    }

    const data = await res.json();
    return data.categories;
}

