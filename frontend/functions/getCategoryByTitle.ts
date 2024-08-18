const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const revalidationTime = process.env.NEXT_PUBLIC_REVALIDATION_TIME;

export default async function getCategoryByTitle(categoryTitle: string) {
    const url = new URL(`${apiUrl}getCategoryByTitle`);
    url.searchParams.append('categoryTitle', categoryTitle);
  
    try {
      const res = await fetch(url, {
        next: {
            revalidate: revalidationTime ? parseInt(revalidationTime) : undefined, // Turning into number or undefined
        }, 
        credentials: 'include', 
      });
  
      if (!res.ok) {
        throw new Error(`Failed to fetch category: ${res.statusText}`);
      }
  
      const data = await res.json();
      return data.category;
    } catch (error: any) {
      console.log(error.message);
      throw error; 
    }
  }

