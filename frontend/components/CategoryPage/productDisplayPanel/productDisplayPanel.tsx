'use client';
import { useEffect } from "react";
import ProductCardsContainer from "@/components/productCardsContainer/ProductCardsContainer";
import styles from "./styles.module.scss"
import Product from "@/types/product";
import { useState } from "react";
import AttributesPanel from "./attributesPanel/attributesPanel";
import { CategoryAttribute } from "@/types/category";
import Pagination from "../../pagination/pagination";
import getProductsByIds from "@/functions/getProductsByIds";
import Loading from "@/components/loading/loading";
import MyButton from "@/components/myButton/myButton";

interface ProductDisplayPanelProps {
    initialProducts: Product[];
    initialPages: number;
    categoryAttributes: CategoryAttribute[];
    idsOfAllProducts: string[];
    minPricePossible: number;
    maxPricePossible: number;
}
interface Filters {
    priceRange: { minPrice: number; maxPrice: number };
    attributes: { [key: string]: string };
}

const COUNT_OF_PRODUCTS_AT_PAGE = 12;


function ProductDisplayPanel({
    idsOfAllProducts,
    initialProducts,
    initialPages,
    categoryAttributes,
    maxPricePossible,
    minPricePossible
}: ProductDisplayPanelProps) {
    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [totalPages, setTotalPages] = useState(initialPages);
    const [currentPage, setCurrentPage] = useState(1); // 2 because we already have 1 from the initialProducts
    const [loading, setLoading] = useState(false);
    const [isFiltersInitial, setIsFiltersInitial] = useState(true);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [showAttributesPanel, setShowAttributesPanel] = useState(false);

    const initialFilters = {
        priceRange: { minPrice: minPricePossible, maxPrice: maxPricePossible },
        attributes: {}
    }
    const [filters, setFilters] = useState<Filters>(initialFilters);

    useEffect(() => {
        if (isInitialRender) {
            return setIsInitialRender(false);
        }
        fetchProductsWithFilters();
        if (JSON.stringify(filters) !== JSON.stringify(initialFilters)) {
            return setIsFiltersInitial(false);
        }
        setIsFiltersInitial(true);


    }, [filters])


    const handlePageChange = async (page: number) => {
        setLoading(true);
        const data = await getProductsByIds(idsOfAllProducts, page, COUNT_OF_PRODUCTS_AT_PAGE, filters);
        setTotalPages(data?.pages ?? 0);
        setProducts(data?.products ?? []);
        setLoading(false);
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };
    const loadMore = async () => {
        setLoading(true);
        const data = await getProductsByIds(idsOfAllProducts, currentPage + 1, COUNT_OF_PRODUCTS_AT_PAGE, filters);
        setTotalPages(data?.pages ?? 0);
        setProducts(prev => [...prev, ...(data?.products ?? [])]);
        setCurrentPage(prev => prev + 1);
        setLoading(false);
    };
    const clearFilters = async () => {
        setFilters(initialFilters);
        setIsFiltersInitial(true);
        setLoading(true);
        const data = await getProductsByIds(idsOfAllProducts, 1, COUNT_OF_PRODUCTS_AT_PAGE);
        setTotalPages(data?.pages);
        setProducts(data?.products);
        setLoading(false);
        setCurrentPage(1);
        window.scrollTo(0, 0);//Scroll to top

        // {
        //     priceRange
        //     :
        //     { maxPrice: 1653, minPrice: 130 }

        //     attributes
        //     :
        //     {Count of frets: "24 frets", Pickups: "S-S" }
        // }
    }
    const fetchProductsWithFilters = async () => {
        setLoading(true);
        const data = await getProductsByIds(idsOfAllProducts, 1, COUNT_OF_PRODUCTS_AT_PAGE, filters);
        setTotalPages(data?.pages ?? 0);
        setProducts(data?.products ?? []);
        setLoading(false);
        setCurrentPage(1);
        window.scrollTo(0, 0);
    }
    const toggleAttributesPanel = () => {
        setShowAttributesPanel(!showAttributesPanel);
    }
    return (
        <div className={styles.wrapper}>
            {loading && <Loading />}

            <div className="container">
                <div className={styles.productDisplayPanel}>
                    <MyButton onClick={toggleAttributesPanel} >Filters</MyButton>
                    <div className={`${styles.attributesPanelWrapper} ${showAttributesPanel ? styles.attributesPanelWrapper__show : ""}`}>
                        <AttributesPanel
                            categoryAttributes={categoryAttributes}
                            filters={filters}
                            setFilters={setFilters}
                            maxPricePossible={maxPricePossible}
                            minPricePossible={minPricePossible}
                            clearFilters={clearFilters}
                            isFiltersInitial={isFiltersInitial}
                        />
                    </div>
                    {products.length === 0
                        ?
                        <h2>No products found</h2>
                        :
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
                    }


                </div>
            </div>
        </div>
    );
}
export default ProductDisplayPanel;