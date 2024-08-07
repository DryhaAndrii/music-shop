import Product from "@/types/product"

import styles from "./styles.module.scss"


const UNDERSCORE_REGEX = /_/g;
const SPACE_REGEX = / /g;

export default function ProductPage({ productTitle }: { productTitle: string }) {    
    return (
        <div>
            <h1>Product</h1>
        </div>
    )
}