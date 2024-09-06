const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function login(email: string, password: string) {
    try {
        const response = await fetch(`${apiUrl}login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }), // Передача данных в теле запроса
        });

        const status = response.status;

        if (status === 200) {
            const data = await response.json();
            return { user: data.user, message: data.message };
        }

        const errorData = await response.json();
        return { error: errorData.message || 'Unknown error occurred' };

    } catch (error) {
        console.error('Error checking auth:', error);
        return { error: 'Network error occurred' };
    }
}