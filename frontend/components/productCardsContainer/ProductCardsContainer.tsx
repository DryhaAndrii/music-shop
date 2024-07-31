import styles from "./styles.module.scss";
import Product from "@/types/product";
import Card from "../card/card";
import ProductCardsContainerSkeleton from "./ProductCardsContainerSkeleton";
interface ProductCardsContainerProps {
    products: Product[] | undefined;

}

function ProductCardsContainer({ products }: ProductCardsContainerProps) {
    if (products?.length === 0) return (
        <ProductCardsContainerSkeleton />
    )
    return (
        <div className={styles.productCardsContainer}>
            {products?.map((product) => (
                <Card product={product} key={product._id} />
            ))}
        </div>
    );
}

export default ProductCardsContainer;