import './addCategoryPage.scss';
import Form from '../form/form';
import Input, { INPUT_TYPES } from '../input/input';
import { useState} from 'react';
import DragAndDrop from '../dragAndDrop/dragAndDrop';
import { toast } from 'react-toastify';
import { myStore } from '../../store/store';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const NO_SPACE_AT_THE_START_REGEXP = /^\s+/;
const NO_MULTIPLE_SPACES_REGEXP = /\s\s+/g;

function AddCategoryPage() {
    const [categoryTitle, setCategoryTitle] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const { parentCategoryId } = useParams();


    const setLoading = myStore(state => state.setLoading);

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
        fetchData();
    };
    async function fetchData() {
        try {
            setLoading(true);

            const data = new FormData();
            data.append('file', uploadedFile);
            data.append('categoryTitle', categoryTitle);
            data.append('parentCategoryId', parentCategoryId);
            axios.post(`${apiUrl}addCategory`, data, {
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
            toast.error('Some error happened during adding category');
            setLoading(false);
        } 
    }

    return (
        <div className='addCategoryPage'>
            <div className='formWrapper'>
                <Form handleSubmit={handleSubmit}>
                    <Input type={INPUT_TYPES.TEXT} placeholder={'Category title'} value={categoryTitle} onChangeHandler={onInputChange} />
                    <Input type={INPUT_TYPES.SUBMIT} value="Create category" />
                </Form>
            </div>
            <div className='dragAndDropWrapper'>
                <DragAndDrop onFilesAdded={handleFilesAdded} />
            </div>
        </div>
    );
}
export default AddCategoryPage;