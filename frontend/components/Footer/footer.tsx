import Banners from "./banners/banners";
import styles from "./styles.module.scss";


function Footer() {
    return (
        <footer className={styles.footer}>
            <Banners />
        </footer >
    );
}

export default Footer;