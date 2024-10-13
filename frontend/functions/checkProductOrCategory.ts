const apiUrl = typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_URL_LOCALHOST
    ? process.env.NEXT_PUBLIC_API_URL_LOCALHOST
    : process.env.NEXT_PUBLIC_API_URL;
    
const revalidationTime = process.env.NEXT_PUBLIC_REVALIDATION_TIME;

export default async function checkIsProductOrCategory(title: string) {
    if(title==='favicon.ico') return;
    const url = new URL(`${apiUrl}checkProductOrCategory`);
    url.searchParams.append('title', title);

    try {
        const res = await fetch(url, {
            next: {
                revalidate: revalidationTime ? parseInt(revalidationTime) : 3600,
            },
            credentials: 'include',
        });

        if (!res.ok) {
            throw new Error(`Failed to check product or category: ${res.statusText}`);
        }

        const data = await res.json();

        if (data.isFound) {
            if (data.type === 'product') {
                return 'Product found';
            } else if (data.type === 'category') {
                return 'Category found';
            }
        } else {
            return 'Nothing found';
        }
    } catch (error: any) {
        console.log("error checking is it product or category",error.message);
        throw error; // Re-throw the error for handling at a higher level
    }
}