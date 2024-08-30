'use client'

import checkAuth from '@/functions/checkAuth';
import { useEffect } from 'react';



const CheckAuth = () => {
    useEffect(() => {
        checkAuthorization();
    }, [])
    async function checkAuthorization() {
        checkAuth();
    }
    return null;
};

export default CheckAuth;