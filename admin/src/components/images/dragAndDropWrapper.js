import React from 'react';
import DragAndDrop from "../dragAndDrop/dragAndDrop";

function DragAndDropWrapper({ onFileAdd, onFileRemove, index, image }) {
    function handleFilesAdded(file) {
        onFileAdd(file, index);
    }

    function handleRemove() {
        onFileRemove(index);
    }

    return (
        <div className='dragAndDropWrapper'>
            <DragAndDrop 
                onFilesAdded={handleFilesAdded} 
                defaultImage={image} 
                id={`drag${index}`} 
            />
            <button onClick={handleRemove}>Remove</button>
        </div>
    );
}

export default DragAndDropWrapper;