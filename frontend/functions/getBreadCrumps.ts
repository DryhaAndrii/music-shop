import fetchData from "./fetchData";

export default async function getBreadCrumps(title: string) {
    const data = await fetchData('getBreadCrumps', { title });
    return data.breadCrumps;
}