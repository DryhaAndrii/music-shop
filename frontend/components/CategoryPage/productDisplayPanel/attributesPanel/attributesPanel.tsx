// AttributesPanel.tsx
import { CategoryAttribute } from "@/types/category";
import styles from "./styles.module.scss";
import AttributeItem from "./attributeItem/attributeItem";
import { useState } from "react";
interface AttributesPanelProps {
    categoryAttributes: CategoryAttribute[];
}

function AttributesPanel({ categoryAttributes }: AttributesPanelProps) {
    const [attributes, setAttributes] = useState<{ [key: string]: string }>({});

    const updateAttributeValue = (name: string, value: string) => {
        setAttributes((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className={styles.attributesPanel}>
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