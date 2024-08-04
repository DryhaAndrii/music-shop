import MyButton from '@/components/myButton/myButton';
import styles from '../styles.module.scss';
import Link from 'next/link';
import Category from '@/types/category';
import CategoriesSkeleton from './categoriesSkeleton';
interface CategoriesProps {
    show: boolean,
    categories: Category[] | undefined,
    toggleMenu: () => void
}

const SPACE_REGEX = / /g;


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
                    //replacing all spaces ' ' in title to '_' because they 
                    //will replaced to %20l in url
                    <Link href={`/${category.title.replace(SPACE_REGEX, "_")}`} className={styles.link} key={index}>
                        {category.title}
                    </Link>
                ))
            }
        </div>
    );
}
export default Categories;