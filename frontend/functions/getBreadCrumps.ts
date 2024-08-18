const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const revalidationTime = process.env.NEXT_PUBLIC_REVALIDATION_TIME;

export default async function getBreadCrumps(title: string) {
    const url = new URL(`${apiUrl}getBreadCrumps`);
    url.searchParams.append('title', title);

    try {
        const res = await fetch(url.toString(), {
            next: {
                revalidate: revalidationTime ? parseInt(revalidationTime) : undefined,
            },
            credentials: 'include',
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch breadCrumps: ${res.statusText}`);
        }

        const data = await res.json();
        return data.breadCrumps;
    } catch (error: any) {
        console.error('Error fetching breadCrumps:', error.message);
        throw new Error('Failed to fetch breadCrumps');
    }
}