import styles from './styles.module.scss';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

import classNames from 'classnames/bind'; import 'react-loading-skeleton/dist/skeleton.css'

export enum CARD_TYPES {
    PRODUCT = 'product',
}
interface CardProps {
    type?: CARD_TYPES;
}

const cx = classNames.bind(styles);

function CardSkeleton({ type = CARD_TYPES.PRODUCT }: CardProps) {
    const className = cx({
        card: true,
        [`card--${type}`]: true,
    });

    switch (type) {
        case CARD_TYPES.PRODUCT:
            return (
                <div className={className}>
                    <div className={styles.top}>
                        <Skeleton containerClassName={styles.imageContainer} className={styles.image} height={'95%'} />
                    </div>
                    <div className={styles.bot}>
                        <Skeleton />
                        <p>
                            <Skeleton height={'15px'} />
                            <Skeleton height={'15px'} />
                            <Skeleton height={'15px'} />
                        </p>

                        <div>
                            <Skeleton height={'20px'} width={'150px'} />
                            <Skeleton width={'40px'} height={'40px'} />

                        </div>
                    </div >
                </div >
            );
        default:
            return null;
    }
}

export default CardSkeleton;
