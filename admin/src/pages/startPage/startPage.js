import Categories from '../../components/categories/categories';
import { useState, useEffect } from 'react';
import fetchAllCategories from '../../functions/fetchAllCategories';

import { toast } from "react-toastify";//this should be deleted
import axios from "axios";//this should be deleted

import './startPage.scss';
import Orders from '../../components/orders/orders';

const apiUrl = process.env.REACT_APP_API_URL;//this should be deleted

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
            <Orders />
        </div>
    )
}