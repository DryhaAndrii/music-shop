
import './horizontalScroller.scss';
import React, { useRef, useState } from 'react';
export default function HorizontalScroller({ children }) {
    const wrapperRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [velocity, setVelocity] = useState(0);
    const [lastX, setLastX] = useState(0);
    const [animationFrame, setAnimationFrame] = useState(null);

    const handleMouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - wrapperRef.current.offsetLeft);
        setScrollLeft(wrapperRef.current.scrollLeft);
        setLastX(e.pageX);
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            setAnimationFrame(null);
        }
    };

    const handleMouseLeave = () => {
        setIsDown(false);
        if (isDown) {
            startInertiaScroll();
        }
    };

    const handleMouseUp = () => {
        setIsDown(false);
        startInertiaScroll();
    };

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wrapperRef.current.offsetLeft;
        const walk = (x - startX);
        wrapperRef.current.scrollLeft = scrollLeft - walk;
        setVelocity(e.pageX - lastX);
        setLastX(e.pageX);
    };

    const startInertiaScroll = () => {
        let currentVelocity = velocity;
        const inertiaScroll = () => {
            try {
                if (Math.abs(currentVelocity) < 0.5) {
                    cancelAnimationFrame(animationFrame);
                    setAnimationFrame(null);
                    return;
                }
                wrapperRef.current.scrollLeft -= currentVelocity;
                currentVelocity *= 0.95;
                setAnimationFrame(requestAnimationFrame(inertiaScroll));
            }catch (error) {
                cancelAnimationFrame(animationFrame);
                setAnimationFrame(null);
            }
            
        };
        setAnimationFrame(requestAnimationFrame(inertiaScroll));
    };

    return (
        <div className="horizontalScroller"

            ref={wrapperRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {children}
        </div>

    )
}