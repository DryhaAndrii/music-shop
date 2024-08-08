import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import styles from "./styles.module.scss";

interface PriceRangeProps {
  minPrice: number;
  maxPrice: number;
  priceRange: [number, number];
  onPriceRangeChange: (newRange: [number, number]) => void;
}

const PriceRange: React.FC<PriceRangeProps> = ({
  minPrice,
  maxPrice,
  priceRange,
  onPriceRangeChange,
}) => {
  const handlePriceRangeChange = (newRange: [number, number]) => {
    onPriceRangeChange(newRange);
  };

  return (
    <div className={styles.priceRange}>
      <Slider.Range
        min={minPrice}
        max={maxPrice}
        value={priceRange}
        onChange={handlePriceRangeChange}
        className={styles.priceRangeSlider}
        railStyle={{
          backgroundColor: '#ccc',
          height: '6px',
        }}
        handleStyle={[
          {
            borderColor: '#333',
            height: '16px',
            width: '16px',
            marginLeft: '-8px',
            marginTop: '-5px',
            backgroundColor: '#fff',
          },
          {
            borderColor: '#333',
            height: '16px',
            width: '16px',
            marginLeft: '-8px',
            marginTop: '-5px',
            backgroundColor: '#fff',
          },
        ]}
        trackStyle={[
          {
            backgroundColor: '#333',
            height: '6px',
          },
        ]}
      />
      <div className={styles.priceRangeInputs}>
        <input
          type="number"
          min={minPrice}
          max={maxPrice}
          value={priceRange[0]}
          onChange={(e) => handlePriceRangeChange([parseInt(e.target.value), priceRange[1]])}
        />
        <input
          type="number"
          min={minPrice}
          max={maxPrice}
          value={priceRange[1]}
          onChange={(e) => handlePriceRangeChange([priceRange[0], parseInt(e.target.value)])}
        />
      </div>
    </div>
  );
};

export default PriceRange;