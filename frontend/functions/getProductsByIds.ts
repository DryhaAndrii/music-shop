import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function getProductsByIds(productsIds: string[], page: number, limit: number) {
    try {
        const { data } = await axios.get(`${apiUrl}getProductsByIds`, {
            params: { productsIds, page, limit },
            withCredentials: true
        });
        return { products: data.products, pages: data.totalPages };
    } catch (error: any) {
        console.log(error.message)
    }
}

