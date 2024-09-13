'use client';
import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';
import Product from '@/types/product';
import MyButton from '../myButton/myButton';
import Link from 'next/link';
import Category from '@/types/category';
import DiscountBadge from '../discountBadge/discountBadge';

import { userAtom } from '@/atoms/user';
import { useAtom } from 'jotai';
import { addToastAtom } from "@/atoms/toasts";
import addBookmarkToUser from '@/functions/addBookmarkToUser';
import { TOAST_TYPES } from '@/types/toastTypes';
import { CARD_TYPES } from './cardTypes';
import addProductToUsersCart from '@/functions/addProductToUsersCart';



interface CardProps {
    type?: CARD_TYPES;
    product?: Product;
    category?: Category;
}

const UNDERSCORE_REGEX = / /g;
const ONLY_LETTERS = /<[^>]+>/g;

const cx = classNames.bind(styles);

function Card({ type = CARD_TYPES.PRODUCT, product, category }: CardProps) {
    const [user] = useAtom(userAtom);
    const [, addToast] = useAtom(addToastAtom);

    const className = cx({
        card: true,
        [`card--${type}`]: true,
    });

    async function addToBookmarksHandler() {
        if (!product) return;
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
        if (bookmarks.includes(product._id)) {
            return addToast({ message: "This product is already bookmarked", type: TOAST_TYPES.INFO });
        }

        localStorage.setItem('bookmarks', JSON.stringify([...bookmarks, product?._id]));
        window.dispatchEvent(new Event("storage"));// Send event to refresh storage

        if (user && !user.bookmarks.includes(product._id)) {
            const response = await addBookmarkToUser(product._id);
            if (response.message) {
                return addToast({ message: response.message, type: TOAST_TYPES.SUCCESS });
            }
            return addToast({ message: response.error, type: TOAST_TYPES.ERROR });
        }
        addToast({ message: 'Bookmark added', type: TOAST_TYPES.SUCCESS });
    }
    async function addToCartHandler() {
        if (!product) return;
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (cart.includes(product._id)) {
            return addToast({ message: "This product is already in your cart", type: TOAST_TYPES.INFO });
        }

        localStorage.setItem('cart', JSON.stringify([...cart, product?._id]));
        window.dispatchEvent(new Event("storage"));// Send event to refresh storage

        if (user && !user.cart.includes(product._id)) {
            const response = await addProductToUsersCart(product._id);
            if (response.message) {
                return addToast({ message: response.message, type: TOAST_TYPES.SUCCESS });
            }
            return addToast({ message: response.error, type: TOAST_TYPES.ERROR });
        }
        addToast({ message: 'Product added to cart', type: TOAST_TYPES.SUCCESS });
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
                        <h3>
                            {/* Getting first 25 letters of title */}
                            {product.title.length > 25
                                ? `${product.title.substring(0, product.title.substring(0, 25).lastIndexOf(' '))}...`
                                : product.title}
                        </h3>
                        {/* Getting first paragraph of description */}
                        <p>{`${product?.description.html.replace(ONLY_LETTERS, '').substring(0, 120)}`}...</p>
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

                            <div>
                                <MyButton onClick={addToCartHandler}>
                                    <span className="material-symbols-outlined">
                                        add_shopping_cart
                                    </span>
                                </MyButton>
                                <MyButton onClick={addToBookmarksHandler}>
                                    <span className="material-symbols-outlined">
                                        bookmark_add
                                    </span>
                                </MyButton>
                            </div>

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