import './addCategoryPage.scss';
import Form from '../../components/form/form';
import Input, { INPUT_TYPES } from '../../components/input/input';
import { useState } from 'react';
import DragAndDrop from '../../components/dragAndDrop/dragAndDrop';
import { toast } from 'react-toastify';
import Loading, { useLoading } from '../../components/Loading/loading';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CategoryAttributes from '../../components/categoryAttributes/categoryAttributes'; 
const apiUrl = process.env.REACT_APP_API_URL;

const NO_SPACE_AT_THE_START_REGEXP = /^\s+/;
const NO_MULTIPLE_SPACES_REGEXP = /\s\s+/g;

function AddCategoryPage() {
    const [categoryTitle, setCategoryTitle] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [attributes, setAttributes] = useState([]);
    const { parentCategoryId } = useParams();
    const { hideLoading, showLoading, isShow } = useLoading();


    const handleFilesAdded = (file) => {
        setUploadedFile(file);
    };

    const onInputChange = (e) => {
        const newValue = e.target.value
            .replace(NO_SPACE_AT_THE_START_REGEXP, '')
            .replace(NO_MULTIPLE_SPACES_REGEXP, ' ')
            .slice(0, 50);
        setCategoryTitle(newValue);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (categoryTitle.length < 3 || !uploadedFile) {
            toast.warn('Title should contain at least 3 characters and image should be set');
            return;
        }
        if (attributes.length < 3) {
            toast.warn('Each category should have at least 3 attributes');
            return;
        }
        for (let attribute of attributes) {
            if (attribute.name.length < 3) {
                toast.warn('Each attribute name should contain at least 3 characters');
                return;
            }

            if (attribute.options.length < 3) {
                toast.warn('Each attribute should have at least 3 options');
                return;
            }

            for (let option of attribute.options) {
                if (option.length < 3) {
                    toast.warn('Each option name should contain at least 3 characters');
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
            data.append('parentCategoryId', parentCategoryId);
            data.append('attributes', JSON.stringify(attributes));
            axios.post(`${apiUrl}addCategory`, data, {
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
            toast.error('Some error happened during adding category');
            hideLoading();
        }
    }

    return (
        <div className='container'>
            <div className='addCategoryPage'>

                <Loading isShow={isShow} />
                <div className='formWrapper'>
                    <Form handleSubmit={handleSubmit}>
                        <Input type={INPUT_TYPES.TEXT} placeholder={'Category title'} value={categoryTitle} onChangeHandler={onInputChange} />
                        <Input type={INPUT_TYPES.SUBMIT} value="Create category" />

                    </Form>
                </div>
                <div className='dragAndDropWrapper'>
                    <DragAndDrop onFilesAdded={handleFilesAdded} />
                </div>
                <div className='attributesWrapper'>
                    <CategoryAttributes attributes={attributes} setAttributes={setAttributes} />
                </div>
            </div>
        </div>
    );
}
export default AddCategoryPage;