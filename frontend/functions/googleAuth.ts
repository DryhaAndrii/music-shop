const apiUrl = typeof window !== 'undefined' && process.env.NEXT_PUBLIC_API_URL_LOCALHOST
    ? process.env.NEXT_PUBLIC_API_URL_LOCALHOST
    : process.env.NEXT_PUBLIC_API_URL;
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
        //Get bookmarks from localStorage to sync them with data from database
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        

        const response = await fetch(`${apiUrl}googleAuth/auth/exchange`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ bookmarks: bookmarks, code, cart }),
        });
        const data = await response.json();

        localStorage.setItem('bookmarks', JSON.stringify(data.bookmarks));
        localStorage.setItem('cart', JSON.stringify(data.cart));
        window.dispatchEvent(new Event("storage"));// Send event to refresh bookmarks
        
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