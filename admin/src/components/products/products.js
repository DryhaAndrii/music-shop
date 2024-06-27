import Card, { CARD_TYPES } from '../card/card';
import HorizontalScroller from '../horizontalScroller/horizontalScroller';
import ProductsSkeleton from './productsSkeleton/productsSkeleton';
import './products.scss';
import 'react-loading-skeleton/dist/skeleton.css'

export default function Products({ products,categoryId }) {

    
    function addCardHandler() {
        window.location.href = `/addProduct/${categoryId}`;
        
    }





    if (!products) return (
        <ProductsSkeleton />
    )

    return (
        <div className="products">
            <div className='container'>
                <h2>Products</h2>
            </div>
            <HorizontalScroller>
                <Card type={CARD_TYPES.ADDCARD} text={'Add product'} addCardHandler={addCardHandler} />
                {
                    products.map((product) =>
                        <Card
                            editButtonHandler={() => console.log('edit product')}
                            deleteButtonHandler={() => console.log('delete product')}
                            type={CARD_TYPES.PRODUCT}
                            categoryId={product._id}
                            text={`${product.title} (${product.price}$)`}
                            key={product._id}
                            pictureCode={product.pictureCode} />
                    )
                }
            </HorizontalScroller>

        </div>
    )
}