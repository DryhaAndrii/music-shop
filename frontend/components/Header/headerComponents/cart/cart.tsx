import MyButton from '@/components/myButton/myButton';
import styles from '../../styles.module.scss';

function Cart() {
    return (
        <div className={styles.cart}>
            <MyButton >
                <span className="material-symbols-outlined">bookmark</span>
            </MyButton>
            <MyButton >
                <span className="material-symbols-outlined">
                    shopping_cart
                </span>
            </MyButton>
            <MyButton >
                <span className="material-symbols-outlined">
                    person
                </span>
            </MyButton>
        </div>
    );
}

export default Cart;