import { useEffect, useState } from 'react';

import styles from './styles.module.scss'
import { TOAST_TYPES } from '@/types/toastTypes';

const ANIMATION_DURATION = 500; //0.2s


interface Props {
    nameOfClass: string,
    message: string
    lifeTime: number
    type: TOAST_TYPES
}



export default function ToastItem({ type, nameOfClass, message, lifeTime }: Props) {
    const [fadeOut, setFadeOut] = useState(false);
    const [hide, setHide] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setFadeOut(true);
        }, lifeTime - ANIMATION_DURATION);
    }, []);

    function clickHandler() {
        setHide(true);
    }

    const getIcon = (type: TOAST_TYPES) => {
        switch (type) {
            case TOAST_TYPES.SUCCESS:
                return <span className="material-symbols-outlined">check_circle</span>;
            case TOAST_TYPES.ERROR:
                return <span className="material-symbols-outlined">error</span>;
            case TOAST_TYPES.INFO:
                return <span className="material-symbols-outlined">info</span>;
            default:
                return null;
        }
    };

    return (
        <div onClick={clickHandler} className={`${nameOfClass} ${fadeOut ? styles.fadeOut : ''} ${hide ? styles.hide : ''}`}>
            {getIcon(type)}
            {message}
            <div className={styles.loader}></div>
        </div>
    )
}