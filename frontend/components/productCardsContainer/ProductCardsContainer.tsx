import styles from "./styles.module.scss";
import Product from "@/types/product";
import Card from "../card/card";

import classNames from 'classnames/bind';
interface ProductCardsContainerProps {
    products: Product[] | undefined;
    columns?: number;
}

const cx = classNames.bind(styles);

function ProductCardsContainer({ products, columns }: ProductCardsContainerProps) {

    const className = cx({
        productCardsContainer: true,
        [`columns--${columns}`]: true,
    });
    return (
        <div className={className}>
            {products?.map((product) => (
                <Card product={product} key={product._id} />
            ))}
        </div>
    );
}

export default ProductCardsContainer;