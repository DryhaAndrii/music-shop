import { CategoryAttribute } from "@/types/category";

interface AttributesPanelProps {
    categoryAttributes: CategoryAttribute[];
}

import styles from "./styles.module.scss"
import AttributeItem from "./attributeItem/attributeItem";

function AttributesPanel({ categoryAttributes }: AttributesPanelProps) {
    return (
        <div className={styles.attributesPanel}>
            {categoryAttributes.map((attribute) => (
                <AttributeItem attribute={attribute}/>
            ))}
        </div>
    );
}

export default AttributesPanel;