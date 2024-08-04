
import Product from "@/types/product"
import styles from "./styles.module.scss"

interface BreadCrumb {
    title: string
    id: string
}

interface ProductProps {
    breadCrumbs: BreadCrumb[]
}

export default function ProductPage({ breadCrumbs }: ProductProps) {


    return (
        <div>
            <h1>Product</h1>
            {breadCrumbs.map((breadCrumb, index) => (
                <p key={index}>{breadCrumb.title}</p>
            ))};
        </div>
    )
}