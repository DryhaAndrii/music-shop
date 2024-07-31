import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

import Form from '../../components/form/form';
import Input, { INPUT_TYPES } from '../../components/input/input';
import Loading, { useLoading } from '../../components/Loading/loading';
import Images from '../../components/images/images';
import { TextEditor, useTextEditor } from '../../components/textEditor/textEditor';
import fetchProductsByIds from '../../functions/fetchProductsByIds';
import fetchCategoriesByIds from '../../functions/fetchCategoriesByIds';
import './editProductPage.scss';
import ProductAttributes from '../../components/productAttributes/productAttributes';

const apiUrl = process.env.REACT_APP_API_URL;

const NO_SPACE_AT_THE_START_REGEXP = /^\s+/;
const NO_MULTIPLE_SPACES_REGEXP = /\s\s+/g;
const ONLY_DIGITS_REGEXP = /\D/g;

const TITLE = 'title';
const PRICE = 'price';

function EditProductPage() {
    const [productTitle, setProductTitle] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [productAttributes, setProductAttributes] = useState({});
    const [attributesOptions, setAttributeOptions] = useState([]);
    const [images, setImages] = useState([]);
    const { productId } = useParams();

    const { hideLoading, showLoading, isShow } = useLoading();

    const { editorState, setEditorState, handleKeyCommand, toggleBold } = useTextEditor();

    useEffect(() => {//useEffect for fetching info about product
        fetchProduct();
    }, []);
    useEffect(() => {//useEffect for fetching info about parentCategoryAttributes
        fetchCategory();
    }, [parentCategoryId]);
    async function fetchCategory() {
        if (parentCategoryId === ''||!parentCategoryId) return;
        const categories = await fetchCategoriesByIds([parentCategoryId]);
        if (!categories || categories.length === 0) {
            return;
        };//if category not found return

        let newAttributeOptions = [];
        for (let attribute of categories[0].attributes) {
            newAttributeOptions.push(attribute.options);
        }
        setAttributeOptions(newAttributeOptions);
    }

    async function fetchProduct() {
        showLoading();
        const products = await fetchProductsByIds([productId]);
        if (!products || products.length === 0) {
            toast.error('Product not found');
            hideLoading();
            return;
        }

        const product = products[0];
       
        setProductTitle(product.title);
        setProductPrice(product.price);
        setParentCategoryId(product.parentCategoryId);
        setProductAttributes(product.attributes);

        if (product.description && product.description.raw) {
            try {
                const contentState = convertFromRaw(JSON.parse(product.description.raw));
                setEditorState(EditorState.createWithContent(contentState));
            } catch (error) {
                console.error('Error parsing product description:', error);
                toast.error('Error loading product description');
            }
        }

        const newImages = await Promise.all(
            product.pictureCodes.map(async (pictureCode) => {
                if (pictureCode) {
                    const response = await fetch(`data:image/jpeg;base64,${pictureCode}`);
                    const blob = await response.blob();
                    return new File([blob], "category_image.jpg", { type: "image/jpeg" });
                }
                return null;
            })
        );

        setImages(newImages.filter(img => img !== null));
        hideLoading();
    }

    const onInputChange = (e) => {
        const { name } = e.target;
        if (name === PRICE) {
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
    };

    const handleSubmit = (event) => {
        //Checking all data that we should send to server
        event.preventDefault();
        if (productTitle.length < 1) {
            toast.warn('Title should contain at least 1 character');
            return;
        }
        if (productPrice.length < 1) {
            toast.warn('Price should be set');
            return;
        }
        const description = convertToRaw(editorState.getCurrentContent());
        if (description.blocks.every(block => block.text.trim() === '')) {
            toast.warn('Description should not be empty');
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
        for (let attribute in productAttributes) {
            if (productAttributes[attribute] === null) {
                toast.warn('All attributes should be set');
                return;
            }
        }
        //if everything is ok we can send data
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
            data.append('productAttributes', JSON.stringify(productAttributes));
            data.append('productDescription', JSON.stringify(convertToRaw(editorState.getCurrentContent())));

            await axios.put(`${apiUrl}editProduct/${productId}`, data, {
                withCredentials: true
            });

            toast.success('Product updated successfully');
            hideLoading();
        } catch (error) {
            if (error.response?.data?.isToken === false) {
                window.location.href = '/login';
            } else {
                toast.error(error.response?.data?.message || 'Some error happened during updating product');
            }
            hideLoading();
        }
    }

    return (
        <div className='container'>


            <div className="editProductPage">
                <Loading isShow={isShow} />
                <div className='formWrapper'>
                    <Form handleSubmit={handleSubmit}>
                        <div className='inputsWrapper'>
                            <Input type={INPUT_TYPES.TEXT} name={TITLE} placeholder={'Product title'} value={productTitle} onChangeHandler={onInputChange} />
                            <Input type={INPUT_TYPES.TEXT} name={PRICE} placeholder={'Product price'} value={productPrice} onChangeHandler={onInputChange} />
                            <Input type={INPUT_TYPES.SUBMIT} value="Update product" />
                        </div>
                        <div className='textEditorWrapper'>
                            <h3>Description</h3>
                            <TextEditor
                                editorState={editorState}
                                setEditorState={setEditorState}
                                handleKeyCommand={handleKeyCommand}
                                onBoldClick={toggleBold}
                            />
                        </div>
                    </Form>
                </div>
                <div className='imagesWrapper'>
                    <Images images={images} setImages={setImages} />
                </div>
                <div className='attributesWrapper'>
                    <ProductAttributes attributesOptions={attributesOptions} productAttributes={productAttributes} setProductAttributes={setProductAttributes} />
                </div>
            </div>
        </div>
    );
}

export default EditProductPage;