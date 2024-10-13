const apiUrl = typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_URL_LOCALHOST
    ? process.env.NEXT_PUBLIC_API_URL_LOCALHOST
    : process.env.NEXT_PUBLIC_API_URL;

export default async function placeOrder(name: string, surname: string, phone: string, totalPrice: number, products: any) {
    try {
        const response = await fetch(`${apiUrl}order/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ name, surname, phone, totalPrice, products }),
        });

        const status = response.status;

        if (status === 201) {
            const data = await response.json();
            return { message: data.message };
        }


        const errorData = await response.json();
        return { error: errorData.message || 'Unknown error occurred' };

    } catch (error) {
        console.error('Error getting orders:', error);
        return { error: 'Network error occurred' };
    }
}