"use client";

import checkAuth from "@/functions/checkAuth";
import { useEffect } from "react";

import { useAtom } from "jotai";
import { userAtom } from "@/atoms/user";
import { addToastAtom } from "@/atoms/toasts";
import { TOAST_TYPES } from "@/types/toastTypes";

const CheckAuth = () => {
  const [user, setUser] = useAtom(userAtom);
  const [toast, setToast] = useAtom(addToastAtom);
  useEffect(() => {
    checkAuthorization();
  }, []);
  async function checkAuthorization() {

    //This should be deleted if you have server that not hibernate and works always
    const timeoutId = setTimeout(() => {
        setToast({ message: 'The server is waking up from hibernation... This may take a little while. Until it wakes up, some functions may not work properly.', type: TOAST_TYPES.INFO });
    }, 5000); 
    
    const user = await checkAuth();
    setUser(user || null);

    //And this
    clearTimeout(timeoutId);
  }
  return null;
};
export default CheckAuth;
