import React, { useState, ChangeEvent } from 'react';
import MultiRangeSlider from "multi-range-slider-react";
import styles from "./styles.module.scss";
import './priceRange.scss';
import Input, { INPUT_TYPES } from '@/components/input/input';

interface PriceRangeProps {
    minPrice: number;
    maxPrice: number;
    setPriceRange: (range: { maxPrice: number, minPrice: number }) => void;
}

function PriceRange({ minPrice, maxPrice, setPriceRange }: PriceRangeProps) {
    const [minValue, setMinValue] = useState(minPrice);
    const [maxValue, setMaxValue] = useState(maxPrice);
    const [minInputValue, setMinInputValue] = useState(minPrice);
    const [maxInputValue, setMaxInputValue] = useState(maxPrice);

    const handleSliderInput = (e: { minValue: number; maxValue: number }) => {
        const { minValue, maxValue } = e;

        setMinValue(minValue);
        setMinInputValue(minValue);

        setMaxValue(maxValue);
        setMaxInputValue(maxValue);
        setPriceRange({ minPrice: minValue, maxPrice: maxValue });
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {

        const value = e.target.value;
        if (type === 'min') {
            setMinInputValue(parseInt(value));
        } else {
            setMaxInputValue(parseInt(value));
        }

    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>, type: 'min' | 'max') => {

        const value = parseInt(e.target.value);
        if (type === 'min') {
            if (value < minPrice || value > maxPrice || isNaN(value)) {
                setMinInputValue(minPrice);
                setMinValue(minPrice);
                setPriceRange({ minPrice: minPrice, maxPrice: maxValue });
                return;
            }
            setMinInputValue(value);
            setMinValue(value);
            setPriceRange({ minPrice: value, maxPrice: maxValue });
        } else {
            if (value < minPrice || value > maxPrice || isNaN(value)) {
                setMaxInputValue(maxPrice);
                setMaxValue(maxPrice);
                setPriceRange({ minPrice: minValue, maxPrice: maxPrice });
                return;
            }
            setMaxInputValue(value);
            setMaxValue(value);
            setPriceRange({ minPrice: minValue, maxPrice: value });
        }
    };

    return (
        <div className={styles.priceRange}>
            <div className={styles.inputFields}>
                <Input
                    type={INPUT_TYPES.NUMBER}
                    value={minInputValue.toString()}
                    onChangeHandler={(e) => handleInputChange(e, 'min')}
                    onBlur={(e) => handleBlur(e, 'min')}
                />
                <span>-</span>
                <Input
                    type={INPUT_TYPES.NUMBER}
                    value={maxInputValue.toString()}
                    onChangeHandler={(e) => handleInputChange(e, 'max')}
                    onBlur={(e) => handleBlur(e, 'max')}
                />
                <span>USD</span>
            </div>
            <MultiRangeSlider
                min={minPrice}
                max={maxPrice}
                step={1000}
                minValue={minValue}
                maxValue={maxValue}
                onChange={handleSliderInput}
                label={false}
                ruler={false}
                style={{ border: "none", boxShadow: "none", padding: "15px 10px" }}
                barInnerColor="#3366D5"
                barLeftColor="#DBDBDB"
                barRightColor="#DBDBDB"

                thumbLeftColor="white"
                thumbRightColor="#white"
            />
        </div>
    );
}

export default PriceRange;