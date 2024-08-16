import Category from "@/types/category"
import styles from "./styles.module.scss"
import getCategoryByTitle from "@/functions/getCategoryByTitle";
import getProductsByIds from "@/functions/getProductsByIds";
import ProductDisplayPanel from "./productDisplayPanel/productDisplayPanel";
import Product from "@/types/product";
import getCategoriesByIds from "@/functions/getCategoriesByIds";
import CategoriesDisplayPanel from "./categoriesDisplayPanel/categoriesDisplayPanel";

const SPACE_REGEX = / /g;
const INITIAL_PAGE_NUMBER = 1;
const COUNT_OF_PRODUCTS_AT_PAGE = 12;

export default async function CategoryPage({ categoryTitle }: { categoryTitle: string }) {
    const category: Category = await getCategoryByTitle(categoryTitle);

    if (category.products.length === 0 && category.subcategories.length === 0) return (
        <div>
            <h1>{category.title}</h1>
            <p>{category.title} have no products or subcategories</p>
        </div>
    );
    if (category.products.length > 0) {
        const data = await getProductsByIds(category.products, INITIAL_PAGE_NUMBER, COUNT_OF_PRODUCTS_AT_PAGE);
        const products: Product[] = data.products;
        const minPricePossible = Math.min(...products.map(p => Number(p.price)));
        const maxPricePossible = Math.max(...products.map(p => Number(p.price)))
        if (!data) return;
        return (
            <ProductDisplayPanel
                idsOfAllProducts={category.products}
                initialProducts={data.products}
                initialPages={data.pages}
                categoryAttributes={category.attributes}
                minPricePossible={minPricePossible}
                maxPricePossible={maxPricePossible}
            />
        );
    }
    if (category.subcategories.length > 0) {
        const categories = await getCategoriesByIds(category.subcategories);
        if (categories) return (
            <CategoriesDisplayPanel categories={categories} categoryTitle={category.title}/>
        )
    }
    return (
        <div>
            <h1>{category.title}</h1>
        </div>
    )
}
export const revalidate = 3600; // Regenerate the page every hour