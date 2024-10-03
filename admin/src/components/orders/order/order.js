import { useState } from "react";
import Status from "./status";
import Button from "../../button/button";


function Order({ order, deleteOrder }) {
    const [productIsOpen, setProductIsOpen] = useState(false);
    return (
        <div className="order">
            <div>
                {new Date(order.createdAt).toLocaleString('ru-RU', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                })}
            </div>
            <div>
                {new Date(order.updatedAt).toLocaleString('ru-RU', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                })}
            </div>
            <div>{order.name}</div>
            <div>{order.surname}</div>
            <div>{order.phone}</div>
            <div>{order.totalPrice}$</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 8fr' }}><span>{order.products.length}</span> products</div>
            <Status orderId={order._id} status={order.status} />
            <Button buttonText={"Delete"} onClick={() => deleteOrder(order._id)} />
        </div>
    );
}

export default Order;