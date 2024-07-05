import './horizontalScroller.scss';
import React, { useRef, useState } from 'react';

export default function HorizontalScroller({ children }) {
    const wrapperRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const handleMouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - wrapperRef.current.offsetLeft);
        setScrollLeft(wrapperRef.current.scrollLeft);
        setIsDragging(false); // Начинаем с того, что не перетаскиваем
    };

    const handleMouseLeave = () => {
        if (isDown) {
            setIsDown(false);
        }
    };

    const handleMouseUp = (e) => {
        setIsDown(false);
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation(); // предотвращение клика при скроллинге
        } else {
            // обрабатываем клик
        }
    };

    const handleMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wrapperRef.current.offsetLeft;
        const walk = x - startX;
        wrapperRef.current.scrollLeft = scrollLeft - walk;
        if (Math.abs(walk) > 5) { // 5 пикселей – порог для определения скролла
            setIsDragging(true);
        }
    };

    return (
        <div
            className="horizontalScroller"
            ref={wrapperRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
        >
            {children}
        </div>
    );
}