import fetchData from "./fetchData";

export default async function getDiscountedProducts(page: number, limit: number) {
    const data = await fetchData('getDiscountedProducts', { page: page.toString(), limit: limit.toString() });
    return { discountedProducts: data.products, hasMoreDiscountedProducts: data.hasMore };
}