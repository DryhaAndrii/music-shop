import MyButton, { MyButtonWidths } from '@/components/myButton/myButton';
import styles from '../../../styles.module.scss';
import Link from 'next/link';

function DropDownMenu({ show }: { show: string }) {
    return (
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
            <MyButton width={MyButtonWidths.Wide}>
                Book call
            </MyButton>
        </div>
    );
}

export default DropDownMenu;