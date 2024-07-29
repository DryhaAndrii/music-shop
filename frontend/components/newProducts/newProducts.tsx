'use client'
import styles from "./styles.module.scss";
import { useState, useEffect, useCallback } from "react";
import Product from "@/types/product";
import ProductCardsContainer from "../cardsContainer/cardContainer";
import getNewProducts from "@/functions/getNewProducts";

function NewProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = useCallback(async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        const { products: newProducts, hasMore: moreProducts } = await getNewProducts(page, 5);
        if (newProducts && newProducts.length > 0) {
            setProducts(prevProducts => {
                const uniqueNewProducts = newProducts.filter(
                    (newProduct: Product) => !prevProducts.some(product => product._id === newProduct._id)
                );
                return [...prevProducts, ...uniqueNewProducts];
            });
            setPage(prevPage => prevPage + 1);
        }
        setHasMore(moreProducts);
        setIsLoading(false);
    }, [page, isLoading, hasMore]);



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