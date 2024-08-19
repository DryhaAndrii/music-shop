import fetchData from "./fetchData";

export default async function getMainCategories() {
    const data = await fetchData('getMainCategories');
    return data.categories;
}