
import Card, { CARD_TYPES } from '../card/card';
import HorizontalScroller from '../horizontalScroller/horizontalScroller';
import CategoriesSkeleton from './categoriesSkeleton/categoriesSkeleton';

import './categories.scss';
import 'react-loading-skeleton/dist/skeleton.css'


export default function Categories({ categories, categoryTitle }) {




    function editButtonHandler(categoryId) {
        window.location.href = `/editCategory/${categoryId}`;
    }


    if (!categories) return (
        <CategoriesSkeleton />
    )
    return (
        <div className="categories">
            <div className='container'>
                <h2>{categoryTitle ? `${categoryTitle} subcategories` : 'Categories'}</h2>
            </div>
            <HorizontalScroller>
                <Card type={CARD_TYPES.ADDCARD} text={'Add category'} />
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