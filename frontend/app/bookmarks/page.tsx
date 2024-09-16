'use client';

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import getProductsByIds from "@/functions/getProductsByIds";
import Product from "@/types/product";
import Bookmark from "./bookmark/bookmark";
import Loading from "@/components/loading/loading";

export default function Bookmarks() {
    const [products, setProducts] = useState<Product[] | null>([]);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        window.addEventListener('storage', fetchBookmarks);

        fetchBookmarks();

        return () => {
            window.removeEventListener('storage', fetchBookmarks);
        };
    }, []);
    async function fetchBookmarks() {

        const bookmarksId = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        if (!bookmarksId || bookmarksId.length === 0) return setProducts(null);

        setLoading(true);
        const response = await getProductsByIds(bookmarksId, 1, 1000);
        console.log('products:', response);
        if (!response || !response.products) return setLoading(false);
        setProducts(response.products);
        setLoading(false);
    }
    if (!products) {
        return (
            <div className="container">
                <p>No bookmarks</p>
            </div>
        )
    }
    return (
        <div className={styles.bookmarksWrapper}>
            {isLoading && <Loading />}
            <div className="container">
                <h2>Bookmarks</h2>
                <div className={styles.bookmarks}>
                    <div className={styles.example}>
                        <div className={styles.imageWrapper}>Image</div>
                        <div className={styles.title}>Title</div>
                        <div className={styles.price}>Price</div>
                    </div>
                    {products.map((product) => (
                        <Bookmark product={product} key={product._id} setLoading={setLoading} />
                    ))}
                </div>
            </div>
        </div>

    );
}
