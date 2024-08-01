'use client'
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Product from "@/types/product";
import ProductCardsContainer from "../productCardsContainer/ProductCardsContainer";
import getNewProducts from "@/functions/getNewProducts";
import MyButton from "../myButton/myButton";

function NewProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const { products: newProducts, hasMore: moreProducts } = await getNewProducts(page, 5);

            if (newProducts && newProducts.length > 0) {
                setProducts(prevProducts => [...prevProducts, ...newProducts]);
                setPage(prevPage => prevPage + 1);
            }

            setHasMore(moreProducts);
        } catch (error) {
            console.error('Error fetching new products:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.newProducts}>
            <h2 className="container">New Products</h2>
            <div className={styles.productCardsContainerWrapper}>
                <ProductCardsContainer products={products} />
            </div>

            {hasMore && products.length<=15 && (
                <MyButton
                    onClick={getProducts}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Load More'}
                </MyButton>
            )}
        </div>
    );
}

export default NewProducts;