import { toast } from "react-toastify";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function getNewProducts(page: number, limit: number) {
    try {
        const { data } = await axios.get(`${apiUrl}getNewProducts`, {
            params: { page, limit },
            withCredentials: true
        });
        return { products: data.products, hasMore: data.hasMore };
    } catch (error: any) {
        console.log(error)
        toast.error('Some error happened during fetching products: ' + error.message);
        return { products: [], hasMore: false };
    }
}