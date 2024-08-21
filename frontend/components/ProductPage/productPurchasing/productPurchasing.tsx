'use client'

import styles from "./styles.module.scss";
import Input, { INPUT_TYPES } from "@/components/input/input";
import MyButton from "@/components/myButton/myButton";
import { useState } from "react";
import Prices from "./prices/prices";

interface Props {
    price: number,
    discount: string | undefined
}
export default function ProductPurchasing({ price, discount }: Props) {
    const [productCount, setProductCount] = useState(1);

    return (
        <div className={styles.productPurchasing}>
            <div className={styles.priceWrapper}>
                <Prices discount={discount} price={price} />
            </div>
            <div className={styles.buttonsWrapper}>
                <div className={styles.countManager}>
                    <MyButton>
                        <span className="material-symbols-outlined">
                            chevron_left
                        </span>
                    </MyButton>
                    <Input type={INPUT_TYPES.NUMBER} value={`${productCount}`} />
                    <MyButton>
                        <span className="material-symbols-outlined">
                            chevron_right
                        </span>
                    </MyButton>
                </div>
                <div className={styles.buttons}>
                    <MyButton>
                        <span className="material-symbols-outlined">
                            add_shopping_cart
                        </span>
                        Buy
                    </MyButton>
                    <MyButton>
                        <span className="material-symbols-outlined">
                            acute
                        </span>
                        Buy in 1 click
                    </MyButton>
                    <MyButton>
                        <span className="material-symbols-outlined">
                            bookmark
                        </span>
                    </MyButton>
                </div>
            </div>
        </div>
    )
}