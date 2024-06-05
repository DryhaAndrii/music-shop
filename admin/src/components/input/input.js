import React from 'react';
import classNames from 'classnames';
import './input.scss'
export const INPUT_TYPES = {
    PASSWORD: "password",
    TEXT: 'text',
    SUBMIT: "submit",
}
function Input({ type = INPUT_TYPES.TEXT, placeholder, onChangeHandler, name, value }) {
    const inputClassName = classNames({
        input: true,
        [`input--${type}`]: true
    });
    return (
        type === INPUT_TYPES.SUBMIT.toString() ?
            <input
                type={type}
                value={value}
                className={inputClassName}

            />
            :
            <input
                name={name}
                value={value}
                onChange={(e) => onChangeHandler(e)}
                className={inputClassName}
                placeholder={placeholder}
                type={type}
            />
    );
}
export default Input;

