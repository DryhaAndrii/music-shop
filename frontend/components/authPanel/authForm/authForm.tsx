import MyButton, { BUTTON_COLOR } from "@/components/myButton/myButton";
import LogIn from "../logIn/logIn";
import SignIn from "../signIn/signIn";

interface Props {
    loggingIn: boolean
}

import styles from "./styles.module.scss"

function AuthForm({ loggingIn }: Props) {
    return (
        <form className={styles.authForm}>
            {loggingIn
                ?
                <LogIn />
                :
                <SignIn />
            }
            <MyButton color={BUTTON_COLOR.DARK}>Google</MyButton>
            
        </form>
    );
}

export default AuthForm;