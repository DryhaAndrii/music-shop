

import styles from "./styles.module.scss";
import DiscountBadge from "@/components/discountBadge/discountBadge";

interface Props{
    price: string;
    discount: string | undefined;
}

export default function ({price,discount}: Props) {


    return (
        <div className={styles.prices}>
            {discount && +discount > 0
                ?
                <>
                    <span>
                        <span className={styles.oldPrice}>{`${price}$`}</span>
                        <span className={styles.discount}>
                            <DiscountBadge>
                                {` - ${discount}%`}
                            </DiscountBadge>
                        </span>
                        <span className={styles.yourDiscount}>Your discount:
                            <span>
                                {Math.round(+price * +`0.${discount}`)}$
                            </span>
                        </span>
                    </span>
                    <p>{`${Math.round(+price * (100 - parseInt(discount)) / 100)}$`}</p>
                </>
                :
                <p>{`${price}$`}</p>
                }
        </div>
    )
}