
import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';

export enum INPUT_TYPES {
    TEXT = "text",
    SUBMIT = "submit",
    PASSWORD = "password"

}



interface MyButtonProps {
    type?: INPUT_TYPES;
    placeholder?: string;
    name?: string;
    value?: string;
    onChangeHandler?: (e: any) => void;
}

const cx = classNames.bind(styles);

function Input({ type = INPUT_TYPES.TEXT, placeholder, onChangeHandler, name, value }: MyButtonProps) {


    const className = cx({
        input: true,
        [`input--${type}`]: true,
    });
    switch (type) {
        case INPUT_TYPES.SUBMIT:
            return (
                <input
                    type={type}
                    value={value}
                    className={className}
                />
            );

        case INPUT_TYPES.TEXT:
        case INPUT_TYPES.PASSWORD:
            return (
                <input
                    name={name}
                    value={value}
                    onChange={onChangeHandler ? (e) => onChangeHandler(e) : undefined}
                    
                    className={className}
                    placeholder={placeholder}
                    type={type}
                />
            );

        default:
            return null;
    }
}

export default Input;
