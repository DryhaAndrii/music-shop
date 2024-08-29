import MyButton from "@/components/myButton/myButton";

import styles from "./styles.module.scss";
import Input, { INPUT_TYPES } from "@/components/input/input";

export default function SignIn() {
    function handleSubmit(event: any) {
        event.preventDefault();
        console.log('logging in');
    }

    return (
        <>
            <h2>
                Sign in
            </h2>
            <form>
                <Input type={INPUT_TYPES.EMAIL} name="email" />
                <Input type={INPUT_TYPES.PASSWORD} name="password" />
                <Input type={INPUT_TYPES.PASSWORD} name="repeatPassword" />
                <MyButton onClick={handleSubmit}>Sign up</MyButton>
            </form>

        </>
    );
}

