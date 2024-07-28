import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";

function Socials() {
    return (
        <div className={`${styles.socials} container`}>
            <div className={styles.left}>
                MUSIC-SHOP © 2024
            </div>
            <div className={styles.right}>
                <Link href="https://www.google.com/" className={styles.imageContainer}>
                    <Image src="/images/socials/Instagram.svg" alt="instagram" width={30} height={30}></Image>
                </Link>
                <Link href="https://www.google.com/" className={styles.imageContainer}>
                    <Image src="/images/socials/Facebook.svg" alt="Facebook" width={30} height={30}></Image>
                </Link>
                <Link href="https://www.google.com/" className={styles.imageContainer}>
                    <Image src="/images/socials/Telegramm.svg" alt="Telegram" width={30} height={30}></Image>
                </Link>
                <Link href="https://www.google.com/" className={styles.imageContainer}>
                    <Image src="/images/socials/YouTube.svg" alt="YouTube" width={30} height={30}></Image>
                </Link>
            </div>
        </div>
    );
}

export default Socials;