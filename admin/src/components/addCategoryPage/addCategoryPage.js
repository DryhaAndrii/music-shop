import './addCategoryPage.scss';
import Form from '../form/form';
import Input, { INPUT_TYPES } from '../input/input';
import { useState } from 'react';
import DragAndDrop from '../dragAndDrop/dragAndDrop';

function AddCategoryPage() {
    const [categoryTitle, setCategoryTitle] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);

    const handleFilesAdded = (file) => {
        setUploadedFile(file);
    };

    const onInputChange = (e) => {
        setCategoryTitle(e.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submit', categoryTitle, uploadedFile);
    };

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