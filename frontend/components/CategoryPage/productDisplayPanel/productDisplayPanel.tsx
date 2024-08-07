'use client';
import ProductCardsContainer from "@/components/productCardsContainer/ProductCardsContainer";
import styles from "./styles.module.scss"
import Product from "@/types/product";
import { useState } from "react";
import AttributesPanel from "./attributesPanel/attributesPanel";
import { CategoryAttribute } from "@/types/category";

interface ProductDisplayPanelProps {
    initialProducts: Product[];
    initialPages: number;
    categoryAttributes: CategoryAttribute[];
}

function ProductDisplayPanel({ initialProducts, initialPages, categoryAttributes }: ProductDisplayPanelProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [totalPages, setTotalPages] = useState(initialPages);
    const [currentPage, setCurrentPage] = useState(1); // 2 because we already have 1 from the initialProducts
    return (
        <div className={`container ${styles.productDisplayPanel}`}>
            <div className={styles.attributesPanelWrapper}>
                <AttributesPanel categoryAttributes={categoryAttributes} />

            </div>
            <div className={styles.productCardsContainerWrapper}>
                <ProductCardsContainer products={products} columns={4} />
            </div>

        </div>
    );
}

export default ProductDisplayPanel;