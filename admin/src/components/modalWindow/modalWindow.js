

import Button from '../button/button';
import classNames from 'classnames';
import { myStore } from '../../store/store';
import { createPortal } from 'react-dom';
import './modalWindow.scss';
export const WINDOW_TYPES = {
    CONFIRMATION: 'confirmation',
    INPUT: 'input'
}

function ModalWindow({ type = WINDOW_TYPES.CONFIRMATION, onConfirm, onCancel, confirmationText }) {

    const showModalWindow = myStore(state => state.showModalWindow);
    const setShowModalWindow = myStore(state => state.setShowModalWindow);

    const modalWindowClassNames = classNames({
        modalWindow: true,
        [`modalWindow--${type}`]: true
    });

    const modalContent = (

        <div className="modalWindowWrapper">
            <div className='modalWindow'>
                <div className={modalWindowClassNames}>
                    {type === WINDOW_TYPES.CONFIRMATION && (
                        <>
                            <p>{confirmationText}</p>
                            <div className='buttons'>
                                <Button buttonText="Yes" onClick={
                                    () => {
                                        onConfirm();
                                        setShowModalWindow(false)
                                    }
                                } />
                                <Button buttonText="No" onClick={
                                    () => {
                                        onCancel();
                                        setShowModalWindow(false)
                                    }
                                } />
                            </div>
                        </>
                    )}
                    {/* here is other types */}
                </div>
            </div>
        </div>
    );

    return (
        showModalWindow
            ? createPortal(
                modalContent,
                document.body
            )
            : null
    )

}

export default ModalWindow;

