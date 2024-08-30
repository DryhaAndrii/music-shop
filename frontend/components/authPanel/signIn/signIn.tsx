import MyButton, { BUTTON_COLOR } from "@/components/myButton/myButton";
import Input, { INPUT_COLOR, INPUT_TYPES } from "@/components/input/input";

export default function SignIn() {
    function handleSubmit(event: any) {
        event.preventDefault();
        console.log('signing in');
    }

    return (
        <>
                <Input type={INPUT_TYPES.EMAIL} color={INPUT_COLOR.DARK} name="email" placeholder="Email" />
                <Input type={INPUT_TYPES.TEXT} color={INPUT_COLOR.DARK} name="username" placeholder="Username" />
                <Input type={INPUT_TYPES.PASSWORD} color={INPUT_COLOR.DARK} name="password" placeholder="Password" />
                <Input type={INPUT_TYPES.PASSWORD} color={INPUT_COLOR.DARK} name="repeatPassword" placeholder="Repeat password" />
                <MyButton onClick={handleSubmit} color={BUTTON_COLOR.DARK}>Sign up</MyButton>
        </>
    );
}

