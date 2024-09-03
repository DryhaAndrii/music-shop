'use client'

import checkAuth from '@/functions/checkAuth';
import { useEffect } from 'react';

import { useAtom } from 'jotai';
import { userAtom } from '@/atoms';

const CheckAuth = () => {
    const [user, setUser] = useAtom(userAtom);
    useEffect(() => {
        checkAuthorization();
    }, [])
    async function checkAuthorization() {
        const user = await checkAuth();
        if (user) {
            setUser(user);
        }
        else (setUser(null))
    }
    return null;
};
export default CheckAuth;