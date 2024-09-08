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
            return data;
        }

        const errorData = await response.json();
        return { error: errorData.message || 'Unknown error occurred' };

    } catch (error) {
        console.error('Error during sign up:', error);
        return { error: 'Network error occurred' };
    }
}
export async function verifyByCode(code: string) {
    try {
        const response = await fetch(`${apiUrl}signup/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ code }),
        });

        const status = response.status;

        if (status === 201) {
            const data = await response.json();
            return true;
        }
        if (status === 400) {
            return false;
        }

        const errorData = await response.json();
        return { error: errorData.message || 'Unknown error occurred' };

    } catch (error) {
        console.error('Error during sign up:', error);
        return { error: 'Network error occurred' };
    }
}