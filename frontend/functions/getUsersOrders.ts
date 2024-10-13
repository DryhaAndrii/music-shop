const apiUrl = typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_URL_LOCALHOST
    ? process.env.NEXT_PUBLIC_API_URL_LOCALHOST
    : process.env.NEXT_PUBLIC_API_URL;

export default async function getOrdersOfUser() {
    try {
        const response = await fetch(`${apiUrl}order/getByToken`, {
            method: 'GET',
            credentials: 'include',
        });

        const status = response.status;

        if (status === 200) {
            const data = await response.json();
            return data.orders;
        }


        const errorData = await response.json();
        return { error: errorData.message || 'Unknown error occurred' };

    } catch (error) {
        console.error('Error checking auth:', error);
        return { error: 'Network error occurred' };
    }
}