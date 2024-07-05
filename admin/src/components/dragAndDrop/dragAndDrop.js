import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import './dragAndDrop.scss';

const DragAndDrop = ({ onFilesAdded, defaultImage, id }) => {
    const [dragging, setDragging] = useState(false);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (defaultImage) {
            if (typeof defaultImage === 'string') {
                setPreview(`data:image/jpeg;base64,${defaultImage}`);
            } else if (defaultImage instanceof File) {
                const reader = new FileReader();
                reader.onload = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(defaultImage);
            }
        }
    }, [defaultImage]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    }, []);

    const validateFile = useCallback((file) => {
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
    }, []);

    const handleFiles = useCallback((file) => {
        if (validateFile(file)) {
            if (onFilesAdded) {
                onFilesAdded(file);
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreview(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    }, [onFilesAdded, validateFile]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            const file = files[0];
            handleFiles(file);
        }
    }, [handleFiles]);

    const handleChange = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            handleFiles(file);
        }
    }, [handleFiles]);

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
                id={`fileUpload-${id}`}
            />
            <label htmlFor={`fileUpload-${id}`} style={{ cursor: 'pointer' }}>
                {preview ? 'Change image' : 'Click or drag files here'}
            </label>
            {dragging && <div className="drag-overlay">Drop your files here</div>}
            {preview && <img src={preview} alt="Preview" className="image-preview" />}
        </div>
    );
};

export default DragAndDrop;