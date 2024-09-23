import { UserIcon, CategoryIcon, ProductIcon } from './icons';

import './findedContent.scss';
import Button from '../../../button/button';

export default function FindedContent({ searchResults }) {

    if (searchResults === null) {
        return null;
    }

    if (searchResults.length === 0) {
        return (
            <div className='searchResults'>
                Nothing was found
            </div>
        )
    }

    const renderIcon = (type) => {
        switch (type) {
            case 'user':
                return <UserIcon />;
            case 'product':
                return <ProductIcon />;
            case 'category':
                return <CategoryIcon />;
            default:
                return null;
        }
    };
    const getImage = (item) => {
        switch (item.type) {
            case 'category':
                return <div className='imageContainer'>
                    <img
                        className="image"
                        src={`data:image/png;base64, ${item.pictureCode}`}
                        alt="categoryPicture" />
                </div>;
            case 'product':
                return <div className='imageContainer'>
                    <img
                        className="image"
                        src={`data:image/png;base64, ${item.pictureCodes[0]}`}
                        alt="categoryPicture" />
                </div>;
            default:
                return null;
        }
    }
    const getButton = (item) => {
        switch (item.type) {
            case 'category':
                return <Button onClick={() => window.location = `editCategory/${item._id}`} buttonText={'Edit category'}/>;
            case 'product':
                return <Button onClick={() => window.location = `editProduct/${item._id}`} buttonText={'Edit product'}/>;
            default:
                return null;
        }
    }

    return (
        <div className='searchResults'>
            {searchResults.map((item) => (
                <div className='searchResult' key={item._id}>
                    <div>
                        {renderIcon(item.type)}
                    </div>
                    {getImage(item)}
                    <div className='textContainer'>
                        <p>{item.name || item.title}</p>
                    </div>
                    {getButton(item)}
                </div>
            ))}
        </div>
    );
}
