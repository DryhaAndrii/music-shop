import React from 'react';
import classNames from 'classnames';
import './card.scss'
import Button from '../button/button';
export const CARD_TYPES = {
    CATEGORY: "category",
    ADDCARD: "addcard",
    GOOD: 'good'
}
function Card({ type = CARD_TYPES.CATEGORY, text,cardClickHandler,pictureCode }) {
    const cardClassNames = classNames({
        card: true,
        [`card--${type}`]: true
    });

    switch (type) {
        case CARD_TYPES.CATEGORY:
            
            return (
                <div className={cardClassNames}>
                    <div className='top'>
                        
                        <img
                            className="image"
                            src={`data:image/png;base64, ${pictureCode}`}
                            alt="categoryPicture" />
                    </div>
                    <div className='bot'>
                        <p>{text}</p>
                        <Button buttonText={`Delete this ${type}`} />
                        <Button buttonText={`Edit this ${type}`} />
                    </div>
                </div>
            );

        case CARD_TYPES.ADDCARD:
            return (
                <div className={cardClassNames} onClick={cardClickHandler}>
                    &#10010;
                    <p>{text}</p>
                </div>
            );

        default:
            return null;
    }
}
export default Card;

