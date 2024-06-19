import './categories.scss';
import Card, { CARD_TYPES } from '../../card/card';
import HorizontalScroller from '../../horizontalScroller/horizontalScroller';
import { useState, useEffect } from 'react';
import { myStore } from '../../../store/store';
import axios from 'axios';
import { toast } from 'react-toastify';
export default function Categories() {

    const [categories, setCategories] = useState([]);
    const apiUrl = process.env.REACT_APP_API_URL;
    const setLoading = myStore(state => state.setLoading);

    useEffect(() => {
        fetchData();
    }, []);

    function addCardClickHandler() {
        window.location.href = '/addCategory';
    }

    async function fetchData() {
        try {
            setLoading(true);
            axios.get(`${apiUrl}getAllCategories`, {
                withCredentials: true
            })
                .then(res => {
                    console.log(res.data)
                    setCategories(res.data.categories);
                })
        } catch (error) {
            toast.error('Some error happened during fetching categories');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="categories">
            <div className='container'><h1>Categories</h1></div>
            <HorizontalScroller>
                {categories.map((category) =>
                    <Card type={CARD_TYPES.CATEGORY} text={`${category.title} (${category.products.length})`} key={category._id} pictureCode={category.pictureCode} />
                )}

                <Card type={CARD_TYPES.ADDCARD} text={'Add new category'} cardClickHandler={addCardClickHandler} />
            </HorizontalScroller>
        </div>
    )
}