import axios from "axios";
import { toast } from "react-toastify";


const apiUrl = process.env.REACT_APP_API_URL;
export default async function fetchProductsByIds(products) {
    try {
        const { data } = await axios.get(`${apiUrl}getProductsByIds`, {
            params: { products },
            withCredentials: true
        });
        return data.categories;
    } catch (error) {
        toast.error('Some error happened during fetching products');
    }
}



