import Slider from "@/components/slider/slider";
import styles from "./page.module.css";
import NewProducts from "@/components/newProducts/newProducts";
import getNewProducts from "@/functions/getNewProducts";


export default async function Home() {
  const { products, hasMore } = await getNewProducts(1, 5);//This is for prerender the first 5 products

  return (
    <>
      <main className={styles.main}>
        <Slider />
        <NewProducts
          initialProducts={products}
          initialHasMore={hasMore}
        />
      </main>
    </>
  );
}
export const revalidate = 60; // Regenerate the page every 60 seconds
