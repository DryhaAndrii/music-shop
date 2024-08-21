import fetchData from "./fetchData";

export default async function getNewProducts(page: number, limit: number) {
    const data = await fetchData('getNewProducts', { page: page.toString(), limit: limit.toString() });
    return { newProducts: data.products, hasMoreNewProducts: data.hasMore };
}