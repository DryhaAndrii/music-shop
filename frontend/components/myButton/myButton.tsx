
import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';



interface MyButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const cx = classNames.bind(styles);

function MyButton({ children, onClick,   }: MyButtonProps) {


    const className = cx({
        myButton: true,
    });
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
}

export default MyButton;
