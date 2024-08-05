import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function getBreadCrumps(title: string) {
    console.log('breadCrumps title: ', title);
    if (title === 'ReactToastify.css.map') return []
    if (title === 'react-toastify.esm.mjs.map') return []

    try {
        const { data } = await axios.get(`${apiUrl}getBreadCrumps`, {
            params: { title },
            withCredentials: true
        });
        return data.breadCrumps;
    } catch (error: any) {
        console.error('Error fetching breadCrumps:', error.message);
        throw new Error('Failed to fetch breadCrumps');
    }
}