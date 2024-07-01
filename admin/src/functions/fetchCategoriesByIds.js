import axios from "axios";
import { toast } from "react-toastify";


const apiUrl = process.env.REACT_APP_API_URL;
export default async function fetchCategoriesByIds(categories) {
    try {
        const { data } = await axios.get(`${apiUrl}getCategoriesByIds`, {
            params: { categories },
            withCredentials: true
        });
        return data.categories;
    } catch (error) {
        if (error.response.status === 401) {
            window.location.href = '/login'
            return;
        };
        toast.error('Some error happened during fetching products: ' + error.message);
    }
}



