import React from 'react';
import classNames from 'classnames';
import './button.scss'
export const BUTTON_TYPES = {
    DEFAULT: "default",
    TEXT: 'text',
    SUBMIT: "submit",
}
function Button({ type = BUTTON_TYPES.DEFAULT, buttonText,onClick }) {
    const buttonClassName = classNames({
        button: true,
        [`button--${type}`]: true
    });
    return (
        <button onClick={onClick} className={buttonClassName}>{buttonText}</button>
    );
}
export default Button;

