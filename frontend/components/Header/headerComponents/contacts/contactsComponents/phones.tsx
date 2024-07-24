import Link from "next/link";
import styles from "../../../styles.module.scss";

function Phones() {
    return (
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

    );
}

export default Phones;