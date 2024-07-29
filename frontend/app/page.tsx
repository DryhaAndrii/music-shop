import Slider from "@/components/slider/slider";
import styles from "./page.module.css";
import NewProducts from "@/components/newProducts/newProducts";


export default function Home() {

  return (
    <>
      <main className={styles.main}>
        <Slider />
        <NewProducts />
      </main>
      
    </>
  );
}
