import React from 'react';
import HorizontalScroller from "../horizontalScroller/horizontalScroller";
import DragAndDropWrapper from "./dragAndDropWrapper";
import Button from '../button/button';
import { toast } from 'react-toastify';
import './images.scss';

function Images({ images, setImages }) {
    function addImage() {
        if (images.length >= 10) {
            toast.warn('You cannot add more than 10 images');
            return;
        }
        setImages([...images, null]);
    }

    function onFileAdd(file, index) {
        setImages(prevImages => {
            const newImages = [...prevImages];
            newImages[index] = file;
            return newImages;
        });
    }

    function onFileRemove(index) {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    }

    return (
        <div className='scrollerWrapper'>
            <HorizontalScroller>
                <Button buttonText={'Add image'} onClick={addImage} />
                {images.map((image, index) => (
                    <DragAndDropWrapper
                        key={index}
                        index={index}
                        onFileAdd={onFileAdd}
                        onFileRemove={onFileRemove}
                        image={image}
                    />
                ))}
            </HorizontalScroller>
        </div>
    );
}

export default Images;