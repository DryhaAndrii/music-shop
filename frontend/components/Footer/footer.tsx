import Banners from "./banners/banners";
import NewsLetter from "./newsLetter/newsLetter";
import styles from "./styles.module.scss";


function Footer() {
    return (
        <footer className={styles.footer}>
            <Banners />
            <NewsLetter />
        </footer >
    );
}

export default Footer;