const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function changePassword(email: string) {
    try {
        const response = await fetch(`${apiUrl}/changePassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email }),
        });

        const status = response.status;

        if (status === 400) {
            const data = await response.json();
            return { message: data.message, success: false };
        }
        if (status === 500) {
            const data = await response.json();
            return { message: data.message, success: false };
        }

        if (status === 201) {
            const data = await response.json();
            return { message: data.message, success: true };
        }

        const errorData = await response.json();
        return { error: errorData.message || 'Unknown error occurred' };

    } catch (error) {
        console.error('Error during sign up:', error);
        return { error: 'Network error occurred' };
    }
}
export async function checkCodeForPasswordChanging(code: string) {
    try {
        const response = await fetch(`${apiUrl}changePassword/checkCode`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ code }),
        });

        const status = response.status;

        if (status === 200) {
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
export async function setNewPassword(password: string, code: string) {
    try {
        const response = await fetch(`${apiUrl}changePassword/setNewPassword`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ newPassword: password, code }),
        });

        const status = response.status;

        if (status === 201) {
            const data = await response.json();
            return { message: data.message, success: true };
        }
        if (status === 400 || status === 500) {
            const data = await response.json();
            return { message: data.message, success: false };
        }
        const errorData = await response.json();
        return { error: errorData.message || 'Unknown error occurred' };

    } catch (error) {
        console.error('Error during sign up:', error);
        return { error: 'Network error occurred' };
    }
}