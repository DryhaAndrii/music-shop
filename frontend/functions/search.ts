const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function searchByValue(searchValue: string) {
    try {
        const response = await fetch(`${apiUrl}search?query=${encodeURIComponent(searchValue)}`, {
            method: 'GET',
            credentials: 'include',
        });
        const status = response.status;

        if (status === 200) {
            const data = await response.json();
            return data.results;
        }


        const errorData = await response.json();
        return { error: errorData.message || 'Unknown error occurred' };

    } catch (error) {
        console.error('Error checking auth:', error);
        return { error: 'Network error occurred' };
    }
}
