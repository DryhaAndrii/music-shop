'use client';

import { exchangeCode, exchangeCodeMessage } from "@/functions/googleAuth";
import { useEffect, useState } from "react";
import styles from './styles.module.scss';
import MyButton from "@/components/myButton/myButton";
export default function GoogleAuth({ params }: { params: { slug: string[] } }) {
    const [message, setMessage] = useState(':/');
    useEffect(() => {
        fetchExchangeCode();
    }, []);

    async function fetchExchangeCode() {
        const code = params.slug[0];
        if (!code) return;
        const response = await exchangeCodeMessage(code);
        if (response.error) {
            return setMessage('You should not be here');
        } 
        setMessage(response.message);
    }
    return (
        <div className={styles.container}>
            <h2>Looks like some error...</h2>
            <h3>{message}</h3>
            <MyButton onClick={() => window.location.href = '/'}>OK</MyButton>
        </div >
    );
}