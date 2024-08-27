


import styles from "./styles.module.scss"
import { ProductDescriptions } from "@/types/product"
interface Props {
    productDescription: ProductDescriptions
}


export default function ProductDescription({ productDescription }: Props) {

    return (
        <div className={styles.productDescription}>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: productDescription.html }} />
        </div>
    )
}