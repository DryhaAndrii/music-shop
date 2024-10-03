import styles from './styles.module.scss';

function Orders({ orders }: any) {
    if (!orders || orders.length === 0) return (
        <div className={styles.wrapper}>
            <h3>Your orders</h3>
            <div className={styles.orders}>
                <h4>You don't have any orders yet</h4>
            </div>
        </div>
    )
    return (
        <div className={styles.wrapper}>
            <h3>Your orders</h3>
            <div className={styles.orders}>
                <div className={styles.example}>
                    <div>Created</div>
                    <div>Price</div>
                    <div>Status</div>
                </div>
                {orders.map((order: any, index: number) => (
                    <div key={index} className={styles.order}>
                        <div>{new Date(order.createdAt).toLocaleString('ru-RU', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                        })}</div>
                        <div>{order.totalPrice}$</div>
                        <div>{order.status}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;