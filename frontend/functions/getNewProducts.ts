const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const revalidationTime = process.env.NEXT_PUBLIC_REVALIDATION_TIME;

export default async function getNewProducts(page: number, limit: number) {
    const res = await fetch(`${apiUrl}getNewProducts?page=${page}&limit=${limit}`, {
        next: {
            revalidate: revalidationTime ? parseInt(revalidationTime) : undefined,
        },
        credentials: 'include',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch new products');
    }

    const data = await res.json();
    return { products: data.products, hasMore: data.hasMore };
}