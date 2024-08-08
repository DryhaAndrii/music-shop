import { CategoryAttribute } from "@/types/category";
import styles from "./styles.module.scss";
import { useState } from "react";

interface AttributeItemProps {
    attribute: CategoryAttribute;
    value: string | null;
    onValueChange: (value: string) => void;
}

function AttributeItem({ attribute, value, onValueChange }: AttributeItemProps) {
    const [hideOption, setHideOption] = useState(true);

    function toggleOption() {
        setHideOption(!hideOption);
    }

    const handleOptionClick = (option: string) => {
        onValueChange(option);
    };

    return (
        <div className={styles.attributeItem}>
            <div className={styles.name} onClick={toggleOption}>
                {attribute.name}
                <span
                    className={`material-symbols-outlined styles_rotate__7xEp0 ${!hideOption && styles.rotate
                        }`}
                >
                    keyboard_arrow_down
                </span>
            </div>
            <div
                className={`${styles.options} ${hideOption ? styles.optionsHidden : ""}`}
            >
                {attribute.options.map((option) => (
                    <div
                        key={option}
                        className={`${styles.option} ${value === option ? styles.optionSelected : ""
                            }`}
                        onClick={() => handleOptionClick(option)}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AttributeItem;