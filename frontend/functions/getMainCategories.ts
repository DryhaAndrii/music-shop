import { toast } from "react-toastify";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function getMainCategories() {
    try {
        const { data } = await axios.get(`${apiUrl}getMainCategories`, {
            withCredentials: true
        });
        return data.categories;
    } catch (error: any) {

        toast.error('Some error happened during fetching categories: ' + error.message);

    }
}

