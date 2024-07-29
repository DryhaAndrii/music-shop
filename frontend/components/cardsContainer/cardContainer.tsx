import styles from "./styles.module.scss";
import Product from "@/types/product";
interface ProductCardsContainerProps {
    products: Product[] | undefined;

}

function ProductCardsContainer({ products }: ProductCardsContainerProps) {
    return (
        <div className={styles.productCardsContainer}>
            {products?.map((product) => (
                <div key={product._id} className={styles.productCard}>
                    {product.title}
                </div>
            ))}
        </div>
    );
}

export default ProductCardsContainer;