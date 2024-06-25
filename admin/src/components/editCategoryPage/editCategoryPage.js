import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './editCategoryPage.scss';
import Categories from '../categories/categories';
import fetchCategoriesByIds from '../../functions/fetchCategoriesByIds';

function EditCategoryPage() {
    const [category, setCategory] = useState({});
    const { categoryId } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const categories = await fetchCategoriesByIds([categoryId]);
        if (categories) {
            setCategory(categories[0]);
        }
    }

    return (
        <div className="editCategoryPage">
            <Categories
                categoryTitle={category.title}
                categories={[]}
                parentCategoryId={categoryId}
            />
        </div>
    );
}

export default EditCategoryPage;