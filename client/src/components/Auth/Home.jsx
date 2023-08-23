import { useState, useEffect } from 'react';
import axios from 'axios';

function UserHomepage() {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState('');

  const token = localStorage.getItem('token'); // Get the stored token

  // Fetch user orders when the component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/get-orders', {
        headers: {
          'x-auth-token': token, // Pass the token as a header
        },
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error.response.data);
    }
  };

  const handleAddOrder = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/add-order',
        { orderName: newOrder },
        {
          headers: {
            'x-auth-token': token, // Pass the token as a header
          },
        }
      );
      console.log(response.data);
      // Refresh orders after adding a new order
      fetchOrders();
    } catch (error) {
      console.error('Error adding order:', error.response.data);
    }
  };

  return (
    <div>
      <h2>User Homepage</h2>
      <div>
        <h3>Your Orders</h3>
        <ul>
          {orders.map((order) => (
            <li key={order._id}>{order.orderName}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Add Order</h3>
        <input
          type="text"
          placeholder="New Order Name"
          value={newOrder}
          onChange={(e) => setNewOrder(e.target.value)}
        />
        <button onClick={handleAddOrder}>Add Order</button>
      </div>
    </div>
  );
}

export default UserHomepage;
