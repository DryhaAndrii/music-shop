'use client'
import styles from "./styles.module.scss";
import MyButton, { BUTTON_COLOR } from "../myButton/myButton";
import { userAtom } from "@/atoms/user";
import { useAtom } from 'jotai';
import logout from "@/functions/logout";
import AbsoluteContainer from "../absoluteContainer/absoluteContainer";
import { useState } from "react";
import Loading from "../loading/loading";

interface Props {
    hideUserPanel: () => void
}

function UserPanel({ hideUserPanel }: Props) {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useAtom(userAtom)
    const [isVisible, setIsVisible] = useState(true);
    function hideButtonHandler() {
        setIsVisible(false);
        setTimeout(() => {
            hideUserPanel();
        }, 150);
    }


    async function logoutButtonHandler() {
        setLoading(true)
        const success = await logout();
        if (success) {
            setIsVisible(false);
            setTimeout(() => {
                setLoading(false)
                hideUserPanel();
                setUser(null);
            }, 150);
            //window.location.reload(); 
        }
    }
    return (
        <AbsoluteContainer isVisible={isVisible}>
            <div className={styles.userPanel}>
                {loading && <Loading/>}
                <MyButton onClick={hideButtonHandler} color={BUTTON_COLOR.DARK}>
                    <span className="material-symbols-outlined">close</span>
                </MyButton>

                <div className={styles.headers}>
                    <h2>{user?.name}`s</h2>
                    <h3>User Panel</h3>
                </div>
                <div className={styles.buttonWrapper}>
                    <MyButton onClick={logoutButtonHandler} color={BUTTON_COLOR.DARK}>
                        Logout
                    </MyButton>
                </div>
            </div>
        </AbsoluteContainer>
    );
}

export default UserPanel;