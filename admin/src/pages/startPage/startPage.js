import Categories from '../../components/categories/categories';
import { useState, useEffect } from 'react';
import fetchAllCategories from '../../functions/fetchAllCategories';

import './startPage.scss';

export default function StartPage() {
    const [categories, setCategories] = useState(null);
    useEffect(() => {
        fetchData();
        
    }, []);
    async function fetchData() {
        const categories = await fetchAllCategories();
        if (categories) {
            const filteredCategories = categories.filter(category => category.isSubcategory === false);
            setCategories(filteredCategories);
        }
    }

    function resetData() {
        setCategories(null);
    }
    return (
        <div className="startPage">
            <Categories fetchCategories={fetchData} resetCategories={resetData} categories={categories} categoryTitle={'Main categories'} />

        </div>
    )
}