
import styles from "./styles.module.scss"
import getProductByTitle from "@/functions/getProductByTitle";
import ProductThumbnails from "./productThumbnails/productThumbnails";

import Product from "@/types/product";
import ProductPurchasing from "./productPurchasing/productPurchasing";
import ProductDescription from "./productDescription/productDescription";
import getSimilarProducts from "@/functions/getSimilarProducts";
import SimilarProducts from "../similarProducts/similarProducts";

const UNDERSCORE_REGEX = /_/g;
const SPACE_REGEX = / /g;

export default async function ProductPage({ productTitle }: { productTitle: string }) {
    const product: Product = await getProductByTitle(productTitle);
    const { similarProducts, hasMoreSimilarProducts } = await getSimilarProducts(1, 5, product._id);//This is for prerender the first 5 products
    if (!product) {
        return <h2>Product not found</h2>;
    }
    return (
        <>

            <div className="container">
                <div className={styles.productPage}>
                    <h1>{productTitle}</h1>
                    <div className={styles.wrapper}>
                        <div className={styles.productThumbnailsWrapper}>
                            <ProductThumbnails images={product.pictureCodes} />
                        </div>
                        <div className={styles.productPurchasingWrapper}>
                            <ProductPurchasing
                                product={product}
                            />
                        </div>
                    </div>
                    <div className={styles.descriptionWrapper} >
                        <ProductDescription productDescription={product.description} />
                    </div>


                </div>
            </div>
            <SimilarProducts
                mainProductId={product._id}
                initialProducts={similarProducts}
                initialHasMore={hasMoreSimilarProducts}
            />
        </>
    )
}