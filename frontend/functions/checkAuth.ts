const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export default async function checkAuth() {
    try {
        const response = await fetch(`${apiUrl}/checkAuth`, {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();
        console.log(data.message);
    } catch (error) {
        console.error('Error initiating Google auth:', error);
    } 
};
