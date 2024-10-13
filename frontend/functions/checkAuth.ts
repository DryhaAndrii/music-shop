const apiUrl = typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_URL_LOCALHOST
    ? process.env.NEXT_PUBLIC_API_URL_LOCALHOST
    : process.env.NEXT_PUBLIC_API_URL;
    
export default async function checkAuth() {
    try {
        const response = await fetch(`${apiUrl}checkAuth`, {
            method: 'GET',
            credentials: 'include',
        });

        const status = response.status;

        if (status === 401) {
            return console.log('token is not provided or expired or invalid');
        }
        if (status === 200) {
            const data = await response.json();
            console.log(data.message);
            return data.user;
        }
    } catch (error) {
        console.error('Error checking auth:', error);
    }
};
