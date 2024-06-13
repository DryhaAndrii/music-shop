import MyButton from '@/components/myButton/myButton';
import styles from '../styles.module.scss';
import Link from 'next/link';
interface CategoriesProps {
    show: string,
    categories: string[] | undefined,
    toggleMenu: () => void
}

function Categories({ show, categories, toggleMenu }: CategoriesProps) {
    
    return (
        <div className={`${styles.categories} ${styles[show]}`} >
            <MyButton>
                <span className="material-symbols-outlined" onClick={toggleMenu}>close</span>
            </MyButton>
            {
                categories?.map((category, index) => (
                    <Link href={`/${category}`} className={styles.link} key={index}>
                        {category}
                    </Link>
                ))
            }
        </div>
    );
}

export default Categories;