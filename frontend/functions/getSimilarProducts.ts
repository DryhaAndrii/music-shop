import fetchData from "./fetchData";

export default async function getSimilarProducts(page: number, limit: number, mainProductId: string) {
    const data = await fetchData('getSimilarProducts', { page: page.toString(), limit: limit.toString(), mainProductId: mainProductId.toString() });
    return { similarProducts: data.products, hasMoreSimilarProducts: data.hasMore };
}