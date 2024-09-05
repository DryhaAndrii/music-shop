
import { Children } from "react";
import styles from "./styles.module.scss";
import { createPortal } from "react-dom";

interface Props {
    children: React.ReactNode;
    isVisible?: boolean;
}

function AbsoluteContainer({ children, isVisible }: Props) {
    const body = document.querySelector<HTMLElement>("body");
    if (body === null) {
        throw new Error("No body element found");
    }
    return (
        createPortal(
            <div className={`${styles.container} ${!isVisible ? styles.fadeOut : ""}`}>
                {children}
            </div>
            ,
            body
        )
    );
}

export default AbsoluteContainer;
