


import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Form from '../../components/form/form';
import Input, { INPUT_TYPES } from '../../components/input/input';
import DragAndDrop from '../../components/dragAndDrop/dragAndDrop';
import CategoryAttributes from '../../components/categoryAttributes/categoryAttributes';
import fetchCategoriesByIds from '../../functions/fetchCategoriesByIds';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loading, { useLoading } from '../../components/Loading/loading';
import './editCategoryPage.scss'

const apiUrl = process.env.REACT_APP_API_URL;

const NO_SPACE_AT_THE_START_REGEXP = /^\s+/;
const NO_MULTIPLE_SPACES_REGEXP = /\s\s+/g;

function EditCategoryPage() {
    const [category, setCategory] = useState({});
    const [categoryTitle, setCategoryTitle] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [attributes, setAttributes] = useState([]);
    const { categoryId } = useParams();
    const { hideLoading, showLoading, isShow } = useLoading();

    useEffect(() => {//useEffect for category
        fetchCategory();
        console.log('useEffect category')
    }, []);
    useEffect(() => {
        setCategoryTitle(category.title);
        if (category.attributes) {
            setAttributes(category.attributes);
        }
        if (category.pictureCode) {
            // Convert base64 to Blob
            fetch(`data:image/jpeg;base64,${category.pictureCode}`)
                .then(res => res.blob())
                .then(blob => {
                    // creating object File from Blob
                    const file = new File([blob], "category_image.jpg", { type: "image/jpeg" });
                    setUploadedFile(file); // Setting created file to state
                });

        }
        console.log('useEffect title');
    }, [category]);

    async function fetchCategory() {
        showLoading();
        const categories = await fetchCategoriesByIds([categoryId]);
        if (!categories || categories.length === 0) {
            hideLoading();
            return;
        };//if category not found return
        const newCategory = categories[0];
        setCategory(newCategory);
        hideLoading();
    }

    const onInputChange = (e) => {
        const newValue = e.target.value
            .replace(NO_SPACE_AT_THE_START_REGEXP, '')
            .replace(NO_MULTIPLE_SPACES_REGEXP, ' ')
            .slice(0, 50);
        setCategoryTitle(newValue);
    };

    const handleFilesAdded = (file) => {
        setUploadedFile(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (categoryTitle.length < 1 || !uploadedFile) {
            toast.warn('Title should contain at least 1 character and image should be set');
            return;
        }
        if (attributes.length < 1) {
            toast.warn('Each category should have at least 1 attribute');
            return;
        }
        for (let attribute of attributes) {
            if (attribute.name.length < 1) {
                toast.warn('Each attribute name should contain at least 1 characters');
                return;
            }

            if (attribute.options.length < 2) {
                toast.warn('Each attribute should have at least 2 options');
                return;
            }

            for (let option of attribute.options) {
                if (option.length < 1) {
                    toast.warn('Each option name should contain at least 1 character');
                    return;
                }
            }
        }
        fetchData();
    };

    async function fetchData() {
        try {
            showLoading();

            const data = new FormData();
            data.append('file', uploadedFile);
            data.append('categoryTitle', categoryTitle);
            data.append('attributes', JSON.stringify(attributes));
            axios.put(`${apiUrl}editCategory/${categoryId}`, data, {
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
            toast.error('Some error happened during updating category: ' + error.message);
            console.log(error);
            hideLoading();
        }
    }

    return (
        <div className='container'>
            <div className='editCategoryPage'>
                <Loading isShow={isShow} />
                <div className='formWrapper'>
                    <Form handleSubmit={handleSubmit}>
                        <Input type={INPUT_TYPES.TEXT} placeholder={'Category title'} value={categoryTitle} onChangeHandler={onInputChange} />
                        <Input type={INPUT_TYPES.SUBMIT} value="Edit category" />
                    </Form>
                </div>
                <div className='dragAndDropWrapper'>
                    <DragAndDrop onFilesAdded={handleFilesAdded} defaultImage={uploadedFile} />
                </div>
                <div className='attributesWrapper'>
                    <CategoryAttributes attributes={attributes} setAttributes={setAttributes} />
                </div>
            </div>
        </div>
    );
}

export default EditCategoryPage;