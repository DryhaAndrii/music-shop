import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function checkIsProductOrCategory(title: string) {
    try {
        const { data } = await axios.get(`${apiUrl}checkProductOrCategory`, {
            params: { title },
            withCredentials: true
        });

        if (data.isFound) {
            if (data.type === 'product') {
                return 'Product found';
            } else if (data.type === 'category') {
                return 'Category found';
            }
        } else {
            return 'Nothing found';
        }
    } catch (error: any) {
        console.log(error.message);
    }
}