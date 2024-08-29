'use client'
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";
import { useState } from "react";
import Switcher from "./switcher/switcher";
import LogIn from "./logIn/logIn";
import SignIn from "./signIn/signIn";
import MyButton from "../myButton/myButton";

interface Props {
    hideAuthPanel: () => void
}

function AuthPanel({ hideAuthPanel }: Props) {
    const [loggingIn, setLoggingIn] = useState(true)
    const body = document.querySelector<HTMLElement>("body");
    if (body === null) {
        throw new Error("No body element found");
    }
    return (
        createPortal(
            <div className={styles.wrapper}>
                <div className={styles.authPanel}>
                    <MyButton onClick={hideAuthPanel}>
                        <span className="material-symbols-outlined">close</span>
                    </MyButton>
                    <Switcher loggingIn={loggingIn} setLoggingIn={setLoggingIn} />
                    {loggingIn
                        ?
                        <LogIn />
                        :
                        <SignIn />
                    }
                </div>
            </div>

            ,
            body
        )

    );
}

export default AuthPanel;