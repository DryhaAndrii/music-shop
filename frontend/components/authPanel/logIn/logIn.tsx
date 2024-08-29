import MyButton from "@/components/myButton/myButton";

import styles from "./styles.module.scss";
import Input, { INPUT_TYPES } from "@/components/input/input";

export default function LogIn() {
    function handleSubmit(event: any) {
        event.preventDefault();
        console.log('logging in');
    }

    return (
        <>
            <h2>
                Log in
            </h2>
            <form>
                <Input type={INPUT_TYPES.EMAIL} />
                <Input type={INPUT_TYPES.PASSWORD} />
                <MyButton onClick={handleSubmit}>Log in</MyButton>
            </form>

        </>
    );
}

