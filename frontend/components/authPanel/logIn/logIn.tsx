import MyButton, { BUTTON_COLOR } from "@/components/myButton/myButton";
import Input, { INPUT_COLOR, INPUT_TYPES } from "@/components/input/input";

import { useAtom } from 'jotai';
import { addToastAtom } from "@/atoms/toasts";
import { TOAST_TYPES } from "@/types/toastTypes";
import { useRef } from "react";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PASSWORD_REGEX = /^(?!.*\s)(?=.*\d)(?=.*[a-zA-Z]).{8,64}$/;

export default function LogIn() {
    const [, addToast] = useAtom(addToastAtom);

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);


    function handleSubmit(event: any) {
        event.preventDefault();
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

        addToast({ message: `Email: ${email}, Password: ${password}`, type: TOAST_TYPES.SUCCESS });
    }
    return (
        <>
            <Input reference={emailRef} type={INPUT_TYPES.EMAIL} color={INPUT_COLOR.DARK} placeholder="Email" />
            <Input reference={passwordRef} type={INPUT_TYPES.PASSWORD} color={INPUT_COLOR.DARK} placeholder="Password" />
            <MyButton onClick={handleSubmit} color={BUTTON_COLOR.DARK}>Log in</MyButton>
        </>
    );
}

