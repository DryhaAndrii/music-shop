import Slider from "@/components/slider/slider";
import styles from "./page.module.css";
import NewProducts from "@/components/newProducts/newProducts";
import getNewProducts from "@/functions/getNewProducts";
import getDiscountedProducts from "@/functions/getDiscountedProducts";
import DiscountedProducts from "@/components/discountedProducts/discountedProduct";


export default async function Home() {
  const { newProducts, hasMoreNewProducts } = await getNewProducts(1, 5);//This is for prerender the first 5 products
  const { discountedProducts, hasMoreDiscountedProducts } = await getDiscountedProducts(1, 5);//This is for prerender the first 5 products
  return (
    <>
      <main className={styles.main}>
        <Slider />
        <NewProducts
          initialProducts={newProducts}
          initialHasMore={hasMoreNewProducts}
        />
        <DiscountedProducts
          initialHasMore={hasMoreDiscountedProducts}
          initialProducts={discountedProducts}
        />
        
      </main>
    </>
  );
}

