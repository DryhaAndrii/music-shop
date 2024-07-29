
import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames/bind';

export enum CARD_TYPES {
    PRODUCT = 'product',
}



interface CardProps {
    type?: CARD_TYPES;

}

const cx = classNames.bind(styles);

function Card({ type = CARD_TYPES.PRODUCT }: CardProps) {


    const className = cx({
        card: true,
        [`card--${type}`]: true,
    });
    switch (type) {
        case CARD_TYPES.PRODUCT:
            return (
                <div
                    className={className}
                >

                </div >
            );
        default:
            return null;
    }
}

export default Card;
