
import Categories from '../categories/categories';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import './startPage.scss';
export default function StartPage() {
    const [categories, setCategories] = useState(null);
    
    const apiUrl = process.env.REACT_APP_API_URL;
    
    useEffect(() => {
        fetchAllCategories();
    }, []);
    async function fetchAllCategories() {
        try {
            axios.get(`${apiUrl}getAllCategories`, {
                withCredentials: true
            })
                .then(res => {
                    setCategories(res.data.categories);
                })
        } catch (error) {
            toast.error('Some error happened during fetching categories');
        }
    }
    return (
        <div className="startPage">
            <Categories categories={categories}/>

        </div>
    )
}