const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export default async function googleAuth() {
    try {
        const response = await fetch(`${apiUrl}googleAuth/auth`, {
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

export async function exchangeCode(code: string) {
    try {
        const response = await fetch(`${apiUrl}googleAuth/auth/exchange?code=${code}`, {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();
        window.location.href = '/';
    } catch (error) {
        console.error('Error during exchange code:', error);
    }
}
export async function exchangeCodeMessage(code: string) {
    try {
        const response = await fetch(`${apiUrl}googleAuth/auth/exchange/message?code=${code}`, {
            method: 'GET',
            credentials: 'include',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during exchange code:', error);
    }
}