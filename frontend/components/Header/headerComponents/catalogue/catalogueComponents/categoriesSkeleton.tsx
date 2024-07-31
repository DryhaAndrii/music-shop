
import styles from '../styles.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'



function CategoriesSkeleton() {

    return (
        <SkeletonTheme baseColor="#ffffff33" highlightColor="#ffffffa1" >
            <Skeleton count={8} containerClassName={styles.categories} className={styles.link} style={{ width: '100px', height: '30px' }} />
        </SkeletonTheme>
    );
}

export default CategoriesSkeleton;