const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export default async function googleAuth() {
    try {
        const response = await fetch(`${apiUrl}/googleAuth`, {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();
        if (data.url) {
            window.location.href = data.url; //Send the user to the Google OAuth page
        }
        if (data.message) {
            console.log(data.message);
        }
    } catch (error) {
        console.error('Error initiating Google auth:', error);
    }
};
