import fetchData from "./fetchData";

export default async function getAllPossiblePaths() {
    const data = await fetchData('getAllPossiblePaths');
    return data.paths.map((path: string) => ({
        slug: path.split('/').filter(Boolean),
    }));
}