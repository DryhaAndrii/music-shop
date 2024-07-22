import React from 'react';
import HorizontalScroller from '../../horizontalScroller/horizontalScroller';
import Button from '../../button/button';
import Input, { INPUT_TYPES } from '../../input/input';
import './attribute.scss'

function Attribute({ attribute, index, onInputChange, addOption, deleteAttribute, deleteOption }) {
    return (
        <div className="categoryAttribute">
            <HorizontalScroller>
                <Input
                    type={INPUT_TYPES.TEXT}
                    placeholder={'Attribute name'}
                    value={attribute.name}
                    onChangeHandler={(e) => onInputChange(index, e.target.value)}
                />
                <Button buttonText={'Delete attribute'} onClick={() => deleteAttribute(index)} />
                <Button buttonText={'Add option'} onClick={() => addOption(index)} />
                {attribute.options.map((option, optionIndex) => (
                    <div className='option' key={optionIndex}>
                        <Input
                            type={INPUT_TYPES.TEXT}
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}
                            onChangeHandler={(e) => onInputChange(index, e.target.value, optionIndex)}
                        />
                        <button onClick={() => deleteOption(index, optionIndex)}>&#128465;</button>
                    </div>
                ))}
            </HorizontalScroller>
        </div>
    );
}

export default Attribute;