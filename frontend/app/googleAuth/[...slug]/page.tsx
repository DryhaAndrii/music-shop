'use client';

import { exchangeCode } from "@/functions/googleAuth";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import styles from './styles.module.scss';
export default function GoogleAuth({ params }: { params: { slug: string[] } }) {
    const router = useRouter();

    useEffect(() => {
        fetchExchangeCode(); 
    }, []);

    async function fetchExchangeCode() {
        const code = params.slug[0];
        if (!code) return router.push('/');
        await exchangeCode(code);
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrapper}>
                <div className={`${styles.ball} ${styles.blue}`}></div>
                <div className={`${styles.ball} ${styles.red}`}></div>
                <div className={`${styles.ball} ${styles.yellow}`}></div>
                <div className={`${styles.ball} ${styles.green}`}></div>
            </div>
        </div>
    );
}