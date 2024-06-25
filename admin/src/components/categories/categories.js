import Card, { CARD_TYPES } from '../card/card';
import HorizontalScroller from '../horizontalScroller/horizontalScroller';
import CategoriesSkeleton from './categoriesSkeleton/categoriesSkeleton';

import './categories.scss';
import 'react-loading-skeleton/dist/skeleton.css'

export default function Categories({ categories, categoryTitle, parentCategoryId }) {
    function editButtonHandler(categoryId) {
        window.location.href = `/editCategory/${categoryId}`;
    }
    function addCategoryHandler() {
        if (parentCategoryId) {
            window.location.href = `/addCategory/${parentCategoryId}`;
        } else {
            window.location.href = `/addCategory`;
        }

    }
    if (!categories || !categoryTitle) return (
        <CategoriesSkeleton />
    )
    return (
        <div className="categories">
            <div className='container'>
                <h2>{categoryTitle}</h2>
            </div>
            <HorizontalScroller>
                <Card type={CARD_TYPES.ADDCARD} text={'Add category'} addCategoryHandler={addCategoryHandler} />
                {
                    categories.map((category) =>
                        <Card
                            editButtonHandler={editButtonHandler}
                            type={CARD_TYPES.CATEGORY}
                            categoryId={category._id}
                            text={`${category.title} (${category.products.length})`}
                            key={category._id}
                            pictureCode={category.pictureCode} />
                    )
                }
            </HorizontalScroller>
        </div>
    )
}