
import Logo from "./headerComponents/logo/logo";
import Search from "./headerComponents/search/search";
import Contacts from "./headerComponents/contacts/contacts";

import styles from "./styles.module.scss";
import Cart from "./headerComponents/cart/cart";
import Catalogue from "./headerComponents/catalogue/catalogue";
import Category from "@/types/category";


async function Header({ categories }: { categories: Category[] }) {

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
