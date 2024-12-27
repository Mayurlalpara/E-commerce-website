import React, { useEffect, useState } from 'react';
import './Orderlist.css';  // Assuming you want to style the list

function OrderList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:4000/orderlist', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'auth-token': localStorage.getItem('auth-token')  // Assuming auth-token is stored in localStorage
                    }
                });
                const data = await response.json();
                if (data.success) {
                    setOrders(data.orders);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('Failed to fetch orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="order-list">
            <h1>Order List</h1>
            {loading && <p>Loading orders...</p>}
            {error && <p className="error">{error}</p>}
            <div className="order-table">
                <div className="order-table-header">
                    <div>Order ID</div>
                    <div>User Email</div>
                    <div>Total Amount</div>
                    <div>Order Date</div>
                    <div>Items</div>
                </div>
                {orders.map(order => (
                    <div key={order._id} className="order-table-row">
                        <div>{order._id}</div>
                        <div>{order.userEmail}</div>
                        <div>₹{order.totalamount}</div>
                        <div>{new Date(order.orderDate).toLocaleDateString()}</div>

                        <div className="order-items">
                            <div className='item-header'>
                        <h4>Product</h4>
                        <h4>Name</h4>
                        <h4>Size</h4>
                        <h4>Quantity</h4>
                        <h4>Price</h4>
                        </div>

                            {order.items.map(item => (
                               
                                <div key={item.name} className="order-item">
                                    
                                    <img src={item.imageUrl} alt={item.name} className="order-item-image" />
                                    <div>{item.name}</div>
                                    <div>{item.size}</div>
                                    <div>{item.quantity}</div>
                                    <div> ₹{item.price}</div>

                                </div>
                            ))}

                        </div>

                    </div>

                ))}
            </div>

        </div>
    );
}

export default OrderList;
