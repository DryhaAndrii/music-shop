
import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import Product from '@/types/product';
import MyButton from '../myButton/myButton';

export enum CARD_TYPES {
    PRODUCT = 'product',
}
interface CardProps {
    type?: CARD_TYPES;
    product?: Product;
}

const UNDERSCORE_REGEX = / /g;

const cx = classNames.bind(styles);

function Card({ type = CARD_TYPES.PRODUCT, product }: CardProps) {


    const className = cx({
        card: true,
        [`card--${type}`]: true,
    });

    function handleClick() {
        if (!product) return;
        window.location.href = product.title.replace(UNDERSCORE_REGEX, "_");
    }

    switch (type) {
        case CARD_TYPES.PRODUCT:
            if (!product) {
                return null;
            }
            return (
                <div className={className}>
                    <div className={styles.top}>
                        {/* If we have more that 1 picture we adding ability to
                    display second picture on hover */}

                        {product.pictureCodes.length > 1 ? (
                            <div className={styles.imageContainer} onClick={handleClick}>
                                <img
                                    className={styles.firstImage}
                                    src={`data:image/png;base64, ${product.pictureCodes[0]}`}
                                    alt="categoryPicture"
                                />
                                <img
                                    className={styles.secondImage}
                                    src={`data:image/png;base64, ${product.pictureCodes[1]}`}
                                    alt="categoryPicture"
                                />
                            </div>
                        )
                            : (
                                <div className={styles.imageContainer}>
                                    <img
                                        className={styles.image}
                                        src={`data:image/png;base64, ${product.pictureCodes[0]}`}
                                        alt="categoryPicture" />
                                </div>
                            )}



                    </div>
                    <div className={styles.bot}>
                        <h3>{product.title}</h3>
                        {/* Getting first paragraph of description */}
                        <p>{`${product?.description.html.split('<p>').join('').split('</p>')[0].substring(0, 120)}...`}</p>
                        <div>
                            <p>{`${product.price}$`}</p>
                            <MyButton>
                                <span className="material-symbols-outlined">
                                    add_shopping_cart
                                </span>
                            </MyButton>
                        </div>

                    </div>
                </div >
            );
        default:
            return null;
    }
}

export default Card;