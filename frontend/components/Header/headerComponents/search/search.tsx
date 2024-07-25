import styles from "../../styles.module.scss";
import Input from "@/components/input/input";
import MyButton from "@/components/myButton/myButton";
function Search() {
    return (
        <div className={styles.search}>
            
            <MyButton>
                <span className="material-symbols-outlined">search</span>
            </MyButton>
            <Input placeholder="Search"/>
        </div>
    );
}

export default Search;