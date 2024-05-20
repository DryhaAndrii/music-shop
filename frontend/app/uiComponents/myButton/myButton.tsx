
import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';

export enum MyButtonColors {
    Grey = "grey",
    LightGrey='lightGrey',
    Blue = "blue",
}

export enum MyButtonWidths {
    Wide = "wide",
    Medium = 'medium'
}

interface MyButtonProps {
    children: React.ReactNode;
    color?: MyButtonColors;
    width?: MyButtonWidths;
    onClick?: () => void;
}

const cx = classNames.bind(styles);

function MyButton({ children, onClick, width = MyButtonWidths.Medium, color = MyButtonColors.LightGrey }: MyButtonProps) {


    const className = cx({
        myButton: true,
        [`myButton--${color}`]: true,
        [`myButton--${width}`]: true,
    });
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
}

export default MyButton;
