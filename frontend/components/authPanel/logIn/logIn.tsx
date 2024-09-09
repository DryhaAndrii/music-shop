import MyButton, { BUTTON_COLOR } from "@/components/myButton/myButton";
import Input, { INPUT_COLOR, INPUT_TYPES } from "@/components/input/input";

import { useAtom } from 'jotai';
import { addToastAtom } from "@/atoms/toasts";
import { TOAST_TYPES } from "@/types/toastTypes";
import { useRef } from "react";
import login from "@/functions/login";
import { userAtom } from '@/atoms/user';


export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PASSWORD_REGEX = /^(?!.*\s)(?=.*\d)(?=.*[a-zA-Z]).{8,64}$/;

export default function LogIn({setLoading}: any) {
    const [, addToast] = useAtom(addToastAtom);
    const [user, setUser] = useAtom(userAtom);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);


    async function handleSubmit(event: any) {
        event.preventDefault()
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email || !EMAIL_REGEX.test(email)) {
            addToast({ message: 'Invalid email address.', type: TOAST_TYPES.ERROR });
            return;
        }

        if (!password || !PASSWORD_REGEX.test(password)) {
            addToast({ message: 'Password must be 8-64 characters long, contain at least one letter and one number, and cannot contain spaces.', type: TOAST_TYPES.ERROR });
            return;
        }
        setLoading(true);
        const response = await login(email, password);
        if (response.error) {
            setLoading(false);
            return addToast({ message: response.error, type: TOAST_TYPES.ERROR });
        }
        setLoading(false);
        addToast({ message: response.message, type: TOAST_TYPES.SUCCESS });
        setUser(response.user);
    }
    return (
        <>
            <Input reference={emailRef} type={INPUT_TYPES.EMAIL} color={INPUT_COLOR.DARK} placeholder="Email" />
            <Input reference={passwordRef} type={INPUT_TYPES.PASSWORD} color={INPUT_COLOR.DARK} placeholder="Password" />
            <MyButton onClick={handleSubmit} color={BUTTON_COLOR.DARK}>Log in</MyButton>
        </>
    );
}

