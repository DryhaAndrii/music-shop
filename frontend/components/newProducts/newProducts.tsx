'use client'
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Product from "@/types/product";
import ProductCardsContainer from "../cardsContainer/cardContainer";
import getNewProducts from "@/functions/getNewProducts";

function NewProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        getProducts();
    }, []);

    return (
        <div className={styles.newProducts}>
            <ProductCardsContainer products={products} />
            {hasMore && (
                <button
                    onClick={getProducts}
                    className={styles.loadMoreButton}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Load More'}
                </button>
            )}
        </div>
    );
}

export default NewProducts;