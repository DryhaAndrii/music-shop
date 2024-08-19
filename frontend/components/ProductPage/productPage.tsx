
import styles from "./styles.module.scss"
import getProductByTitle from "@/functions/getProductByTitle";
import ProductThumbnails from "./productThumbnails/productThumbnails";

import Product from "@/types/product";
import ProductPurchasing from "./productPurchasing/productPurchasing";

const UNDERSCORE_REGEX = /_/g;
const SPACE_REGEX = / /g;

export default async function ProductPage({ productTitle }: { productTitle: string }) {
    const product: Product = await getProductByTitle(productTitle);
    if (!product) {
        return <h2>Product not found</h2>;
    }
    return (
        <div className="container">
            <div className={styles.productPage}>
                <h1>{productTitle}</h1>
                <div className={styles.wrapper}>
                    <div className={styles.productThumbnailsWrapper}>
                        <ProductThumbnails images={product.pictureCodes} />
                    </div>
                    <div className={styles.productPurchasingWrapper}>
                        <ProductPurchasing price={+product.price}/>
                    </div>
                </div>
            </div>
        </div>
    )
}