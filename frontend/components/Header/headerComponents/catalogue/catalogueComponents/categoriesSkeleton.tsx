
import styles from '../styles.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'



function CategoriesSkeleton() {

    return (
        <SkeletonTheme baseColor="#ffffff33" highlightColor="#ffffffa1" >
            <Skeleton containerClassName={styles.link} style={{ width: '100px', height: '30px' }} />
            <Skeleton containerClassName={styles.link} style={{ width: '100px', height: '30px' }} />
            <Skeleton containerClassName={styles.link} style={{ width: '100px', height: '30px' }} />
            <Skeleton containerClassName={styles.link} style={{ width: '100px', height: '30px' }} />
            <Skeleton containerClassName={styles.link} style={{ width: '100px', height: '30px' }} />
            <Skeleton containerClassName={styles.link} style={{ width: '100px', height: '30px' }} />
            <Skeleton containerClassName={styles.link} style={{ width: '100px', height: '30px' }} />
            <Skeleton containerClassName={styles.link} style={{ width: '100px', height: '30px' }} />
            <Skeleton containerClassName={styles.link} style={{ width: '100px', height: '30px' }} />
            <Skeleton containerClassName={styles.link} style={{ width: '100px', height: '30px' }} />
        </SkeletonTheme>
    );
}

export default CategoriesSkeleton;