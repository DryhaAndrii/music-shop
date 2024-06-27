import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './editCategoryPage.scss';
import Categories from '../categories/categories';
import fetchCategoriesByIds from '../../functions/fetchCategoriesByIds';
import fetchProductsByIds from '../../functions/fetchProductsByIds';
import Products from '../products/products';

function EditCategoryPage() {
    const [category, setCategory] = useState({});
    const [products, setProducts] = useState([]);
    const { categoryId } = useParams();

    useEffect(() => {//useEffect for category
        fetchCategory();
    }, []);

    useEffect(() => {//useEffect for products
        
        if(!category.products || category.products.length===0) return
        console.log('fetching products');
        //fetchProducts();
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

    async function fetchProducts() {
        if(category.subcategories.products===0) return;//if no subcategories return
        const products = await fetchProductsByIds(category.products);
        if (!products) return;//if products not found return
        setProducts(products);

    }

    return (
        <div className="editCategoryPage">
            <Categories
                categoryTitle={category.title}
                categories={category.handledSubcategories}
                parentCategoryId={categoryId}
                fetchCategories={fetchCategory}
                resetCategories={resetCategories}
            />
            <Products categoryId={categoryId} products={products} />
        </div>
    );
}
export default EditCategoryPage;