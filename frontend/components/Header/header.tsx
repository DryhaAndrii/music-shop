
import Logo from "./headerComponents/logo/logo";
import Search from "./headerComponents/search/search";
import Contacts from "./headerComponents/contacts/contacts";

import styles from "./styles.module.scss";
import Cart from "./headerComponents/cart/cart";
import Catalogue from "./headerComponents/catalogue/catalogue";
import getMainCategories from "@/functions/getMainCategories";


async function Header() {
    const categories = await getMainCategories();
    return (

        <header className={styles.header}>
            <div className="container">
                <div className={styles.outerWrapper} >
                    <Logo />
                    <div className={styles.innerWrapper}>
                        <Catalogue categories={categories} />
                        <Search />

                    </div>
                    <div className={styles.innerWrapper}>
                        <Contacts />
                        <Cart />
                    </div>

                </div>
            </div>
        </header >


    );
}

export default Header;