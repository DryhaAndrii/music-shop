import styles from "../../styles.module.scss";


function Search() {
    return (
        <div className={styles.search}>
            
            <button>
                <span className="material-symbols-outlined">search</span>
            </button>
            <input placeholder="Search">
            
            </input>
        </div>
    );
}

export default Search;