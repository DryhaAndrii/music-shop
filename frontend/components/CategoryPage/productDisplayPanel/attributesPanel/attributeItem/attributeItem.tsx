import { CategoryAttribute } from "@/types/category";
import styles from "./styles.module.scss"

interface AttributeItemProps {
    attribute: CategoryAttribute;
}



function AttributeItem({ attribute }: AttributeItemProps) {
    return (
        <div className={styles.attributeItem}>

            {attribute.name}
            <div className={styles.options}>

            </div>
            {
                attribute.options.map((option) => (
                    <div key={option} className={styles.option}>
                        {option}
                    </div>
                ))
            }
        </div>
    );
}

export default AttributeItem;