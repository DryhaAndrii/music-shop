


import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Form from '../../components/form/form';
import Input, { INPUT_TYPES } from '../../components/input/input';
import DragAndDrop from '../../components/dragAndDrop/dragAndDrop';
import fetchCategoriesByIds from '../../functions/fetchCategoriesByIds';
import axios from 'axios';
import { toast } from 'react-toastify';
import { myStore } from '../../store/store';
import './editCategoryPage.scss'

const apiUrl = process.env.REACT_APP_API_URL;

const NO_SPACE_AT_THE_START_REGEXP = /^\s+/;
const NO_MULTIPLE_SPACES_REGEXP = /\s\s+/g;

function EditCategoryPage() {
    const [category, setCategory] = useState({});
    const [categoryTitle, setCategoryTitle] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const { categoryId } = useParams();
    const setLoading = myStore(state => state.setLoading);

    useEffect(() => {//useEffect for category
        fetchCategory();
        console.log('useEffect category')
    },[]);
    useEffect(() => {//useEffect for title
        setCategoryTitle(category.title);
        console.log('useEffect title');
    }, [category]);

    async function fetchCategory() {
        const categories = await fetchCategoriesByIds([categoryId]);
        if (!categories || categories.length === 0) return;//if category not found return
        const newCategory = categories[0];
        setCategory(newCategory);
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
        if (categoryTitle.length < 3 || !uploadedFile) {
            toast.warn('Title should contain at least 3 characters and image should be set');
            return;
        }
        fetchData();
    };

    async function fetchData() {
        try {
            setLoading(true);

            const data = new FormData();
            data.append('file', uploadedFile);
            data.append('categoryTitle', categoryTitle);
            axios.post(`${apiUrl}updateCategory`, data, {
                withCredentials: true
            })
                .then(res => {
                    toast.success(res.data.message);
                    setLoading(false);
                })
                .catch(error => {
                    //checking if error is about no token
                    if (error.response.data.isToken === false) {
                        window.location.href = '/login';
                        return;
                    }
                    toast.error(error.response.data.message);
                    setLoading(false);
                });
        } catch (error) {
            toast.error('Some error happened during updating category: ' + error.message);
            console.log(error);
            setLoading(false);
        } 
    }

    return (
        <div className='editCategoryPage'>

            <div className='formWrapper'>
                <Form handleSubmit={handleSubmit}>
                    <Input type={INPUT_TYPES.TEXT} placeholder={'Category title'} value={categoryTitle} onChangeHandler={onInputChange} />
                    <Input type={INPUT_TYPES.SUBMIT} value="Edit category" />
                </Form>
            </div>
            <div className='dragAndDropWrapper'>
                <DragAndDrop onFilesAdded={handleFilesAdded} defaultImage={category.pictureCode}/>
            </div>
        </div>
    );
}

export default EditCategoryPage;