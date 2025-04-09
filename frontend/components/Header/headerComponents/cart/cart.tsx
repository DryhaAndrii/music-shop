'use client';
import { useState, useEffect } from 'react';
import MyButton from '@/components/myButton/myButton';
import styles from '../../styles.module.scss';
import AuthPanel from '@/components/authPanel/authPanel';
import { userAtom } from '@/atoms/user';
import { useAtom } from 'jotai';
import UserPanel from '@/components/userPanel/userPanel';
import Link from 'next/link';

function Cart() {
    const [showAuthPanel, setShowAuthPanel] = useState(false);
    const [showUserPanel, setShowUserPanel] = useState(false);
    const [user] = useAtom(userAtom);
    const [bookmarkCount, setBookmarkCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        setShowAuthPanel(false);
        setShowUserPanel(false);
    }, [user]);

    useEffect(() => {
        function updateCounts() {
            if (typeof window !== 'undefined') {
                const bookmarks: string[] = JSON.parse(localStorage.getItem('bookmarks') || '[]');
                setBookmarkCount(bookmarks.length);

                const cart: { product: string; quantity: number }[] = JSON.parse(localStorage.getItem('cart') || '[]');
                const totalQuantity = cart.reduce((accumulator, currentValue) => accumulator + currentValue.quantity, 0);

                setCartCount(totalQuantity);
            }
        }

        updateCounts();

        window.addEventListener('storage', updateCounts);

        return () => {
            window.removeEventListener('storage', updateCounts);
        };

    }, []);

    function userButtonHandler() {
        if (user === null) {
            return setShowAuthPanel(!showAuthPanel);
        }
        if (user) {
            return setShowUserPanel(!showUserPanel);
        }
    }

    return (
        <div className={styles.cart}>
            <Link href={'/bookmarks'} style={{ textDecoration: 'none' }}>
                <MyButton>
                    <span className="material-symbols-outlined">bookmark</span>
                    {bookmarkCount > 0
                        ? <span className={styles.count}>{bookmarkCount}</span>
                        : ''
                    }
                </MyButton>
            </Link>
            <Link href={'/cart'} style={{ textDecoration: 'none' }}>
                <MyButton>
                    <span className="material-symbols-outlined">shopping_cart</span>
                    {cartCount > 0
                        ? <span className={styles.count}>{cartCount}</span>
                        : ''
                    }
                </MyButton>
            </Link>
            <MyButton onClick={userButtonHandler}>
                <span className="material-symbols-outlined">person</span>
            </MyButton>

            {showAuthPanel && <AuthPanel hideAuthPanel={() => setShowAuthPanel(false)} />}
            {showUserPanel && <UserPanel hideUserPanel={() => setShowUserPanel(false)} />}
        </div>
    );
}

export default Cart;