import styles from "../styles.module.scss";
import { Titan_One,Roboto } from "next/font/google";
const titanOne = Titan_One({ weight: "400", subsets: ["latin"] });
function Logo() {
    return (
        <div className={styles.logo}>
            <h1 className={titanOne.className}>
                <span >Music</span> shop
            </h1>
        </div>

    );
}

export default Logo;