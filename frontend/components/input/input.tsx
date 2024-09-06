
import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';

export enum INPUT_TYPES {
    TEXT = "text",
    SUBMIT = "submit",
    PASSWORD = "password",
    EMAIL = "email",
    NUMBER = "number"
}
export enum INPUT_COLOR {
    LIGHT = "light",
    DARK = "dark"
}
interface InputProps {
    type?: INPUT_TYPES;
    color?: INPUT_COLOR;
    placeholder?: string;
    name?: string;
    value?: string;
    onChangeHandler?: (...args: any[]) => void;
    onBlur?: (...args: any[]) => void;
    reference?: any;
}

const cx = classNames.bind(styles);

function Input({ reference, type = INPUT_TYPES.TEXT, color = INPUT_COLOR.LIGHT, placeholder, onChangeHandler, name, value, onBlur }: InputProps) {


    const className = cx({
        input: true,
        [`input--${type}`]: true,
        [`input--${color}`]: true,
    });
    switch (type) {
        case INPUT_TYPES.SUBMIT:
            return (
                <input
                    type={type}
                    value={value}
                    className={className}
                    ref={reference}
                />
            );

        case INPUT_TYPES.TEXT:
        case INPUT_TYPES.EMAIL:
        case INPUT_TYPES.PASSWORD:
            return (
                <input
                    ref={reference}
                    name={name}
                    value={value}
                    onChange={onChangeHandler ? (e) => onChangeHandler(e) : undefined}

                    className={className}
                    placeholder={placeholder}
                    type={type}

                />
            );
        case INPUT_TYPES.NUMBER:
            return (
                <input
                    ref={reference}
                    value={value}
                    onChange={onChangeHandler && ((e) => onChangeHandler(e, 'min'))}
                    onBlur={onBlur ? (e) => onBlur(e) : undefined}
                    className={className}
                    type={type}

                />
            )

        default:
            return null;
    }
}

export default Input;
