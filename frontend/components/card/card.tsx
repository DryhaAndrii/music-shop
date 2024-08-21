
import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import Product from '@/types/product';
import MyButton from '../myButton/myButton';
import Link from 'next/link';
import Category from '@/types/category';
import DiscountBadge from '../discountBadge/discountBadge';

export enum CARD_TYPES {
    PRODUCT = 'product',
    CATEGORY = 'category'
}
interface CardProps {
    type?: CARD_TYPES;
    product?: Product;
    category?: Category;
}

const UNDERSCORE_REGEX = / /g;

const cx = classNames.bind(styles);

function Card({ type = CARD_TYPES.PRODUCT, product, category }: CardProps) {


    const className = cx({
        card: true,
        [`card--${type}`]: true,
    });

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
                            <Link href={`/${product.url}`} className={styles.imageContainer}>
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
                            </Link>
                        )
                            : (
                                <Link href={`/${product.url}`} className={styles.imageContainer}>
                                    <img
                                        className={styles.image}
                                        src={`data:image/png;base64, ${product.pictureCodes[0]}`}
                                        alt="categoryPicture" />
                                </Link>
                            )}
                    </div>
                    <div className={styles.bot}>
                        <h3>{product.title}</h3>
                        {/* Getting first paragraph of description */}
                        <p>{`${product?.description.html.split('<p>').join('').split('</p>')[0].substring(0, 120)}...`}</p>
                        <div>
                            {product.discount && +product.discount > 0
                                ? <div>
                                    <span>
                                        <span className={styles.oldPrice}>{`${product.price}$`}</span>
                                        <span className={styles.discount}>
                                            <DiscountBadge>
                                                {` - ${product.discount}%`}
                                            </DiscountBadge>

                                        </span>
                                    </span>
                                    <p>{`${Math.round(+product.price * (100 - +product.discount) / 100)}$`}</p>
                                </div>
                                : <p>{`${product.price}$`}</p>
                            }

                            <MyButton>
                                <span className="material-symbols-outlined">
                                    add_shopping_cart
                                </span>
                            </MyButton>
                        </div>

                    </div>
                </div >
            );
        case CARD_TYPES.CATEGORY:
            if (!category) return null;
            return (
                <div className={className}>
                    <div className={styles.top}>
                        <Link href={`/${category.url}`} className={styles.imageContainer}>
                            <img
                                className={styles.image}
                                src={`data:image/png;base64, ${category.pictureCode}`}
                                alt="categoryPicture" />
                        </Link>
                    </div>
                    <div className={styles.bot}>
                        <h3>{category.title}({category.subcategories.length + category.products.length})</h3>
                    </div>
                </div >
            );
        default:
            return null;
    }
}

export default Card;