'use client';
import { exchangeCode } from "@/functions/googleAuth";
import { useEffect } from "react";


export default function GoogleAuth({ params }: { params: { slug: string[] } }) {
    useEffect(() => {
        fetchExchangeCode();
    }, [])
    async function fetchExchangeCode() {
        const code = params.slug[0];
        if(!code) return;
        await exchangeCode(code);
    }
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Logging you in...</h1>
        </div>
    )
}