'use client';
import Loading from '@/components/loading/loading';
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import Product from '@/types/product';
import getProductsByIds from '@/functions/getProductsByIds';
import { cartItem } from '@/types/user';
import CartItem from './cartItem/cartItem';
import Order from './order/order';
import { userAtom } from '@/atoms/user';
import { useAtom } from 'jotai';
import { addToastAtom } from "@/atoms/toasts";
import { TOAST_TYPES } from '@/types/toastTypes';
import placeOrder from '@/functions/placeOrder';

interface CartItem {
    product: Product;
    quantity: number;
}

function Cart() {
    const [cart, setCart] = useState<CartItem[] | null>([]);
    const [user] = useAtom(userAtom);
    const [, addToast] = useAtom(addToastAtom);
    const [totalPrice, setTotalPrice] = useState(0)
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        window.addEventListener('storage', fetchCart);

        fetchCart();

        return () => {
            window.removeEventListener('storage', fetchCart);
        };
    }, []);
    async function fetchCart() {

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (!cart || cart.length === 0) return setCart(null);

        const productsId = cart.map((item: cartItem) => item.product);
        if (!productsId || productsId.length === 0) return setCart(null);


        setLoading(true);
        const response = await getProductsByIds(productsId, 1, 1000);
        if (!response || !response.products) return setLoading(false);

        setCart(response.products.map((product: any) =>
            ({ product, quantity: cart.find((item: cartItem) => item.product === product._id)?.quantity || 0 }))
        );

        const price = response.products.reduce((accumulator: number, currentValue: { _id: string, price: number, discount?: number }) => {
            const quantity = cart.find((item: cartItem) => item.product === currentValue._id)?.quantity || 0;
            const discount = currentValue.discount && currentValue.discount > 0 ? currentValue.discount : 0;
            const discountedPrice = currentValue.price * (1 - discount / 100);
            return accumulator + Math.round(discountedPrice * quantity);
        }, 0);
        setTotalPrice(price);

        setLoading(false);
    }
    async function order(name: string, surname: string, phone: string) {
        setLoading(true);

        const products = cart?.map((item: CartItem) => ({ productId: item.product._id, quantity: item.quantity }));
        console.log(name, surname, phone, products, totalPrice);
        const response = await placeOrder(name, surname, phone, totalPrice, products);

        setLoading(false);
        
        if (response.message) return addToast({ message: response.message, type: TOAST_TYPES.SUCCESS });

        addToast({ message: response.error, type: TOAST_TYPES.ERROR });
    }

    if (!cart) {
        return (
            <div className="container" style={{ textAlign: 'center' }}>
                <h2>Cart</h2>
                <h3>You don't have any product in your cart</h3>
            </div>
        )
    }

    return (
        <div className={styles.cartWrapper}>
            {isLoading && <Loading />}
            <div className="container">
                <h2>Cart</h2>
                <div className={styles.cart}>
                    <div className={styles.example}>
                        <div>Image</div>
                        <div>Title</div>
                        <div>Price</div>
                        <div>Quantity</div>
                    </div>
                    {cart.map((cartItem) => (
                        <CartItem quantity={cartItem.quantity} product={cartItem.product} key={cartItem.product._id} setLoading={setLoading} />
                    ))}
                    <h3>Total price: {totalPrice}$</h3>
                    <Order order={order} totalPrice={totalPrice} />
                </div>
            </div>
        </div>
    );
}

export default Cart;