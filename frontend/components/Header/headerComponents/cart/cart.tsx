'use client'
import { useState } from 'react';
import MyButton from '@/components/myButton/myButton';
import styles from '../../styles.module.scss';
import AuthPanel from '@/components/authPanel/authPanel';

function Cart() {
    const [isAuthPanelOpen, setIsAuthPanelOpen] = useState(false);

    return (
        <div className={styles.cart}>
            <MyButton >
                <span className="material-symbols-outlined">bookmark</span>
            </MyButton>
            <MyButton >
                <span className="material-symbols-outlined">
                    shopping_cart
                </span>
            </MyButton>
            <MyButton onClick={() => setIsAuthPanelOpen(!isAuthPanelOpen)}>
                <span className="material-symbols-outlined">
                    person
                </span>
            </MyButton>
            {isAuthPanelOpen && <AuthPanel hideAuthPanel={() => setIsAuthPanelOpen(false)}/>}
        </div>
    );
}

export default Cart;