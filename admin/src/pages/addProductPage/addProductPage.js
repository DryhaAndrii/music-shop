import Form from '../../components/form/form';
import Input, { INPUT_TYPES } from '../../components/input/input';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Loading, { useLoading } from '../../components/Loading/loading';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TextEditor, useTextEditor } from '../../components/textEditor/textEditor';

import fetchCategoriesByIds from '../../functions/fetchCategoriesByIds';

import './addProductPage.scss';
import Images from '../../components/images/images';
import ProductAttributes from '../../components/productAttributes/productAttributes';

const apiUrl = process.env.REACT_APP_API_URL;

const NO_SPACE_AT_THE_START_REGEXP = /^\s+/;
const NO_MULTIPLE_SPACES_REGEXP = /\s\s+/g
const ONLY_DIGITS_REGEXP = /\D/g;

const TITLE = 'title';
const PRICE = 'price';

function AddProductPage() {
    const [productTitle, setProductTitle] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productAttributes, setProductAttributes] = useState({});
    const [attributesOptions,setAttributeOptions] = useState([]);
    const [images, setImages] = useState([]);
    const { categoryId } = useParams();

    const { editorState, setEditorState, handleKeyCommand, toggleBold, getRawContent } = useTextEditor();

    const { hideLoading, showLoading, isShow } = useLoading();

    useEffect(() => {
        fetchCategory();
    }, []);
    async function fetchCategory() {
        const categories = await fetchCategoriesByIds([categoryId]);
        if (!categories || categories.length === 0) {
            return;
        };//if category not found return

        const newProductAttributes = {};
        let newAttributeOptions = [];
        for (let attribute of categories[0].attributes) {
            newProductAttributes[attribute.name] = 'none';
            newAttributeOptions.push(attribute.options);
        }
        setProductAttributes(newProductAttributes);
        setAttributeOptions(newAttributeOptions);
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
        event.preventDefault();
        if (productTitle.length < 3) {
            toast.warn('Title should contain at least 3 characters');
            return;
        }
        if (productPrice.length < 1) {
            toast.warn('Price should be set');
            return;
        }
        const description = getRawContent();
        if (JSON.parse(description).blocks.every(block => block.text.trim() === '')) {
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
            data.append('productDescription', getRawContent()); // Отправляем содержимое редактора
            data.append('categoryId', categoryId);
            axios.post(`${apiUrl}addProduct`, data, {
                withCredentials: true
            })
                .then(res => {
                    toast.success(res.data.message);
                    hideLoading();
                })
                .catch(error => {
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
        <div className="container">


            <div className='addProductPage'>
                <Loading isShow={isShow} />
                <div className='formWrapper'>
                    <Form handleSubmit={handleSubmit}>
                        <div className='inputsWrapper'>
                            <Input type={INPUT_TYPES.TEXT} name={TITLE} placeholder={'Product title'} value={productTitle} onChangeHandler={onInputChange} />
                            <Input type={INPUT_TYPES.TEXT} name={PRICE} placeholder={'Product price'} value={productPrice} onChangeHandler={onInputChange} />
                            <Input type={INPUT_TYPES.SUBMIT} value="Create product" />
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

export default AddProductPage;