'use client';
import ProductCardsContainer from "@/components/productCardsContainer/ProductCardsContainer";
import styles from "./styles.module.scss"
import Product from "@/types/product";
import { useState } from "react";
import AttributesPanel from "./attributesPanel/attributesPanel";
import { CategoryAttribute } from "@/types/category";
import Pagination from "../../pagination/pagination";
import getProductsByIds from "@/functions/getProductsByIds";

interface ProductDisplayPanelProps {
    initialProducts: Product[];
    initialPages: number;
    categoryAttributes: CategoryAttribute[];
    idsOfAllProducts: string[];
}

const COUNT_OF_PRODUCTS_AT_PAGE = 12;

function ProductDisplayPanel({ idsOfAllProducts, initialProducts, initialPages, categoryAttributes }: ProductDisplayPanelProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [totalPages, setTotalPages] = useState(initialPages);
    const [currentPage, setCurrentPage] = useState(1); // 2 because we already have 1 from the initialProducts
    const [loading, setLoading] = useState(false);

    const handlePageChange = async (page: number) => {
        setLoading(true);
        const data = await getProductsByIds(idsOfAllProducts, page, COUNT_OF_PRODUCTS_AT_PAGE);
        setTotalPages(data?.pages);
        setProducts(data?.products);
        setLoading(false);
        setCurrentPage(page);
        window.scrollTo(0, 0);//Scroll to top
    };
    const loadMore = async () => {
        setLoading(true);
        const data = await getProductsByIds(idsOfAllProducts, currentPage + 1, COUNT_OF_PRODUCTS_AT_PAGE);
        setTotalPages(data?.pages);
        setProducts([...products, ...data?.products]);
        setCurrentPage(currentPage + 1);
        setLoading(false);
    };
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
                    loading={loading}
                    loadMore={loadMore}
                />
            </div>
        </div>
    );
}
export default ProductDisplayPanel;