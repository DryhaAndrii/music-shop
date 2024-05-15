import Link from "next/link";
import styles from "../styles.module.scss";

function Contacts() {
    return (
        <div className={styles.contacts}>
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
            <div className={styles.dropDownMenu}>
                <Link className={styles.link} href="viber://chat?number=%2B380677264654/">
                    <img src="/images/contacts/viber.svg"></img>
                    Our viber
                </Link>
                <button>
                    Book call
                </button>
            </div>
        </div>
    );
}

export default Contacts;