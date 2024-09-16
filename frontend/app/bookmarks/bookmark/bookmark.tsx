
import Product from '@/types/product';
import styles from './styles.module.scss';
import MyButton from '@/components/myButton/myButton';
import { userAtom } from '@/atoms/user';
import { useAtom } from 'jotai';
import { addToastAtom } from "@/atoms/toasts";
import { TOAST_TYPES } from '@/types/toastTypes';
import addProductToUsersCart from '@/functions/addProductToUsersCart';
import deleteBookmarkFromUser from '@/functions/deleteBookmarkFromUser';

interface Props {
    product: Product,
    setLoading: ((arg0: boolean) => void),
}

export default function Bookmark({ product, setLoading }: Props) {
    const [user] = useAtom(userAtom);
    const [, addToast] = useAtom(addToastAtom);
    async function addToCartHandler() {
        try {
            setLoading(true);
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
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }
    async function deleteBookmark() {
        try {
            setLoading(true);
            const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            const newBookmarks = bookmarks.filter((id: string) => id !== product._id);

            localStorage.setItem('bookmarks', JSON.stringify(newBookmarks));
            window.dispatchEvent(new Event("storage"));// Send event to refresh storage

            if (user) {
                const response = await deleteBookmarkFromUser(product._id);
                if (response.message) {
                    return addToast({ message: response.message, type: TOAST_TYPES.SUCCESS });
                }
                return addToast({ message: response.error, type: TOAST_TYPES.ERROR });
            }
            addToast({ message: 'Product deleted from bookmarks', type: TOAST_TYPES.SUCCESS });
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <div className={styles.bookmark}>
            <div className={styles.imageWrapper}>
                <img src={`data:image/png;base64, ${product.pictureCodes[0]}`} alt="productImage" />
            </div>
            <div className={styles.title}>
                <p>{product.title}</p>
            </div>
            <div className={styles.price}>
                {product.discount && +product.discount > 0
                    ? <>
                        <p className={styles.rawPrice}>{product.price}$</p>
                        <p>{`${Math.round(+product.price * (100 - +product.discount) / 100)}$`}</p>
                    </>
                    : <p className={styles.actualPrice}>{product.price}$</p>
                }
            </div>
            <div className={styles.buttons}>
                <MyButton onClick={addToCartHandler}>
                    <span className="material-symbols-outlined">
                        add_shopping_cart
                    </span>
                </MyButton>
                <MyButton onClick={deleteBookmark}>
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                </MyButton>
            </div>
        </div>
    );
}
