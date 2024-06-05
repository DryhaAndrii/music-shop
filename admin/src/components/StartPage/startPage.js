import {myStore} from '../../store/store';


export default function StartPage() {
    const loading = myStore(state => state.loading);
    const setLoading = myStore(state => state.setLoading);
    return (
        <div className="startPage">
            <h1>Start Page</h1>
            <button onClick={() => setLoading(true)}>
                LOADING
            </button>
        </div>
    )
}