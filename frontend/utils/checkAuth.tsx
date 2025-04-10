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
    let waitingTooLong  = false;

    //This should be deleted if you have server that not hibernate and works always
    const timeoutId = setTimeout(() => {
        setToast({ message: 'Establishing connection... Response delayed due to server hibernation.', type: TOAST_TYPES.INFO });
        waitingTooLong  = true;
      }, 5000); 
    
    const user = await checkAuth();
    setUser(user || null);

    //This should be deleted as well
    if (waitingTooLong ) setToast({ message: 'Connection established. Server active.', type: TOAST_TYPES.INFO });
    clearTimeout(timeoutId);
  }
  return null;
};
export default CheckAuth;
