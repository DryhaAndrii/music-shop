import Attribute from './attribute/attribute';
import './productAttributes.scss';
import HorizontalScroller from '../horizontalScroller/horizontalScroller';

function ProductAttributes({ productAttributes, setProductAttributes, attributesOptions }) {

    function chooseOption(name,option){
        setProductAttributes(prev=>({...prev,[name]:option}));
    }

    return (
        <div className='productAttributes'>
            <div className='scrollerWrapper'>
                <HorizontalScroller>
                    {
                        Object.entries(productAttributes).map(([key, value], index) =>
                            <Attribute
                                key={key}
                                name={key}
                                value={value}
                                setProductAttributes={setProductAttributes}
                                options={attributesOptions[index]}
                                chooseOption={chooseOption}
                            />
                        )
                    }


                </HorizontalScroller>
            </div>

        </div>
    );
}

export default ProductAttributes;