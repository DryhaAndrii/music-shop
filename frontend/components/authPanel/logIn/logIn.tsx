import MyButton, { BUTTON_COLOR } from "@/components/myButton/myButton";
import Input, { INPUT_COLOR, INPUT_TYPES } from "@/components/input/input";

export default function LogIn() {
    function handleSubmit(event: any) {
        event.preventDefault();
        console.log('logging in');
    }
    return (
        <>
            <Input type={INPUT_TYPES.EMAIL} color={INPUT_COLOR.DARK} placeholder="Username or email" />
            <Input type={INPUT_TYPES.PASSWORD} color={INPUT_COLOR.DARK} placeholder="Password" />
            <MyButton onClick={handleSubmit} color={BUTTON_COLOR.DARK}>Log in</MyButton>
        </>
    );
}

