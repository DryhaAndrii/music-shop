
import { useEffect } from "react";
import { CategoryAttribute } from "@/types/category";
import styles from "./styles.module.scss";
import AttributeItem from "./attributeItem/attributeItem";
import { useState } from "react";
import PriceRange from "./priceRange/priceRange";
import MyButton from "@/components/myButton/myButton";

interface AttributesPanelProps {
    categoryAttributes: CategoryAttribute[];
    filters: Filters;
    maxPricePossible: number;
    minPricePossible: number;
    isFiltersInitial: boolean;
    clearFilters: () => void;
    setFilters: (filters: Filters) => void;
}

interface Filters {
    priceRange: { minPrice: number; maxPrice: number };
    attributes: { [key: string]: string };
}

function AttributesPanel({
    categoryAttributes,
    setFilters,
    filters,
    maxPricePossible,
    minPricePossible,
    isFiltersInitial,
    clearFilters
}: AttributesPanelProps) {
    const [attributes, setAttributes] = useState<{ [key: string]: string }>(filters.attributes);
    const [priceRange, setPriceRange] = useState(filters.priceRange);
    const [hasChanges, setHasChanges] = useState(false);
    const [clearPrices, setClearPrices] = useState(false);

    useEffect(() => {
        setHasChanges(
            JSON.stringify(attributes) !== JSON.stringify(filters.attributes) ||
            JSON.stringify(priceRange) !== JSON.stringify(filters.priceRange)
        );
    }, [filters, attributes, priceRange])

    const updateAttributeValue = (name: string, value: string) => {
        setAttributes((prev) => {
            const newAttributes = { ...prev };
            if (value === "") {
                delete newAttributes[name];
            } else {
                newAttributes[name] = value;
            }
            return newAttributes;
        });
    };

    const handleApplyFilters = () => {
        setFilters({ priceRange, attributes });
    };
    const handleClearFiltersButton = () => {
        clearFilters();
        setAttributes({});
        setPriceRange({ minPrice: minPricePossible, maxPrice: maxPricePossible });
        setClearPrices(true);
    }

    return (
        <div className={styles.attributesPanel}>
            <div className={styles.buttons}>
                <MyButton onClick={handleApplyFilters} disabled={!hasChanges}>
                    Apply Filters
                </MyButton>
                <MyButton onClick={handleClearFiltersButton} disabled={isFiltersInitial}>
                    Clear Filters
                </MyButton>
            </div>
            <PriceRange
                maxPrice={maxPricePossible}
                minPrice={minPricePossible}
                setPriceRange={setPriceRange}
                clearPrices={clearPrices}
                setClearPrices={setClearPrices}
            />
            {categoryAttributes.map((attribute) => (
                <AttributeItem
                    attribute={attribute}
                    value={attributes[attribute.name] || null}
                    onValueChange={(value) => updateAttributeValue(attribute.name, value)}
                    key={attribute.name}
                />
            ))}

        </div>
    );
}

export default AttributesPanel;