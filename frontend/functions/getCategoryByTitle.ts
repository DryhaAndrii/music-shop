import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function getCategoryByTitle(categoryTitle: string) {
    try {
        const { data } = await axios.get(`${apiUrl}getCategoryByTitle`, {
            params: { categoryTitle },
            withCredentials: true
        });
        return data.category;
    } catch (error: any) {
        console.log(error.message);
    }
}

