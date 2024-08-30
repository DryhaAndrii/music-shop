import MyButton, { BUTTON_COLOR } from "@/components/myButton/myButton";
import LogIn from "../logIn/logIn";
import SignIn from "../signIn/signIn";

interface Props {
    loggingIn: boolean
}

import styles from "./styles.module.scss"
import googleAuth from "@/functions/googleAuth";

function AuthForm({ loggingIn }: Props) {

    const handleGoogleAuth = async (event: any) => {
        event.preventDefault();
        googleAuth();
    };

    
    return (
        <form className={styles.authForm}>
            {loggingIn
                ?
                <LogIn />
                :
                <SignIn />
            }
            <MyButton onClick={handleGoogleAuth} color={BUTTON_COLOR.DARK}>Google</MyButton>

        </form>
    );
}

export default AuthForm;