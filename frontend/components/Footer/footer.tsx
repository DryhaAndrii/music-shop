import Banners from "./banners/banners";
import NewsLetter from "./newsLetter/newsLetter";
import SomeInfo from "./someInfo/someInfo";
import styles from "./styles.module.scss";


function Footer() {
    return (
        <footer className={styles.footer}>
            <Banners />
            <NewsLetter />
            <SomeInfo />
        </footer >
    );
}

export default Footer;