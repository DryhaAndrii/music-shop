import './categories.scss';
import Card, { CARD_TYPES } from '../../card/card';
import HorizontalScroller from '../../horizontalScroller/horizontalScroller';
export default function Categories() {

    return (
        <div className="categories">
            <HorizontalScroller>
                <Card type={CARD_TYPES.CATEGORY} />
                <Card type={CARD_TYPES.CATEGORY} />
                <Card type={CARD_TYPES.CATEGORY} />
                <Card type={CARD_TYPES.CATEGORY} />
                <Card type={CARD_TYPES.CATEGORY} />
                <Card type={CARD_TYPES.CATEGORY} />
                <Card type={CARD_TYPES.ADDCARD} text={'Add new category'} />
            </HorizontalScroller>
        </div>
    )
}