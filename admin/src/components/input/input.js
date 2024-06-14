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

    switch (type) {
        case INPUT_TYPES.SUBMIT:
            return (
                <input
                    type={type}
                    value={value}
                    className={inputClassName}

                />
            );

        case INPUT_TYPES.TEXT:
        case INPUT_TYPES.PASSWORD:
            return (
                <input
                    name={name}
                    value={value}
                    onChange={(e) => onChangeHandler(e)}
                    className={inputClassName}
                    placeholder={placeholder}
                    type={type}
                />
            );

        default:
            return null;
    }

}
export default Input;

