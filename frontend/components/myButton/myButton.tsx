
import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';

export enum BUTTON_COLOR {
    DARK = "dark",
    LIGHT = "light"
}

interface MyButtonProps {
    children: React.ReactNode;
    onClick?: ((...args: any[]) => void) | (() => void);
    disabled?: boolean;
    color?: BUTTON_COLOR
}

const cx = classNames.bind(styles);

function MyButton({ color = BUTTON_COLOR.LIGHT, children, onClick, disabled = false }: MyButtonProps) {


    const className = cx({
        myButton: true,
        disabled: disabled,
        [`myButton--${color}`]: true,
    });
    return (
        <button disabled={disabled} className={className} onClick={onClick}>
            {children}
        </button>
    );
}

export default MyButton;
