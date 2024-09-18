
import Product from '@/types/product';
import styles from './styles.module.scss';
import MyButton from '@/components/myButton/myButton';
import { userAtom } from '@/atoms/user';
import { useAtom } from 'jotai';
import { addToastAtom } from "@/atoms/toasts";
import { TOAST_TYPES } from '@/types/toastTypes';
import deleteFromUserCart from '@/functions/deleteFromCart';

interface Props {
    product: Product,
    quantity: number,
    setLoading: ((arg0: boolean) => void),
}

export default function CartItem({ product, quantity, setLoading }: Props) {
    const [user] = useAtom(userAtom);
    const [, addToast] = useAtom(addToastAtom);

    async function deleteFromCart() {
        try {
            setLoading(true);

            const cart: { product: string; quantity: number }[] = JSON.parse(localStorage.getItem('cart') || '[]');

            const newCart = cart.map(item => {
                if (item.product === product._id) {
                    if (item.quantity > 1) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return null;
                    }
                }
                return item;
            }).filter(item => item !== null);

            localStorage.setItem('cart', JSON.stringify(newCart));
            window.dispatchEvent(new Event("storage"));

            if (user) {
                const response = await deleteFromUserCart(product._id);

                if (response.message) {
                    addToast({ message: response.message, type: TOAST_TYPES.SUCCESS });
                } else {
                    addToast({ message: response.error, type: TOAST_TYPES.ERROR });
                }
            } else {
                addToast({ message: 'Product deleted from cart', type: TOAST_TYPES.SUCCESS });
            }
        } catch (error) {
            console.error(error);
            addToast({ message: 'Error deleting product from cart', type: TOAST_TYPES.ERROR });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className={styles.cartItem}>
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
            <div className={styles.quantity}>
                <p>{quantity}</p>
            </div>

            <div className={styles.buttons}>
                <MyButton onClick={deleteFromCart}>
                    <span className="material-symbols-outlined">
                        delete
                    </span>
                </MyButton>
            </div>
        </div>
    );
}
