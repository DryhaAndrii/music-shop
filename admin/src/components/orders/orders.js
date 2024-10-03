import { useEffect, useState } from 'react';
import Loading, { useLoading } from '../../components/Loading/loading';
import { toast } from 'react-toastify';
import './orders.scss'
import Order from './order/order';

const apiUrl = process.env.REACT_APP_API_URL;

function Orders() {
    const [orders, setOrders] = useState(null);
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const { hideLoading, showLoading, isShow } = useLoading();

    useEffect(() => {
        fetchAllOrders();
    }, []);

    async function fetchAllOrders() {
        try {
            showLoading();
            const response = await fetch(`${apiUrl}orders/getAllOrders`, {
                method: 'GET',
                credentials: 'include',
            });
            const status = response.status;
            if (status === 200) {
                const data = await response.json();
                setOrders(data.orders);
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Some error');
        } finally {
            hideLoading();
        }
    }
    async function deleteOrder(orderId) {
        try {
            showLoading();
            const response = await fetch(`${apiUrl}orders/deleteOrder`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId }),
            });
            const status = response.status;
            if (status === 200) {
                const data = await response.json();
                toast.success(data.message);
                await fetchAllOrders();
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            toast.error('Some error: ' + error.message);
        } finally {
            hideLoading();
        }
    }

    function sortOrders(field) {
        const newSortOrder = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortOrder(newSortOrder);

        const sortedOrders = [...orders].sort((a, b) => {
            let aValue = a[field];
            let bValue = b[field];

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return newSortOrder === 'asc' ? aValue - bValue : bValue - aValue;
            }

            if (field === 'createdAt' || field === 'updatedAt') {
                return newSortOrder === 'asc'
                    ? new Date(aValue) - new Date(bValue)
                    : new Date(bValue) - new Date(aValue);
            }

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return newSortOrder === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            if (Array.isArray(aValue) && Array.isArray(bValue)) {
                return newSortOrder === 'asc'
                    ? aValue.length - bValue.length
                    : bValue.length - aValue.length;
            }

            return 0;
        });

        setOrders(sortedOrders);
    }

    if (!orders || orders.length === 0) return (
        <div className='ordersWrapper'>
            <Loading isShow={isShow} />
            <div className='container'>
                <h2>Orders</h2>
            </div>
            <div className='wrapper'>
                <div className='orders'  style={{ minHeight: 'unset' }}>
                    <h1 style={{ textAlign: 'center' }}>There are no orders</h1>
                </div>
            </div>
        </div>
    );

    return (
        <div className='ordersWrapper'>
            <Loading isShow={isShow} />
            <div className='container'>
                <h2>Orders</h2>
            </div>
            <div className='wrapper'>
                <div className='orders'>
                    <div className='example'>
                        <div onClick={() => sortOrders('createdAt')}>Created at</div>
                        <div onClick={() => sortOrders('updatedAt')}>Updated at</div>
                        <div onClick={() => sortOrders('name')}>Name</div>
                        <div onClick={() => sortOrders('surname')}>Surname</div>
                        <div onClick={() => sortOrders('phone')}>Phone</div>
                        <div onClick={() => sortOrders('totalPrice')}>Total price</div>
                        <div onClick={() => sortOrders('products')}>Products</div>
                        <div onClick={() => sortOrders('status')}>Status</div>
                        <div>Delete</div>
                    </div>
                    {orders.map((order) => {
                        return <Order key={order._id} order={order} deleteOrder={deleteOrder} />;
                    })}

                </div>
            </div>
        </div>
    );
}

export default Orders;