
import Logo from "./headerComponents/logo";
import Search from "./headerComponents/search";
import Contacts from "./headerComponents/contacts";

import styles from "./styles.module.scss";

function Header() {
    return (

        <header className={styles.header}>
            <div className="container">
                <div className={styles.wrapper} >
                    <Logo />
                    <Search />
                    <Contacts />
                </div>
            </div>
        </header >


    );
}

export default Header;