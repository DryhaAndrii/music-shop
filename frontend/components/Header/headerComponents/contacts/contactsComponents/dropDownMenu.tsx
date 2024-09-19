import MyButton from '@/components/myButton/myButton';
import styles from '../../../styles.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';

function DropDownMenu({ show }: { show: boolean }) {
    const [startHideAnimation, setStartHideAnimation] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    useEffect(() => {
        if (!show) {
            setStartHideAnimation(true);
            setTimeout(() => {
                setShowMenu(false);
            }, 400);
            return;
        }
        setStartHideAnimation(false);
        setShowMenu(true);
    }, [show])
    if (showMenu) {
        return (
            <div className={`${styles.dropDownMenu} ${startHideAnimation ? styles.hiding : ''}`}>
                <Link className={styles.link} href="https://www.google.com/">
                    <img src="/images/contacts/Viber.svg"></img>
                    Our viber
                </Link>
                <Link className={styles.link} href="https://www.google.com/">
                    <img src="/images/contacts/Telegram.svg"></img>
                    Our telegram
                </Link>
                <Link className={styles.link} href="https://www.google.com/">
                    <img src="/images/contacts/Mail.svg"></img>
                    Our email
                </Link>
                <Link className={styles.link} href="https://www.google.com/">
                    <img src="/images/contacts/Location.svg"></img>
                    Our adress
                </Link>
                <Link className={styles.link} href="https://www.google.com/">
                    <img src="/images/contacts/Instagramm.svg"></img>
                    Our instagram
                </Link>
                <MyButton>
                    Book call
                </MyButton>
            </div>
        );
    }

}

export default DropDownMenu;