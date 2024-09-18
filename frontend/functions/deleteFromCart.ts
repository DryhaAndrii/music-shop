const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function deleteFromUserCart(productId: string) {
    try {
        const response = await fetch(`${apiUrl}cart/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ productId }),
        });

        const status = response.status;

        if (status === 201) {
            const data = await response.json();
            return { message: data.message };
        }


        const errorData = await response.json();
        return { error: errorData.message || 'Unknown error occurred' };

    } catch (error) {
        console.error('Error checking auth:', error);
        return { error: 'Network error occurred' };
    }
}