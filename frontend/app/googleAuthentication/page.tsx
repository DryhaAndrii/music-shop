'use client';

import { secondQuery } from "@/functions/googleAuth";
import { useEffect } from "react";



export default function GoogleAuthentication() {
    useEffect(() => {
        fetchSecondQuery();
    }, [])
    async function fetchSecondQuery() {
        await secondQuery();
    }
    return (
        <div>
            <h1>Google Authentication</h1>
        </div>
    )
}