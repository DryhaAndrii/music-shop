import Card, { CARD_TYPES } from '../card/card';
import HorizontalScroller from '../horizontalScroller/horizontalScroller';
import ProductsSkeleton from './productsSkeleton/productsSkeleton';
import ModalWindow, { WINDOW_TYPES } from '../modalWindow/modalWindow';
import { useState } from 'react';
import { myStore } from '../../store/store';

import './products.scss';
import 'react-loading-skeleton/dist/skeleton.css'
import deleteProductById from '../../functions/deleteProductById';

export default function Products({ products, categoryId, resetProducts, fetchProducts, categoryTitle }) {
    const [idProductToDelete, setIdProductToDelete] = useState();

    const setShowModalWindow = myStore(state => state.setShowModalWindow);

    function addCardHandler() {
        window.location.href = `/addProduct/${categoryId}`;

    }
    function deleteButtonHandler(productId) {
        console.log(productId);
        setIdProductToDelete(productId);
        setShowModalWindow(true);
    }

    async function onConfirmModalWindow() {
        resetProducts();
        await deleteProductById(idProductToDelete);
        fetchProducts();
    }
    function onCancelModalWindow() {
    }




    if (!products) return (
        <ProductsSkeleton />
    )

    return (
        <div className="products">
            <div className='container'>
                <h2>{categoryTitle} products</h2>
            </div>
            <HorizontalScroller>
                <Card type={CARD_TYPES.ADDCARD} text={'Add product'} addCardHandler={addCardHandler} />
                {
                    products.map((product) =>
                        <Card
                            editButtonHandler={() => console.log('edit product')}
                            deleteButtonHandler={deleteButtonHandler}
                            type={CARD_TYPES.PRODUCT}
                            categoryId={product._id}
                            text={`${product.title} (${product.price}$)`}
                            key={product._id}
                            pictureCode={product.pictureCode} />
                    )
                }
            </HorizontalScroller>
            <ModalWindow
                confirmationText={'Are you sure you want to delete this product?'}
                type={WINDOW_TYPES.CONFIRMATION}
                onConfirm={onConfirmModalWindow}
                onCancel={onCancelModalWindow}

            />

        </div>
    )
}