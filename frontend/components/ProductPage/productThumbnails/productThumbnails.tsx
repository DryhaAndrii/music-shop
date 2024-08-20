'use client'
import { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import Scroll from "./scroll/scroll";
import styles from "./styles.module.scss";
import MyButton from "@/components/myButton/myButton";


interface Props {
    images: string[]
}
export default function ProductThumbnails({ images }: Props) {
    const [bigImage, setBigImage] = useState(images[0]);
    const [showScaledImage, setShowScaledImage] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Setting flag to true when component mounts
    }, []);

    return (
        <div className={styles.productThumbnails}>
            <div className={styles.scrollWrapper}>
                <Scroll images={images} setBigImage={setBigImage} />
            </div>
            <div className={styles.imageWrapper}>
                <img
                    onClick={() => setShowScaledImage(true)}
                    className={styles.image}
                    src={`data:image/png;base64, ${bigImage}`}
                    alt="productPicture"
                />
            </div>
            {isClient && showScaledImage && createPortal(
                <div className={styles.scaledImage}>
                    <MyButton onClick={() => setShowScaledImage(false)}>
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </MyButton>
                    <img
                        className={styles.image}
                        src={`data:image/png;base64, ${bigImage}`}
                        alt="productPicture"
                    />
                </div>,
                window.document.body
            )}
        </div>
    );
}