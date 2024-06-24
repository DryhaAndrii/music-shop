
import HorizontalScroller from '../../horizontalScroller/horizontalScroller';
import SkeletonCard from '../../card/skeletonCard/skeletonCard';
import './categoriesSkeleton.scss'

function categoriesSkeleton() {
    return (
        <div className="categoriesSkeleton">
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

export default categoriesSkeleton;