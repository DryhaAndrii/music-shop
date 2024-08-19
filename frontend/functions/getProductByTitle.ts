import fetchData from "./fetchData";

export default async function getProductByTitle(productTitle: string) {
    const data = await fetchData('getProductByTitle', { productTitle });
    return data.product;
}