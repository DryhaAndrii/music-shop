'use client'

import styles from "./styles.module.scss";
import Input, { INPUT_TYPES } from "@/components/input/input";
import MyButton from "@/components/myButton/myButton";
import { useState } from "react";
import Prices from "./prices/prices";
import Product from "@/types/product";
import { userAtom } from '@/atoms/user';
import { useAtom } from 'jotai';
import { addToastAtom } from "@/atoms/toasts";
import { TOAST_TYPES } from "@/types/toastTypes";
import addBookmarkToUser from "@/functions/addBookmarkToUser";
import { cartItem } from "@/types/user";
import addProductToUsersCart from "@/functions/addProductToUsersCart";
import Loading from "@/components/loading/loading";

interface Props {
    product: Product
}
export default function ProductPurchasing({ product }: Props) {
    const [user] = useAtom(userAtom);
    const [, addToast] = useAtom(addToastAtom);
    const [loading, setLoading] = useState(false);

    async function addToBookmarksHandler() {
        if (!product) return;

        try {
            setLoading(true);
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
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }

    }
    async function addToCartHandler() {
        if (!product) return;

        try {
            setLoading(true);
            const cart: cartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');

            // Searching existing product with this id
            const existingItem = cart.find(item => item.product === product?._id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ product: product?._id, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            window.dispatchEvent(new Event("storage"));

            if (user) {
                const response = await addProductToUsersCart(product._id);

                if (response.message) {
                    return addToast({ message: response.message, type: TOAST_TYPES.SUCCESS });
                }
                return addToast({ message: response.error, type: TOAST_TYPES.ERROR });
            }

            addToast({ message: 'Product added to cart', type: TOAST_TYPES.SUCCESS });
        } catch (error) {
            console.error(error);
            addToast({ message: 'Error adding product to cart', type: TOAST_TYPES.ERROR });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.productPurchasing}>
            {loading ? <Loading /> : null}
            <div className={styles.priceWrapper}>
                <Prices discount={product.discount} price={product.price} />
            </div>
            <div className={styles.buttonsWrapper}>
                <div className={styles.buttons}>
                    <MyButton onClick={addToCartHandler}>
                        <span className="material-symbols-outlined">
                            add_shopping_cart
                        </span>
                        Buy
                    </MyButton>
                    <MyButton onClick={addToBookmarksHandler}>
                        <span className="material-symbols-outlined">
                            bookmark
                        </span>
                    </MyButton>
                </div>
            </div>
        </div>
    )
}