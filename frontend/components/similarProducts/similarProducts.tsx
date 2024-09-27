'use client'

import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Product from "@/types/product";
import ProductCardsContainer from "../productCardsContainer/ProductCardsContainer";
import MyButton from "../myButton/myButton";
import Loading from "../loading/loading";
import getSimilarProducts from "@/functions/getSimilarProducts";

interface SimilarProductsProps {
    initialProducts: Product[];
    initialHasMore: boolean;
    mainProductId: string;
}

export default function SimilarProducts({ initialProducts, initialHasMore, mainProductId }: SimilarProductsProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [page, setPage] = useState(2); // 2 because we already have 1 from the initialProducts
    const [hasMore, setHasMore] = useState(initialHasMore);
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = async () => {
        if (isLoading || !hasMore) return;

        setIsLoading(true);
        try {
            const { similarProducts, hasMoreNewProducts: moreProducts } = await getSimilarProducts(page, 5, mainProductId);

            if (similarProducts && similarProducts.length > 0) {
                setProducts(prevProducts => [...prevProducts, ...similarProducts]);
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
        <div className={styles.wrapper}>

            {isLoading && <Loading />}
            <div className={`${styles.similarProducts} container`}>

                <h2>Similar products</h2>
                {products.length === 0
                    ? <h2>No products found</h2>
                    : <ProductCardsContainer products={products} columns={5} />
                }


                {hasMore && (
                    <MyButton
                        onClick={getProducts}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Load More'}
                    </MyButton>
                )}
            </div>
        </div>
    );
}