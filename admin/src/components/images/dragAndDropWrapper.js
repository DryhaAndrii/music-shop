import React from 'react';
import DragAndDrop from "../dragAndDrop/dragAndDrop";
import Button from '../button/button';

function DragAndDropWrapper({ onFileAdd, onFileRemove, index, image }) {
    function handleFilesAdded(file) {
        onFileAdd(file, index);
    }

    function handleRemove() {
        onFileRemove(index);
    }

    return (
        <div className='dragAndDropWrapper'>
            <Button buttonText={'Remove'} onClick={handleRemove} />
            <DragAndDrop
                onFilesAdded={handleFilesAdded}
                defaultImage={image}
                id={`drag${index}`}
            />
        </div>
    );
}

export default DragAndDropWrapper;