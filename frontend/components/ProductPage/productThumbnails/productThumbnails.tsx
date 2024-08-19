'use client'
import { useState } from "react";
import Scroll from "./scroll/scroll";
import styles from "./styles.module.scss";

interface Props {
    images: string[]
}
export default function ProductThumbnails({ images }: Props) {
    const [bigImage, setBigImage] = useState(images[0])
    return (
        <div className={styles.productThumbnails}>
            <div className={styles.scrollWrapper}>
                <Scroll images={images} setBigImage={setBigImage} />
            </div>
            <div className={styles.imageWrapper}>
                <img
                    className={styles.image}
                    src={`data:image/png;base64, ${bigImage}`}
                    alt="productPicture" />
            </div>


        </div>
    )
}