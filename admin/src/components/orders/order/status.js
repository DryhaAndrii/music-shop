import { useState, useEffect, useRef } from "react";
import Loading, { useLoading } from '../../../components/Loading/loading';
import { toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;

export default function Status({ status, orderId }) {
    const { hideLoading, showLoading, isShow } = useLoading();
    const [isOpen, setIsOpen] = useState(false);
    const [newStatus, setStatus] = useState(status);
    const dropdownRef = useRef(null);

    async function onStatusClick(selectedStatus) {

        try {
            showLoading();
            const response = await fetch(`${apiUrl}orders/changeStatusById`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    selectedStatus,
                    orderId
                })
            });
            const status = response.status;
            if (status === 200) {
                const data = await response.json();
                setStatus(selectedStatus);
                return toast.success(data.message);
            }
            const data = await response.json();
            toast.error(data.message);
        } catch (error) {
            toast.error('Some error');
        }
        finally {
            hideLoading();
            setIsOpen(false);
        }
    }

    // Hiding dropdown on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="status" ref={dropdownRef}>
            <Loading isShow={isShow} />
            <div onClick={() => setIsOpen(!isOpen)} className="status__current">
                {newStatus}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="black">
                    <polygon points="12,16 6,10 18,10" />
                </svg>
            </div>
            {isOpen && (
                <div className="dropdown">
                    <div className="dropdown__item" onClick={() => onStatusClick('created')}>created</div>
                    <div className="dropdown__item" onClick={() => onStatusClick('in process')}>in process</div>
                    <div className="dropdown__item" onClick={() => onStatusClick('sent')}>sent</div>
                    <div className="dropdown__item" onClick={() => onStatusClick('delivered')}>delivered</div>
                </div>
            )}
        </div>
    );
}