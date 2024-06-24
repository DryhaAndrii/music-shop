import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import './skeletonCard.scss';
function SkeletonCard() {
    return (
        <div className="skeletonCard">
            <SkeletonTheme baseColor="#ededed" highlightColor="#ffffff9c" duration={1}>
                <Skeleton containerClassName="top" />
                <Skeleton count={3} containerClassName="bot" />
            </SkeletonTheme>
        </div>
    );
}

export default SkeletonCard;