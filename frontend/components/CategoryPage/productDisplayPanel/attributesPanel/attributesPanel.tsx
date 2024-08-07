import { CategoryAttribute } from "@/types/category";

interface AttributesPanelProps {
    categoryAttributes: CategoryAttribute[];
}

import styles from "./styles.module.scss"

function AttributesPanel({ categoryAttributes }: AttributesPanelProps) {
    return (
        <div className={styles.attributesPanel}>
            {categoryAttributes.map((attribute) => (
                <div key={attribute.name}>
                    {attribute.name}
                    {attribute.options.map((option) => (
                        <div key={option}>
                            {option}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default AttributesPanel;