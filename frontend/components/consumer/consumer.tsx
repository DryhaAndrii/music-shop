
import { useAppSelector } from "@/store/store";

function Consumer() {

    const authState = useAppSelector((state) => state.auth.authState);
    return (
        <div>
            You are now {authState ? "Logged  In" : "Logged Out"}
        </div>
    );
}

export default Consumer;