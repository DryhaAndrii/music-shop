'use client'
import Input, { INPUT_TYPES } from '@/components/input/input';
import styles from './styles.module.scss';
import { useState, useRef } from 'react';
import { verifyByCode } from '@/functions/signUp';
import MyButton from '@/components/myButton/myButton';
import { useAtom } from 'jotai';
import { addToastAtom } from "@/atoms/toasts";
import { TOAST_TYPES } from '@/types/toastTypes';
import Loading from '@/components/loading/loading';

export default function SignUp() {
    const [, addToast] = useAtom(addToastAtom);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [verified, setVerified] = useState<boolean | null>(null)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    async function submitButtonHandler() {
        if (code.some(char => char === '')) return addToast({ message: 'Enter your code', type: TOAST_TYPES.INFO });
        setIsLoading(true);
        const response = await verifyByCode(code.join(''));
        if (response) {
            addToast({ message: 'Verification successful', type: TOAST_TYPES.SUCCESS });
            setIsLoading(false);
            return setVerified(true);
        }
        addToast({ message: 'Code expired of invalid', type: TOAST_TYPES.ERROR });
        setIsLoading(false);
        setVerified(false);
    }

    function inputChangeHandler(event: any, index: number) {
        const { value } = event.target;

        // Checking if input is not empty and only one symbol
        if (value.length === 1 && /\S/.test(value)) {
            setCode((prevCode) => {
                const updatedCode = [...prevCode];
                updatedCode[index] = value.toUpperCase();
                return updatedCode;
            });

            // focus next input
            if (index < 5 && inputRefs.current[index + 1]) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    }

    function handleKeyDown(event: any, index: number) {
        // If the backspace is pressed and current input is not empty
        if (event.key === 'Backspace') {
            setCode((prevCode) => {
                const updatedCode = [...prevCode];
                // Clearing the current input value
                updatedCode[index] = '';
                return updatedCode;
            });

            // If input is already empty, move to the previous one
            if (index > 0 && !code[index]) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    }
    function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
        const pastedData = event.clipboardData.getData('text');

        // Checking if clipboard contains string of 6 symbols
        if (pastedData.length === 6) {
            setCode(pastedData.split('').map(char => char.toUpperCase()));

            // Setting focus to the last input
            inputRefs.current[5]?.focus();
        }
    }
    function okButtonHandler() {
        window.location.href = '/';
    }

    if (verified === true) {
        return (
            <div className={`${styles.wrapper} ${styles.messaged}`}>
                <div className="container">
                    <h3>Code verified. You can now sign in with your email and password</h3>
                    <MyButton onClick={okButtonHandler}>Ok</MyButton>
                </div>
            </div>
        )
    }
    if (verified === false) {
        return (
            <div className={`${styles.wrapper} ${styles.messaged}`}>
                <div className="container">
                    <h3>Your code expired or invalid</h3>
                    <MyButton onClick={okButtonHandler}>Ok</MyButton>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.wrapperWrapper}>
            {isLoading && <Loading />}
            <div className={styles.wrapper}>
                <div className="container">
                    <h3>Check your email for the code and enter it</h3>
                    <div className={styles.inputs}>
                        {code.map((char, index) => (
                            <Input
                                key={index}
                                reference={(el: any) => inputRefs.current[index] = el}
                                type={INPUT_TYPES.TEXT}
                                name={String(index)}
                                value={char}
                                onChangeHandler={(e) => inputChangeHandler(e, index)}
                                keyDownHandler={(e) => handleKeyDown(e, index)}
                                maximumLength={1}
                                onPasteHandler={handlePaste}
                            />
                        ))}
                    </div>
                    <MyButton onClick={submitButtonHandler}>Submit</MyButton>
                </div>
            </div>
        </div>
    );
}