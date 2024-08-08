'use client';
import ProductCardsContainer from "@/components/productCardsContainer/ProductCardsContainer";
import styles from "./styles.module.scss"
import Product from "@/types/product";
import { useState, useEffect } from "react";
import AttributesPanel from "./attributesPanel/attributesPanel";
import { CategoryAttribute } from "@/types/category";
import Pagination from "./pagination/pagination";
import getProductsByIds from "@/functions/getProductsByIds";

interface ProductDisplayPanelProps {
    initialProducts: Product[];
    initialPages: number;
    categoryAttributes: CategoryAttribute[];
    idsOfAllProducts: string[];
}

const COUNT_OF_PRODUCTS_AT_PAGE = 12;

function ProductDisplayPanel({ idsOfAllProducts, initialProducts, initialPages, categoryAttributes }: ProductDisplayPanelProps) {
    const [hasInitialDataLoaded, setHasInitialDataLoaded] = useState(false);//Flag to avoid useEffect at 1 render
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [totalPages, setTotalPages] = useState(initialPages);
    const [currentPage, setCurrentPage] = useState(1); // 2 because we already have 1 from the initialProducts

    useEffect(() => {
        //Avoid useEffect to run at 1 render
        if (!hasInitialDataLoaded) return setHasInitialDataLoaded(true);

        fetchProducts();
    }, [currentPage]);

    const handlePageChange = async (page: number) => {
        console.log('page', page);
        setCurrentPage(page);
    };

    async function fetchProducts() {
        const data = await getProductsByIds(idsOfAllProducts, currentPage, COUNT_OF_PRODUCTS_AT_PAGE);
        setTotalPages(data?.pages);
        setProducts(data?.products);
    }

    return (
        <div className={`container ${styles.productDisplayPanel}`}>
            <div className={styles.attributesPanelWrapper}>
                <AttributesPanel categoryAttributes={categoryAttributes} />

            </div>
            <div className={styles.productCardsContainerWrapper}>
                <ProductCardsContainer products={products} columns={4} />
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>

        </div>
    );
}

export default ProductDisplayPanel;