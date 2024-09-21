import React, { useState } from 'react';
import Input from '@/components/input/input';
import styles from './styles.module.scss';
import MyButton from '@/components/myButton/myButton';

import { useAtom } from 'jotai';
import { addToastAtom } from "@/atoms/toasts";
import { TOAST_TYPES } from '@/types/toastTypes';

interface props {
    order: (name: string, surname: string, phone: string) => void;
    totalPrice: number
}

function Order({ order, totalPrice }: props) {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');

    const [, addToast] = useAtom(addToastAtom);

    const validate = () => {
        let isValid = true;
        // Name validation: only letters and numbers, minimum length 3
        if (!/^[a-zA-Z0-9]{3,}$/.test(name)) {
            addToast({ message: 'Name must be at least 3 characters long and contain only letters and numbers', type: TOAST_TYPES.ERROR });
            return isValid = false;
        }
        // Surname validation: only letters, minimum length 3
        if (!/^[a-zA-Z]{3,}$/.test(surname)) {
            addToast({ message: 'Surname must be at least 3 characters long and contain only letters', type: TOAST_TYPES.ERROR });
            return isValid = false;
        }
        // Phone validation: basic phone number validation
        if (!/^\+?[0-9]{10,15}$/.test(phone)) {
            addToast({ message: 'Phone must be valid', type: TOAST_TYPES.ERROR });
            return isValid = false;
        }
        return isValid;
    };

    const handleOrder = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (validate()) {
            order(name, surname, phone); // Call the order function if validation passes
        }
    };

    return (
        <form className={styles.orderForm}>
            <h2>Order</h2>
            <Input
                placeholder="Name"
                value={name}
                onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            <Input
                placeholder="Surname"
                value={surname}
                onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)}
            />
            <Input
                placeholder="Phone"
                value={phone}
                onChangeHandler={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
            />
            <MyButton onClick={handleOrder}>Place order</MyButton>
        </form>
    );
}

export default Order;