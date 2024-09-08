'use client'
import Input, { INPUT_TYPES } from '@/components/input/input';
import styles from './styles.module.scss';
import { useState, useRef } from 'react';
import { verifyByCode } from '@/functions/signUp';
import MyButton from '@/components/myButton/myButton';

export default function SignUp() {
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const [verified, setVerified] = useState<boolean | null>(null)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    async function submitButtonHandler() {
        if (code.some(char => char === '')) return;
        const response = await verifyByCode(code.join(''));
        if (response) {
            return setVerified(true);
        }
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
        // deleting symbol and focusing previous input on backspace button
        if (event.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    }
    function okButtonHandler() {
        window.location.href = '/';
    }

    if (verified === true) {
        return (
            <div className={styles.wrapper}>
                <div className="container">
                    <h3>Code verified. You can now sign in with your email and password</h3>
                    <MyButton onClick={okButtonHandler}>Ok</MyButton>
                </div>
            </div>
        )
    }
    if (verified === false) {
        return (
            <div className={styles.wrapper}>
                <div className="container">
                    <h3>Your code expired or invalid</h3>
                    <MyButton onClick={okButtonHandler}>Ok</MyButton>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.wrapper}>
            <div className="container">
                <h3>Check your email for the code and enter it</h3>
                <div className={styles.inputs}>
                    {code.map((char, index) => (
                        <Input
                            key={index}
                            reference={(el: any) => inputRefs.current[index] = el} // Привязываем ref к каждому инпуту
                            type={INPUT_TYPES.TEXT}
                            name={String(index)}
                            value={char}
                            onChangeHandler={(e) => inputChangeHandler(e, index)}
                            keyDownHandler={(e) => handleKeyDown(e, index)}
                            maximumLength={1} // Ограничиваем ввод до 1 символа
                        />
                    ))}
                </div>
                <MyButton onClick={submitButtonHandler}>Submit</MyButton>
            </div>
        </div>
    );
}