import Card, { CARD_TYPES } from '../card/card';
import HorizontalScroller from '../horizontalScroller/horizontalScroller';
import CategoriesSkeleton from './categoriesSkeleton/categoriesSkeleton';
import ModalWindow, { WINDOW_TYPES } from '../modalWindow/modalWindow';
import { useState } from 'react';
import { myStore } from '../../store/store';
import deleteCategoryById from '../../functions/deleteCategoryById';
import './categories.scss';
import 'react-loading-skeleton/dist/skeleton.css'

export default function Categories({ categories, categoryTitle, parentCategoryId, resetCategories, fetchCategories }) {
    const setShowModalWindow = myStore(state => state.setShowModalWindow);
    const [idCategoryToDelete, setIdCategoryToDelete] = useState();
    function editButtonHandler(categoryId) {
        window.location.href = `/editCategory/${categoryId}`;
    }
    function deleteButtonHandler(categoryId) {
        console.log(categoryId);
        setIdCategoryToDelete(categoryId);
        setShowModalWindow(true);
    }
    async function onConfirmModalWindow() {
        resetCategories();
        await deleteCategoryById(idCategoryToDelete);
        fetchCategories();
    }
    function onCancelModalWindow() {
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
                            deleteButtonHandler={deleteButtonHandler}
                            type={CARD_TYPES.CATEGORY}
                            categoryId={category._id}
                            text={`${category.title} (${category.products.length + category.subcategories.length})`}
                            key={category._id}
                            pictureCode={category.pictureCode} />
                    )
                }
            </HorizontalScroller>
            <ModalWindow
                confirmationText={'Are you sure you want to delete this category?'}
                type={WINDOW_TYPES.CONFIRMATION}
                onConfirm={onConfirmModalWindow}
                onCancel={onCancelModalWindow}

            />
        </div>
    )
}