import MyButton from '@/components/myButton/myButton';
import styles from '../styles.module.scss';
import Link from 'next/link';
import Category from '@/types/category';
import CategoriesSkeleton from './categoriesSkeleton';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
interface CategoriesProps {
    show: boolean,
    categories: Category[] | undefined,
    toggleMenu: () => void
}

function Categories({ show, categories, toggleMenu }: CategoriesProps) {
    if (!show) return;
    if (categories === undefined) return (
        <>
            <div className={`${styles.categories}`} >
                <MyButton>
                    <span className="material-symbols-outlined" onClick={toggleMenu}>close</span>
                </MyButton>
                <CategoriesSkeleton />
            </div>

        </>

    )
    return (
        <div className={`${styles.categories}`} >
            <MyButton>
                <span className="material-symbols-outlined" onClick={toggleMenu}>close</span>
            </MyButton>
            {
                categories?.map((category, index) => (
                    <>
                        <Link href={`/${category.title}`} className={styles.link} key={index}>
                            {category.title}
                        </Link>
                        <Link href={`/${category.title}`} className={styles.link} key={index}>
                            {category.title}
                        </Link>
                        <Link href={`/${category.title}`} className={styles.link} key={index}>
                            {category.title}
                        </Link>
                    </>


                ))
            }
        </div>
    );
}

export default Categories;