
import Input from "@/components/input/input";
import styles from "./styles.module.scss";
import MyButton from "@/components/myButton/myButton";


function NewsLetter() {
    return (
        <div className={`${styles.newsLetter} container`}>
            <div className={styles.left}>
                <svg width="76" height="52" viewBox="0 0 76 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.75" y="1.02686" width="74.5" height="49.9462" rx="5.25" stroke="white" strokeWidth="1.5"></rect>
                    <path d="M2 3.70605L34.4078 20.1026C36.6797 21.252 39.3631 21.2514 41.6345 20.1008L74 3.70605" stroke="white" strokeWidth="1.5"></path>
                </svg>
                <div className={styles.textContainer}>
                    <p>Want to keep up to date with all promotions and discounts?</p>
                    <p>Sign up for our newsletter</p>
                </div>
            </div>
            <div className={styles.right}>
                <Input placeholder="Enter your e-mail" />
                <MyButton>Subscribe</MyButton>
            </div>

        </div>
    );
}

export default NewsLetter;