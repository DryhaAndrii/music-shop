import Category from "@/types/category"
import styles from "./styles.module.scss"
import getCategoryByTitle from "@/functions/getCategoryByTitle";
import getProductsByIds from "@/functions/getProductsByIds";
import ProductDisplayPanel from "./productDisplayPanel/productDisplayPanel";

const SPACE_REGEX = / /g;

export default async function CategoryPage({ categoryTitle }: { categoryTitle: string }) {
    const category: Category = await getCategoryByTitle(categoryTitle);

    if (category.products.length === 0 && category.subcategories.length === 0) return (
        <div>
            <h1>{category.title}</h1>
            <p>{category.title} have no products or subcategories</p>
        </div>
    );
    if (category.products.length > 0) {
        const data = await getProductsByIds(category.products, 1, 10);
        if (!data) return;
        return (
            <ProductDisplayPanel
                initialProducts={data.products}
                initialPages={data.pages}
                categoryAttributes={category.attributes}
            />
        );
    }
    return (
        <div>
            <h1>{category.title}</h1>
        </div>
    )
}