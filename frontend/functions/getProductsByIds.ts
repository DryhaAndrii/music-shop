import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface Filters {
    priceRange?: {
        minPrice: number;
        maxPrice: number;
    };
    attributes?: {
        [key: string]: string;
    };
}

export default async function getProductsByIds(
    productsIds: string[],
    page: number,
    limit: number,
    filters?: Filters
) {
    try {
        const { data } = await axios.get(`${apiUrl}getProductsByIds`, {
            params: {
                productsIds,
                page,
                limit,
                filters: filters ? JSON.stringify(filters) : undefined
            },
            withCredentials: true
        });
        return { products: data.products, pages: data.totalPages };
    } catch (error: any) {
        console.log(error.message);
        throw error;
    }
}