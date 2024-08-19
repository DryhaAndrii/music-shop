import styles from "./styles.module.scss";

interface Props {
    price: number,
}
export default function ProductPurchasing({ price }: Props) {
    return (
        <div className={styles.productPurchasing}>
            {price}
        </div>
    )
}