"use client"
import Link from "next/link";
import styles from "./styles.module.scss";
import { useState } from "react";

function SomeInfo() {
    const [showInformation, setShowInformation] = useState(true);
    const [showForCustomers, setShowForCustomers] = useState(true);
    const [showContacts, setShowContacts] = useState(true);
    return (
        <div className={`${styles.someInfo} container`}>
            <div>
                <h3 onClick={() => setShowInformation(!showInformation)}>Information
                    <span className={`material-symbols-outlined ${!showInformation ? styles.rotate : ""}`}>
                        keyboard_arrow_down
                    </span>
                </h3>
                <ul className={showInformation ? "" : styles.hidden}>
                    <li><Link href={"/about/returnAndExchangePolicy"}>Return and Exchange Policy</Link></li>
                    <li><Link href={"/about/aboutUs"}>About us</Link></li>
                    <li><Link href={"/about/deliveryAndPayment"}>Delivery and payment</Link></li>
                </ul>
            </div>
            <div>
                <h3 onClick={() => setShowForCustomers(!showForCustomers)}>For customers
                <span className={`material-symbols-outlined ${!showForCustomers ? styles.rotate : ""}`}>
                        keyboard_arrow_down
                    </span>
                </h3>
                <ul className={showForCustomers ? "" : styles.hidden}>
                    <li><Link href={"/about/howDoWeWork"}>How do we work?</Link></li>
                    <li><Link href={"/about/termsAndAgreement"}>Terms of Agreement</Link></li>
                    <li><Link href={"/about/securityPolicy"}>Security Policy</Link></li>
                </ul>
            </div>
            <div>
                <h3 onClick={() => setShowContacts(!showContacts)}>Contacts
                <span className={`material-symbols-outlined ${!showContacts ? styles.rotate : ""}`}>
                        keyboard_arrow_down
                    </span>
                </h3>
                <ul className={showContacts ? "" : styles.hidden}>
                    <li>
                        <Link className={styles.phone} href="tel:+380999999999">
                            <span className="material-symbols-outlined">
                                call
                            </span>
                            +380999999999
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.phone} href="tel:+380999999999">
                            <span className="material-symbols-outlined">
                                call
                            </span>
                            +380999999999
                        </Link>
                    </li>
                    <li>
                        <Link className={styles.phone} href="tel:+380999999999">
                            <span className="material-symbols-outlined">
                                call
                            </span>
                            +380999999999
                        </Link>
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default SomeInfo;