'use client'
import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Product from "@/types/product";
import ProductCardsContainer from "../productCardsContainer/ProductCardsContainer";
import MyButton from "../myButton/myButton";
import Loading from "../loading/loading";
import getProductsByIds from "@/functions/getProductsByIds";

const PRODUCT_COUNT = 5;

export default function ViewedProducts({ currentProductId }: { currentProductId: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const [productsIds, setProductsIds] = useState<string[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [page, setPage] = useState(0);

    useEffect(() => {
        let recentlyViewedProductsIds = JSON.parse(localStorage.getItem('recentlyViewedProductsIds') || '[]');
        //removing our product from array
        recentlyViewedProductsIds = recentlyViewedProductsIds.filter((id: string) => id !== currentProductId);

        //adding our product as first item to array
        recentlyViewedProductsIds = [currentProductId, ...recentlyViewedProductsIds,];

        //saving in local storage
        localStorage.setItem('recentlyViewedProductsIds', JSON.stringify(recentlyViewedProductsIds));

        //deleting again to not show current product in viewedEarlier
        recentlyViewedProductsIds = recentlyViewedProductsIds.filter((id: string) => id !== currentProductId);
        setProductsIds(recentlyViewedProductsIds);

        setPage(1);
    }, [])

    useEffect(() => {
        getProducts()
    }, [page])

    async function getProducts() {
        setIsLoading(true);
        try {
            //Algorithm of sorting products looks stupid
            //but it works somehow so far
            if (productsIds.length === 0) return;
            const data = await getProductsByIds(productsIds.slice(PRODUCT_COUNT * (page - 1), PRODUCT_COUNT * page), 1, PRODUCT_COUNT);
            console.log('data:', data);
            if (data.products.length === 0) return;
            let newProducts: Product[] = [];
            productsIds.forEach((productId, productIdIndex) => {
                data.products.forEach((product: Product, productIndex: number) => {
                    if (product._id === productId) {
                        newProducts[productIdIndex] = product
                    }
                })
            })
            newProducts = newProducts.filter(Boolean);
            setProducts(prev => [...prev, ...newProducts]);
            if (productsIds.length > page * PRODUCT_COUNT) {
                return setHasMore(true);
            }
            setHasMore(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <div className={styles.wrapper}>

            {isLoading && <Loading />}
            <div className={`${styles.viewedProducts} container`}>

                <h2>Recently viewed products</h2>
                <ProductCardsContainer products={products} columns={5} />

                {hasMore && (
                    <MyButton
                        onClick={() => setPage(prev => prev + 1)}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Load More'}
                    </MyButton>
                )}
            </div>
        </div>
    );
}