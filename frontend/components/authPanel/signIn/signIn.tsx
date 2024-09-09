import MyButton, { BUTTON_COLOR } from "@/components/myButton/myButton";
import Input, { INPUT_COLOR, INPUT_TYPES } from "@/components/input/input";
import { useRef } from "react";
import { useAtom } from 'jotai';
import { addToastAtom } from "@/atoms/toasts";
import { TOAST_TYPES } from "@/types/toastTypes";
import signUp from "@/functions/signUp";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PASSWORD_REGEX = /^(?!.*\s)(?=.*\d)(?=.*[a-zA-Z]).{6,64}$/;  
export const NAME_REGEX = /^[a-zA-Z0-9\s]{3,30}$/;  


export default function SignIn({setLoading}: any) {
    const [, addToast] = useAtom(addToastAtom);

    const emailRef = useRef<HTMLInputElement>(null);
    const nameRef = useRef<HTMLInputElement>(null);
    const firstPassword = useRef<HTMLInputElement>(null);
    const secondPassword = useRef<HTMLInputElement>(null);
    async function handleSubmit(event: any) {
        event.preventDefault();
        const email = emailRef.current?.value;
        const name = nameRef.current?.value;
        const firstPasswordValue = firstPassword.current?.value;
        const secondPasswordValue = secondPassword.current?.value;

        if (!email || !EMAIL_REGEX.test(email)) {
            addToast({ message: 'Invalid email address.', type: TOAST_TYPES.ERROR });
            return;
        }

        if (!name || !NAME_REGEX.test(name)) {
            addToast({ message: 'Username must be 3-30 characters long and can contain only letters and spaces.', type: TOAST_TYPES.ERROR });
            return;
        }

        if (!firstPasswordValue || !PASSWORD_REGEX.test(firstPasswordValue)) {
            addToast({
                message: 'Password must be 8-64 characters long, contain at least one letter and one number, and cannot contain spaces.',
                type: TOAST_TYPES.ERROR
            });
            return;
        }
        if (firstPasswordValue !== secondPasswordValue) {
            addToast({ message: 'Passwords do not match.', type: TOAST_TYPES.ERROR });
            return;
        }
        setLoading(true);
        const response = await signUp(email, firstPasswordValue, name);
        if (response.error) {
            setLoading(false);
            return addToast({ message: response.error, type: TOAST_TYPES.ERROR });
        }
        setLoading(false);
        addToast({ message: response.message, type: TOAST_TYPES.SUCCESS });
        window.location.href = '/verifyEmail/'; 

    }

    return (
        <>
            <Input reference={emailRef} type={INPUT_TYPES.EMAIL} color={INPUT_COLOR.DARK} name="email" placeholder="Email" />
            <Input reference={nameRef} type={INPUT_TYPES.TEXT} color={INPUT_COLOR.DARK} name="username" placeholder="Username" />
            <Input reference={firstPassword} type={INPUT_TYPES.PASSWORD} color={INPUT_COLOR.DARK} name="password" placeholder="Password" />
            <Input reference={secondPassword} type={INPUT_TYPES.PASSWORD} color={INPUT_COLOR.DARK} name="repeatPassword" placeholder="Repeat password" />
            <MyButton onClick={handleSubmit} color={BUTTON_COLOR.DARK}>Sign up</MyButton>
        </>
    );
}

