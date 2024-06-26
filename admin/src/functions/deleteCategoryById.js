
import { toast } from "react-toastify";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export default async function deleteCategoryById(categoryId) {
    try {
        const { data } = await axios.delete(`${apiUrl}/deleteCategoryById/${categoryId}`, {
            withCredentials: true
        });
        toast.success(data.categories);
    } catch (error) {
        toast.error('Some error happened during fetching categories');
        throw error;
    }
}
