
import Logo from "./headerComponents/logo/logo";
import Search from "./headerComponents/search/search";
import Contacts from "./headerComponents/contacts/contacts";
import MyButton, { MyButtonWidths } from "@/app/uiComponents/myButton/myButton";

import styles from "./styles.module.scss";
import Cart from "./headerComponents/cart/cart";

function Header() {
    return (

        <header className={styles.header}>
            <div className="container">
                <div className={styles.wrapper} >
                    <Logo />
                    <Search />
                    <Contacts />
                    <Cart />
                </div>
            </div>
        </header >


    );
}

export default Header;