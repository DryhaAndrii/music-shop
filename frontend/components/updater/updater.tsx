
import { setAuthState } from "@/store/authSlice";
import { useAppDispatch } from "@/store/store";
function Updater() {
    const dispatch = useAppDispatch();
    return (
        <div>
            <button onClick={() => dispatch(setAuthState(true))}>Log in</button>
            <button onClick={() => dispatch(setAuthState(false))}>Log out</button>
        </div>
    );
}

export default Updater;