import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function getCategoriesByIds(ids: string[]) {
    try {
        const { data } = await axios.get(`${apiUrl}getCategoriesByIds`, {
            params: { ids },
            withCredentials: true
        });
        return data.categories;
    } catch (error: any) {
        console.error('Error fetching categories:', error.message);
        throw new Error('Failed to fetch categories');
    }
}