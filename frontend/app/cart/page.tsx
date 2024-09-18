'use client';
import Loading from '@/components/loading/loading';
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import Product from '@/types/product';
import getProductsByIds from '@/functions/getProductsByIds';
import { cartItem } from '@/types/user';
import CartItem from './cartItem/cartItem';

interface CartItem {
    product: Product;
    quantity: number;
}

function Cart() {
    const [cart, setCart] = useState<CartItem[] | null>([]);
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
        setLoading(false);
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
                </div>
            </div>
        </div>
    );
}

export default Cart;