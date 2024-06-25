import Categories from '../categories/categories';
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
        console.log(categories);
        if (categories) {
            const filteredCategories = categories.filter(category => category.isSubcategory === false);
            setCategories(filteredCategories);
        }
    }
    return (
        <div className="startPage">
            <Categories categories={categories} categoryTitle={'Main categories'} />
        </div>
    )
}