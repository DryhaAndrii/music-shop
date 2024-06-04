import './loading.css';
import { myStore } from '../../store/store';
import { createPortal } from 'react-dom';
function Loading() {
    const loading = myStore(state => state.loading);
    return (
        loading === true ? createPortal(
            <div className="loading">
                <div class="spinner">
                    <span>L</span>
                    <span>O</span>
                    <span>A</span>
                    <span>D</span>
                    <span>I</span>
                    <span>N</span>
                    <span>G</span>
                </div>
                <div class="holder">
                    <div class="candle">
                        <div class="blinking-glow"></div>
                        <div class="thread"></div>
                        <div class="glow"></div>
                        <div class="flame"></div>
                    </div>
                </div>
            </div>,
            document.body
        ) : null
    );
}
export default Loading;