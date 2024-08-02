import { toast } from "react-toastify";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function checkIsProduct(title: string) {
    try {
        const { data } = await axios.get(`${apiUrl}checkIsProduct`, {
            params: { title },
            withCredentials: true
        });
        return data.isProduct;
    } catch (error: any) {
        console.log(error)
        toast.error('Some error happened during checking if url is product: ' + error.message);
    }
}