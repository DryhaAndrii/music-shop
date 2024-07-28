import AboutShop from "./aboutShop/aboutShop";
import Banners from "./banners/banners";
import NewsLetter from "./newsLetter/newsLetter";
import Socials from "./socials/socials";
import SomeInfo from "./someInfo/someInfo";
import styles from "./styles.module.scss";


function Footer() {
    return (
        <footer className={styles.footer}>
            <Banners />
            <NewsLetter />
            <SomeInfo />
            <AboutShop />
            <Socials />
        </footer >
    );
}

export default Footer;