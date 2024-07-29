import { toast } from "react-toastify";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function getProductsByIds(productsIds: string[]) {
    try {
        const { data } = await axios.get(`${apiUrl}getProductsByIds`, {
            params: { productsIds },
            withCredentials: true
        });
        return data.products;
    } catch (error: any) {
        console.log(error)
        toast.error('Some error happened during fetching products: ' + error.message);
    }
}

