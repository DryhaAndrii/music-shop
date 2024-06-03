
import './loading.css';

function Loading() {
    return (
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

        </div>
    );
}

export default Loading;