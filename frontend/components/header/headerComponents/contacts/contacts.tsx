'use client'
import { useState } from "react";

import styles from "../../styles.module.scss";
import Phones from "./contactsComponents/phones";
import DropDownMenu from "./contactsComponents/dropDownMenu";

function Contacts() {
    const [show, setShow] = useState('hidden');


    function toggleMenu() {
        if (show === 'hidden') {
            setShow('shown')
        }
        else {
            setShow('hidden')
        }
    }

    return (
        <div className={styles.contacts} >
            <Phones />
            <button
                className={styles.toggleButton}
                onClick={toggleMenu}
                style={{ transform: `rotate(${show === 'shown' ? 180 : 0}deg)` }}
            >
                <span className="material-symbols-outlined">
                    arrow_drop_down
                </span>
            </button>
            <DropDownMenu show={show} />

        </div>
    );
}

export default Contacts;