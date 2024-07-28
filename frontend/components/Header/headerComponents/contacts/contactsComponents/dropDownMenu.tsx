import MyButton from '@/components/myButton/myButton';
import styles from '../../../styles.module.scss';
import Link from 'next/link';

function DropDownMenu({ show }: { show: string }) {
    return (
        <div className={`${styles.dropDownMenu} ${styles[show]}`}>
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

export default DropDownMenu;