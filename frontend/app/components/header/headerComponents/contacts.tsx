'use client'
import { useState } from "react";

import Link from "next/link";
import styles from "../styles.module.scss";

function Contacts() {
    const [show, setShow] = useState('hidden');


    function toggleMenu() {
        if (show === 'hidden') {
            setShow('shown')
        }
        else {
            setShow('hidden')
        }
    }

    return (
        <div className={styles.contacts} >
            <div className={styles.phones}>
                <Link className={styles.phone} href="tel:+380999999999">
                    <img src="/images/contacts/Kyivstar.svg"></img>
                    +380999999999
                </Link>
                <Link className={styles.phone} href="tel:+380999999999">
                    <img src="/images/contacts/Lifecell.svg"></img>
                    +380999999999
                </Link>
                <Link className={styles.phone} href="tel:+380999999999">
                    <img src="/images/contacts/Vodafone.svg"></img>
                    +380999999999
                </Link>


            </div>
            <button className={styles.toggleButton} onClick={toggleMenu} style={{ transform: `rotate(${show === 'shown' ? 180 : 0}deg)` }}>
                <span className="material-symbols-outlined">
                    arrow_drop_down
                </span>
            </button>
            <div className={`${styles.dropDownMenu} ${styles[show]}`}>
                <Link className={styles.link} href="viber://chat?number=%2B380677264654/">
                    <img src="/images/contacts/viber.svg"></img>
                    Our viber
                </Link>
                <Link className={styles.link} href="https://t.me/MusicShop">
                    <img src="/images/contacts/telegram.svg"></img>
                    Our telegram
                </Link>
                <Link className={styles.link} href="mailto:MusicShop@ukr.net">
                    <img src="/images/contacts/mail.svg"></img>
                    Our email
                </Link>
                <Link className={styles.link} href="https://maps.app.goo.gl/2y23ro5GBWvniCx9A">
                    <img src="/images/contacts/location.svg"></img>
                    Our adress
                </Link>

                <button>
                    Book call
                </button>
            </div>
        </div>
    );
}

export default Contacts;