import { CategoryAttribute } from "@/types/category";
import styles from "./styles.module.scss";
import { useState } from "react";

interface AttributeItemProps {
    attribute: CategoryAttribute;
    value: string | null;
    onValueChange: (value: string) => void;
}

function AttributeItem({ attribute, value, onValueChange }: AttributeItemProps) {
    const [showOption, setShowOption] = useState(false);

    function toggleOption() {
        setShowOption(!showOption);
    }

    const handleOptionClick = (option: string) => {
        if (value === option) {
            // If the selected option is already active, clear the value
            onValueChange('');
        } else {
            onValueChange(option);
        }
    };

    return (
        <div className={styles.attributeItem}>
            <div className={styles.name} onClick={toggleOption}>
                {attribute.name}
                <span
                    className={`material-symbols-outlined styles_rotate__7xEp0 ${showOption && styles.rotate}`}
                >
                    keyboard_arrow_down
                </span>
            </div>
            <div className={`${styles.wrapper} ${showOption ? styles.wrapper__show : ""}`}>
                <div
                    className={styles.options}
                >
                    {attribute.options.map((option) => (
                        <div
                            key={option}
                            className={`${styles.option} ${value === option ? styles.option__selected : ""}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}

export default AttributeItem;