import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './editCategoryPage.scss';
import Categories from '../categories/categories';
import fetchCategoriesByIds from '../../functions/fetchCategoriesByIds';

function EditCategoryPage() {
    const [category, setCategory] = useState({});
    const { categoryId } = useParams();

    useEffect(() => {
        fetchCategory();

    }, []);

    async function fetchCategory() {
        const categories = await fetchCategoriesByIds([categoryId]);
        if (!categories || categories.length === 0) return;//if category not found return
        const newCategory = categories[0];

        setCategory(newCategory);
    }
    function resetCategories(){
        setCategory({});
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
        </div>
    );
}
export default EditCategoryPage;