import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './dragAndDrop.scss';

const DragAndDrop = ({ onFilesAdded, defaultImage }) => {
    const [dragging, setDragging] = useState(false);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (defaultImage) {
            setPreview(`data:image/jpeg;base64,${defaultImage}`);
        }
    }, [defaultImage]);

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

    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            toast.warn('Only image files are allowed');
            return false;
        }
        if (file.size > 10 * 1024 * 1024) {
            toast.warn('File size should be less than 10 MB');
            return false;
        }
        return true;
    };

    const handleFiles = (file) => {
        if (validateFile(file)) {
            onFilesAdded(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            handleFiles(file);
        }
    };

    const handleChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFiles(file);
        }
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
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="fileUpload"
            />
            <label htmlFor="fileUpload" style={{ cursor: 'pointer' }}>
                {preview ? 'Change image' : 'Click or drag files here'}
            </label>
            {dragging && <div className="drag-overlay">Drop your files here</div>}
            {preview && <img src={preview} alt="Preview" className="image-preview" />}
        </div>
    );
};

export default DragAndDrop;