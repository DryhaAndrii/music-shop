
import Category from "@/types/category"
import styles from "./styles.module.scss"

interface BreadCrumb {
    title: string
    id: string
}

interface CategoryProps {
    breadCrumbs: BreadCrumb[]
}

export default function CategoryPage({ breadCrumbs }: CategoryProps) {


    return (
        <div>
            <h1>Category</h1>
            {breadCrumbs.map((breadCrumb, index) => (
                <p key={index}>{breadCrumb.title}</p>
            ))};
        </div>
    )
}