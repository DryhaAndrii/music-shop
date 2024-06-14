import React, { useState } from 'react';
import './dragAndDrop.scss';
const DragAndDrop = ({ onFilesAdded }) => {
    const [dragging, setDragging] = useState(false);
    const [preview, setPreview] = useState(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            onFilesAdded(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        onFilesAdded(file);
        const reader = new FileReader();
        reader.onload = (event) => {
            setPreview(event.target.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div
            className={`drag-and-drop-input ${dragging ? 'dragging' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <input
                onChange={handleChange}
                placeholder={'Click or drag files here'}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="fileUpload"
            />
            <label htmlFor="fileUpload" style={{ cursor: 'pointer' }}>
                {'Click or drag files here'}
            </label>
            {dragging && <div className="drag-overlay">Drop your files here</div>}
            {preview && <img src={preview} alt="Preview" className="image-preview" />}
        </div>
    );
};

export default DragAndDrop;