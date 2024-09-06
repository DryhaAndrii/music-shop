const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function signUp(email: string, password: string, name: string) {
    try {
        const response = await fetch(`${apiUrl}signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password, name }),
        });

        const status = response.status;

        if (status === 201) {
            const data = await response.json();
            return { user: data.user, message: data.message };
        }

        const errorData = await response.json();
        return { error: errorData.message || 'Unknown error occurred' };

    } catch (error) {
        console.error('Error during sign up:', error);
        return { error: 'Network error occurred' };
    }
}