import fetchData from "./fetchData";

export default async function getCategoryByTitle(categoryTitle: string) {
  const data = await fetchData('getCategoryByTitle', { categoryTitle });
  return data.category;
}