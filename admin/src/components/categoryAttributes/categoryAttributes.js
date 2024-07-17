import React from 'react';
import Button from '../button/button';
import Attribute from './attribute/attribute';
import './attributes.scss';

const NO_SPACE_AT_THE_START_REGEXP = /^\s+/;
const NO_MULTIPLE_SPACES_REGEXP = /\s\s+/g;

function CategoryAttributes({ attributes, setAttributes }) {

    function addAttribute() {
        setAttributes([{ name: '', options: [] }, ...attributes]);
    }

    function onInputChange(attributeIndex, value, optionIndex = null) {
        const newValue = value
            .replace(NO_SPACE_AT_THE_START_REGEXP, '')
            .replace(NO_MULTIPLE_SPACES_REGEXP, ' ')
            .slice(0, 50);
        const newAttributes = [...attributes];
        if (optionIndex === null) {
            newAttributes[attributeIndex].name = newValue;
        } else {
            newAttributes[attributeIndex].options[optionIndex] = newValue;
        }
        setAttributes(newAttributes);
    }

    function deleteAttribute(attributeIndex) {
        const newAttributes = attributes.filter((_, index) => index !== attributeIndex);
        setAttributes(newAttributes);
    }

    function addOption(attributeIndex) {
        const newAttributes = [...attributes];
        newAttributes[attributeIndex].options.unshift('');
        setAttributes(newAttributes);
    }


    function deleteOption(attributeIndex, optionIndex) {
        const newAttributes = [...attributes];
        newAttributes[attributeIndex].options = newAttributes[attributeIndex].options.filter((_, idx) => idx !== optionIndex);
        setAttributes(newAttributes);
    }

    return (
        <div className='attributes'>
            <Button buttonText={'Add attribute'} onClick={addAttribute} />
            {attributes.map((attribute, index) => (
                <Attribute
                    key={index}
                    index={index}
                    attribute={attribute}
                    onInputChange={onInputChange}
                    deleteAttribute={deleteAttribute}
                    addOption={addOption}
                    deleteOption={deleteOption}
                />
            ))}
        </div>
    );
}

export default CategoryAttributes;