import Link from "next/link";
import styles from "../../styles.module.scss";
import { Titan_One, Roboto } from "next/font/google";
const titanOne = Titan_One({ weight: "400", subsets: ["latin"] });
function Logo() {
    return (
        <div className={styles.logo}>
            <Link href='/'>
                <h1 className={titanOne.className}>
                    <span >Music</span> <p>shop</p>
                </h1>
            </Link>

        </div>

    );
}

export default Logo;