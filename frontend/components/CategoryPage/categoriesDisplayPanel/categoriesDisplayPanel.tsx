
import Link from "next/link"

import Category from "@/types/category"
import styles from "./styles.module.scss"
import Card, { CARD_TYPES } from "@/components/card/card"
CARD_TYPES

interface CategoriesDisplayPanelProps {
    categories: Category[],
    categoryTitle: string,
}

export default function CategoriesDisplayPanel({ categories, categoryTitle }: CategoriesDisplayPanelProps) {

    return (
        <div className={styles.categoriesDisplayPanel}>
            <h1 className='container'>{categoryTitle}</h1>
            <div className={styles.cardsContainer}>
                {categories.map((category) => {
                    return (
                        <Card type={CARD_TYPES.CATEGORY} category={category} key={category._id} />
                    )
                })}
            </div>
        </div>

    )
}
