const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function logout() {
    try {
        const response = await fetch(`${apiUrl}logout`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        if (data.message) {
            console.log(data.message);
        }
        return true;
    } catch (error) {
        console.error('Error during logout:', error);
    }
}