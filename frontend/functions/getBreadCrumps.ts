// import { toast } from "react-toastify";
import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function getBreadCrumps(title: string) {
    try {
        const { data } = await axios.get(`${apiUrl}getBreadCrumps`, {
            params: { title },
            withCredentials: true
        });
        return data.breadCrumps;
    } catch (error: any) {
        console.log(error.message)
        // toast.error('Some error happened during getting breadCrumps: ' + error.message);
    }
}