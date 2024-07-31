
import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';



interface MyButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

const cx = classNames.bind(styles);

function MyButton({ children, onClick, disabled = false }: MyButtonProps) {


    const className = cx({
        myButton: true,
        disabled: disabled
    });
    return (
        <button disabled={disabled} className={className} onClick={onClick}>
            {children}
        </button>
    );
}

export default MyButton;
