import Link from "next/link";
import styles from "./styles.module.scss";


function AboutShop() {
    return (
        <div className={`${styles.aboutShop} container`}>
            <h3>Welcome to the MUSIC SHOP online shop of musical instruments</h3>

            <h4>Shop of musical instruments ‘MUSIC SHOP’ is:</h4>
            <ul>
                <li>Large selection of guitars, keyboards, wind and bowed instruments.</li>
                <li> A wide range of professional sound equipment: acoustic systems, amplifiers, mixing consoles, microphones, signal processing devices.</li>
                <li>Lighting equipment: scanners, fill light devices, lasers, devices on LCD light elements (LED), DMX controllers, smoke machines and consumables.</li>
            </ul>




            <p><span>MUSIC SHOP</span> is not a virtual online shop. We have a salesroom in Bila Tserkva (Kiev region), which is at your service a wide assortment of goods in stock, where you can not only see, but also listen and test, which in the case of music equipment is more than important.</p>

            <p>We cooperate with official distributors, which guarantees the officiality of the goods offered in Ukraine, product quality and warranty support.</p>

            <p>How to place an order and delivery? How to pay and receive the goods? Answers to these questions you will find in the section <Link href={"/delivery-and-payment"}>‘Delivery and payment’</Link></p>


            <p>For all questions call by phone:</p>
            <ul>
                <li>380999999999</li>
                <li>380999999999</li>
                <li>380999999999</li>
            </ul>

            <p>Or write to email:</p>
            <p>MusicShop@ukr.net</p>
        </div>
    );
}

export default AboutShop;