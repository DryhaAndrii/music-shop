import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Button from '../button/button';
import classNames from 'classnames';
import './modalWindow.scss';

export const WINDOW_TYPES = {
    CONFIRMATION: 'confirmation',
    INPUT: 'input'
};

function ModalWindow({
    type = WINDOW_TYPES.CONFIRMATION,
    onConfirm,
    onCancel,
    confirmationText,
    isOpen,
    onClose,
}) {
    const modalWindowClassNames = classNames({
        modalWindow: true,
        [`modalWindow--${type}`]: true
    });

    const handleConfirm = useCallback(() => {
        onConfirm();
        onClose();
    }, [onConfirm, onClose]);

    const handleCancel = useCallback(() => {
        onCancel();
        onClose();
    }, [onCancel, onClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className='modalWindowWrapper'>
            <div className="modalWindow">
                <div className={modalWindowClassNames}>
                    {type === WINDOW_TYPES.CONFIRMATION && (
                        <>
                            <p>{confirmationText}</p>
                            <div className="buttons">
                                <Button onClick={handleConfirm} buttonText={'Yes'}/>
                                <Button onClick={handleCancel} buttonText={'No'}/>
                            </div>
                        </>
                    )}
                    {/* Add other types here if needed */}
                </div>
            </div>
        </div>,
        document.body
    );
}

export function useModal() {
    const [isOpen, setIsOpen] = useState(false);
    const openModalWindow = useCallback(() => setIsOpen(true), []);
    const closeModalWindow = useCallback(() => setIsOpen(false), []);

    return { isOpen, openModalWindow, closeModalWindow };
}

export default ModalWindow;