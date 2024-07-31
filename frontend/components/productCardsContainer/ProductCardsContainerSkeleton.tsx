import styles from './styles.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import CardSkeleton from '../card/cardSkeleton';

function ProductCardsContainerSkeleton() {
    return (
        <div className={styles.productCardsContainer}>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
        </div>
    );
}

export default ProductCardsContainerSkeleton;