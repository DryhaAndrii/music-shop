'use client'
import { useState } from 'react';
import MyButton from '@/components/myButton/myButton';
import styles from '../../styles.module.scss';
import AuthPanel from '@/components/authPanel/authPanel';
import { userAtom } from '@/atoms/user';
import { useAtom } from 'jotai';
import UserPanel from '@/components/userPanel/userPanel';
function Cart() {
    const [showAuthPanel, setShowAuthPanel] = useState(false);
    const [showUserPanel, setShowUserPanel] = useState(false);
    const [user] = useAtom(userAtom);
    function userButtonHandler() {
        if (user === null) {
            return setShowAuthPanel(!showAuthPanel);
        }
        if (user) {
            return setShowUserPanel(!showUserPanel)
        }
    }
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
            <MyButton onClick={userButtonHandler}>
                <span className="material-symbols-outlined">
                    person
                </span>
            </MyButton>
            {showAuthPanel && <AuthPanel hideAuthPanel={() => setShowAuthPanel(false)} />}
            {showUserPanel && <UserPanel hideUserPanel={() => setShowUserPanel(false)} />}
        </div>
    );
}

export default Cart;