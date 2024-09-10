'use client';
import { useEffect, useState, useRef } from 'react';
import styles from './styles.module.scss';
import Loading from '@/components/loading/loading';
import Input, { INPUT_TYPES } from '@/components/input/input';
import MyButton from '@/components/myButton/myButton';
import { useAtom } from 'jotai';
import { userAtom } from '@/atoms/user';
import { addToastAtom } from "@/atoms/toasts";
import { TOAST_TYPES } from "@/types/toastTypes";
import changePassword, { checkCodeForPasswordChanging, setNewPassword } from '@/functions/changePassword';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PASSWORD_REGEX = /^(?!.*\s)(?=.*\d)(?=.*[a-zA-Z]).{6,64}$/;

export default function ChangePassword() {
    const [user] = useAtom(userAtom);
    const [, addToast] = useAtom(addToastAtom);
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState<string | null>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(user){
            window.location.href = '/';
            return setMessage('You should not be here');
        }
        console.log(user);
        const params = new URLSearchParams(window.location.search);
        const codeFromUrl = params.get('code');
        if (codeFromUrl) {
            checkCode(codeFromUrl);
        }
    }, [user])

    async function checkCode(code: string) {
        const response = await checkCodeForPasswordChanging(code);
        if (response) {
            return setCode(code);
        }
        addToast({ message: 'Code expired or invalid', type: TOAST_TYPES.ERROR });
        setMessage('Code expired or invalid');
    }

    async function sendEmailButtonHandler(event: any) {
        event.preventDefault();
        const email = emailInputRef.current?.value;

        if (!email || !EMAIL_REGEX.test(email)) {
            addToast({ message: 'Invalid email address.', type: TOAST_TYPES.ERROR });
            return;
        }
        setIsLoading(true);
        const response = await changePassword(email);
        if (response.success) {
            addToast({ message: response.message, type: TOAST_TYPES.SUCCESS });
            setIsLoading(false);
            return setMessage(response.message);
        }
        addToast({ message: response.message, type: TOAST_TYPES.ERROR });
        setMessage(response.message);
        setIsLoading(false);
    }
    async function setNewPasswordButtonHandler(event: any) {
        event.preventDefault();
        const password = passwordInputRef.current?.value;
        if (!password || !PASSWORD_REGEX.test(password)) {
            addToast({ message: 'Password should be 6-64 characters long, and contain at least one letter and one number.', type: TOAST_TYPES.ERROR });
            return;
        }
        if (!code) {
            setMessage('Code expired or invalid');
            return addToast({ message: 'Code expired or invalid', type: TOAST_TYPES.ERROR });

        }

        setIsLoading(true);
        const response = await setNewPassword(password, code);
        if (response.success) {
            addToast({ message: response.message, type: TOAST_TYPES.SUCCESS });
            setIsLoading(false);
            return setMessage(response.message);
        }
        addToast({ message: response.message, type: TOAST_TYPES.ERROR });
        setMessage(response.message);
        setIsLoading(false);
    }

    if (!code && message === "") {
        return (
            <div className={styles.wrapperWrapper}>
                {isLoading && <Loading />}
                <div className={styles.wrapper}>
                    <div className="container">
                        <form>
                            <h3>Enter your email</h3>
                            <Input type={INPUT_TYPES.EMAIL} placeholder='Email' reference={emailInputRef} />
                            <MyButton onClick={sendEmailButtonHandler}>Send email</MyButton>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
    if (message !== "") {
        return (
            <div className={styles.wrapperWrapper}>
                <div className={styles.wrapper}>
                    <div className="container">
                        <h3>{message}</h3>
                        <MyButton onClick={() => window.location.href = '/'}>Ok</MyButton>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.wrapperWrapper}>
            {isLoading && <Loading />}
            <div className={styles.wrapper}>
                <div className="container">
                    <form>
                        <h3>Enter new password</h3>
                        <Input reference={passwordInputRef} placeholder='Password' type={INPUT_TYPES.PASSWORD} />
                        <MyButton onClick={setNewPasswordButtonHandler}>Send password</MyButton>
                    </form>
                </div>
            </div>
        </div>
    );
};