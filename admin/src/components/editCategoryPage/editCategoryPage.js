
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './editCategoryPage.scss';
import Categories from '../categories/categories';
const apiUrl = process.env.REACT_APP_API_URL;

function EditCategoryPage() {
    const [category, setCategory] = useState({});
    const { categoryId } = useParams();

    useEffect(() => {
        fetchCategoryById();
    }, []);

    async function fetchCategoryById() {
        try {
            axios.get(`${apiUrl}getCategoryById/${categoryId}`, {
                withCredentials: true
            })
                .then(res => {
                    console.log(res.data.category);
                    setCategory(res.data.category);
                })
        } catch (error) {
            toast.error('Some error happened during fetching category');
        }
    }

    return (
        <div className="editCategoryPage">
            <Categories categoryTitle={category.title} categories={category.subcategories} />
        </div>
    );
}

export default EditCategoryPage;