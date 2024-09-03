'use client'
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";
import MyButton, { BUTTON_COLOR } from "../myButton/myButton";
import { userAtom } from '@/atoms';
import { useAtom } from 'jotai';
import logout from "@/functions/logout";

interface Props {
    hideUserPanel: () => void
}

function UserPanel({ hideUserPanel }: Props) {
    const [user, setUser] = useAtom(userAtom)
    const body = document.querySelector<HTMLElement>("body");
    if (body === null) {
        throw new Error("No body element found");
    }

    async function logoutButtonHandler() {
        const success = await logout();
        if (success) {
            setUser(null);
            hideUserPanel();
        }
    }
    return (
        createPortal(
            <div className={styles.wrapper}>
                <div className={styles.userPanel}>
                    <MyButton onClick={hideUserPanel} color={BUTTON_COLOR.DARK}>
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
            </div>
            ,
            body
        )
    );
}

export default UserPanel;