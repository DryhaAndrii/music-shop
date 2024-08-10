import { CategoryAttribute } from "@/types/category";
import styles from "./styles.module.scss";
import AttributeItem from "./attributeItem/attributeItem";
import { useState } from "react";
import PriceRange from "./priceRange/priceRange";

interface AttributesPanelProps {
    categoryAttributes: CategoryAttribute[];
}

function AttributesPanel({ categoryAttributes }: AttributesPanelProps) {
    const [attributes, setAttributes] = useState<{ [key: string]: string }>({});
    const [priceRange,setPriceRange] = useState({minPrice:5000,maxPrice:30000})

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

    return (
        <div className={styles.attributesPanel}>
            <PriceRange maxPrice={30000} minPrice={5000} setPriceRange={setPriceRange}/>
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