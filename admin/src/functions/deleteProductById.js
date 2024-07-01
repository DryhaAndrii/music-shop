
import { toast } from "react-toastify";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

export default async function deleteProductById(productId) {
    try {
        const { data } = await axios.delete(`${apiUrl}/deleteProductById/${productId}`, {
            withCredentials: true
        });
        toast.success(data.message);
    } catch (error) {
        if (error.response.status === 401) {
            window.location.href = '/login'
            return;
        };
        toast.error('Some error happened during fetching products: ' + error.message);
        
    }
}
