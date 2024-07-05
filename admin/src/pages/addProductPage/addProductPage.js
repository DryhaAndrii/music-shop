import Form from '../../components/form/form';
import Input, { INPUT_TYPES } from '../../components/input/input';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Loading, { useLoading } from '../../components/Loading/loading';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './addProductPage.scss';
import Images from '../../components/images/images';

const apiUrl = process.env.REACT_APP_API_URL;

const NO_SPACE_AT_THE_START_REGEXP = /^\s+/;
const NO_MULTIPLE_SPACES_REGEXP = /\s\s+/g
const ONLY_DIGITS_REGEXP = /\D/g;

const TITLE = 'title';
const PRICE = 'price';
const DESCRIPTION = 'description';

function AddProductPage() {
    const [productTitle, setProductTitle] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [images, setImages] = useState([]);
    const { categoryId } = useParams();

    const { hideLoading, showLoading, isShow } = useLoading();

    const onInputChange = (e) => {
        const { name } = e.target;
        if (name === PRICE) {// if its price input we need to remove all non digits
            const newValue = e.target.value
                .replace(ONLY_DIGITS_REGEXP, '')
                .slice(0, 10);
            setProductPrice(newValue);
            return;
        }

        const newValue = e.target.value
            .replace(NO_SPACE_AT_THE_START_REGEXP, '')
            .replace(NO_MULTIPLE_SPACES_REGEXP, ' ')
            .slice(0, 50);

        if (name === TITLE) {
            setProductTitle(newValue);
        }
        if (name === DESCRIPTION) {
            setProductDescription(newValue);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (productTitle.length < 3) {
            toast.warn('Title should contain at least 3 characters');
            return;
        }
        if (productPrice.length < 1) {
            toast.warn('Price should be set');
            return;
        }
        if (productDescription.length < 3) {
            toast.warn('Description should contain at least 3 characters');
            return;
        }
        if (images.length === 0) {
            toast.warn('You should add at least 1 image');
            return;
        }
        if (images.includes(null)) {
            toast.warn('You should set all images, or delete empty images');
            return;
        }
        fetchData();
    };
    async function fetchData() {
        try {
            showLoading();

            const data = new FormData();
            images.forEach(image => {
                data.append('images', image); 
            });
            data.append('productTitle', productTitle);
            data.append('productPrice', productPrice);
            data.append('productDescription', productDescription);
            data.append('categoryId', categoryId);
            axios.post(`${apiUrl}addProduct`, data, {
                withCredentials: true
            })
                .then(res => {
                    toast.success(res.data.message);
                    hideLoading();
                })
                .catch(error => {
                    //checking if error is about no token
                    if (error.response.data.isToken === false) {
                        window.location.href = '/login';
                        return;
                    }
                    toast.error(error.response.data.message);
                    hideLoading();
                });
        } catch (error) {
            toast.error('Some error happened during adding product');
            hideLoading();
        }
    }

    return (
        <div className='addProductPage'>
            <Loading isShow={isShow} />
            <div className='formWrapper'>
                <Form handleSubmit={handleSubmit}>
                    <Input type={INPUT_TYPES.TEXT} name={TITLE} placeholder={'Product title'} value={productTitle} onChangeHandler={onInputChange} />
                    <Input type={INPUT_TYPES.TEXT} name={DESCRIPTION} placeholder={'Product description'} value={productDescription} onChangeHandler={onInputChange} />
                    <Input type={INPUT_TYPES.TEXT} name={PRICE} placeholder={'Product price'} value={productPrice} onChangeHandler={onInputChange} />
                    <Input type={INPUT_TYPES.SUBMIT} value="Create product" />
                </Form>
            </div>
            <div className='imagesWrapper'>
                <Images images={images} setImages={setImages} />
            </div>

        </div>
    );
}
export default AddProductPage;