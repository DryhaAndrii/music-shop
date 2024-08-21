

import styles from "./styles.module.scss";

export default function DiscountBadge({ children }: { children: React.ReactNode }) {

    return (

        <div className={styles.discountBadge}>
            {children}
        </div>

    )
}