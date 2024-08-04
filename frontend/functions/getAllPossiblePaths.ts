import { toast } from "react-toastify";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function getAllPossiblePaths() {
    try {
        const { data } = await axios.get(`${apiUrl}getAllPossiblePaths`, {
            withCredentials: true
        });
        
        
        // turning paths into format expected by Next.js
        return data.paths.map((path: string) => ({
            slug: path.split('/').filter(Boolean)
        }));
        
    } catch (error: any) {
        console.error('Error getting all possible paths:', error.message);
        toast.error('Error getting all possible paths: ' + error.message);
        return []; // return an empty array if an error occurs
    }
}