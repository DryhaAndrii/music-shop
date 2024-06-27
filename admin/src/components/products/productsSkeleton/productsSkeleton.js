import HorizontalScroller from '../../horizontalScroller/horizontalScroller';
import SkeletonCard from '../../card/skeletonCard/skeletonCard';
import Skeleton from 'react-loading-skeleton';
function ProductsSkeleton() {
    return (
        <div className="productsSkeleton">
            <div className='container'><h2><Skeleton /></h2></div>
            <HorizontalScroller>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </HorizontalScroller>
        </div>
    );
}

export default ProductsSkeleton;