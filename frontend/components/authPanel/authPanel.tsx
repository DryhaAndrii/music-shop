'use client'
import styles from "./styles.module.scss";
import { useState } from "react";
import Switcher from "./switcher/switcher";
import MyButton, { BUTTON_COLOR } from "../myButton/myButton";
import AuthForm from "./authForm/authForm";
import AbsoluteContainer from "../absoluteContainer/absoluteContainer";


interface Props {
    hideAuthPanel: () => void
}

function AuthPanel({ hideAuthPanel }: Props) {
    const [loggingIn, setLoggingIn] = useState(true);
    const [isVisible, setIsVisible] = useState(true);
    function hideButtonHandler() {
        setIsVisible(false);
        setTimeout(() => {
            hideAuthPanel();
        }, 150);
    }
    return (
        <AbsoluteContainer isVisible={isVisible}>
            <div className={styles.authPanel}>
                <MyButton onClick={hideButtonHandler} color={BUTTON_COLOR.DARK}>
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
        </AbsoluteContainer>
    );
}

export default AuthPanel;