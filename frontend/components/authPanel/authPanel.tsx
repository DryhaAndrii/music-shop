'use client'
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";
import { useState } from "react";
import Switcher from "./switcher/switcher";
import MyButton, { BUTTON_COLOR } from "../myButton/myButton";
import AuthForm from "./authForm/authForm";

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
                    <MyButton onClick={hideAuthPanel} color={BUTTON_COLOR.DARK}>
                        <span className="material-symbols-outlined">close</span>
                    </MyButton>
                    <Switcher loggingIn={loggingIn} setLoggingIn={setLoggingIn} />
                    <h2>
                        {loggingIn
                            ?
                            "Log in"
                            :
                            "Sign in"
                        }
                    </h2>
                    <AuthForm loggingIn={loggingIn} />
                </div>
            </div>
            ,
            body
        )

    );
}

export default AuthPanel;