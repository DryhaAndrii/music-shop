'use client'

import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import MyButton from "@/components/myButton/myButton";

interface Props {
    images: string[],
    setBigImage: React.Dispatch<React.SetStateAction<string>>,
}

export default function Scroll({ images, setBigImage }: Props) {
    const [firstImage, setFirstImage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    function upButtonHandler() {
        if (firstImage === 0 || isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setFirstImage(prev => prev - 1);
            setIsAnimating(false);
        }, 300);
    }

    function downButtonHandler() {
        if (firstImage === images.length - 4 || isAnimating) return;
        setIsAnimating(true);
        setTimeout(() => {
            setFirstImage(prev => prev + 1);
            setIsAnimating(false);
        }, 300);
    }

    return (
        <div className={styles.scroll}>
            {images.length > 4 && <MyButton
                disabled={firstImage === 0}
                onClick={upButtonHandler}>
                <span className="material-symbols-outlined"
                    style={{ transform: 'rotate(90deg)' }}>
                    chevron_left
                </span>
            </MyButton>}

            <div className={styles.wrapper}>
                <div
                    className={`${styles.thumbnails} ${isAnimating ? styles.animating : ''}`}
                    style={{ transform: `translateY(-${firstImage * 70}px)` }}
                >
                    {images.map((image, index) => (
                        <div key={index}>
                            <img
                                onClick={() => setBigImage(image)}
                                src={`data:image/png;base64, ${image}`}
                                alt={`Product ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {images.length > 4 && <MyButton
                disabled={firstImage === images.length - 4}
                onClick={downButtonHandler}>
                <span className="material-symbols-outlined"
                    style={{ transform: 'rotate(-90deg)' }}>
                    chevron_left
                </span>
            </MyButton>}

        </div>
    )
}