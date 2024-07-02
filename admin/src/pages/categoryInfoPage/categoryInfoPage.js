import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './categoryInfoPage.scss';
import Categories from '../../components/categories/categories';
import fetchCategoriesByIds from '../../functions/fetchCategoriesByIds';
import fetchProductsByIds from '../../functions/fetchProductsByIds';
import Products from '../../components/products/products';

function CategoryInfoPage() {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState();
    const { categoryId } = useParams();

    useEffect(() => {//useEffect for category
        fetchCategory();
    }, []);

    useEffect(() => {//useEffect for products

        if (!category.products) return
        if (category.products.length === 0) {
            setProducts([]);
            return
        }
        fetchProducts();
    }, [category]);


    async function fetchCategory() {
        const categories = await fetchCategoriesByIds([categoryId]);
        if (!categories || categories.length === 0) return;//if category not found return
        const newCategory = categories[0];

        setCategory(newCategory);
    }
    function resetCategories() {
        setCategory({});
    }
    function resetProducts() {
        setProducts(null);
    }

    async function fetchProducts() {
        const products = await fetchProductsByIds(category.products);
        if (!products) return;//if products not found return
        setProducts(products);
    }

    return (
        <div className="categoryInfoPage">
            <Categories
                categoryTitle={category.title}
                categories={category.handledSubcategories}
                parentCategoryId={categoryId}
                fetchCategories={fetchCategory}
                resetCategories={resetCategories}
            />
            <Products
                categoryId={categoryId}
                products={products}
                categoryTitle={category.title}
                resetProducts={resetProducts}
                fetchProducts={fetchProducts}
            />
        </div>
    );
}
export default CategoryInfoPage;