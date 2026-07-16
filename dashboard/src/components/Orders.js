import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
  const userId = localStorage.getItem("userId");

  axios
    .get("http://localhost:3002/allOrders")
    .then((res) => {
      setOrders(res.data);
    })
    .catch((err) => console.log(err));
}, []);

  return (
    <div className="orders">
      <h3 className="title">Orders ({orders.length})</h3>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Stock</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Type</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>₹ {order.price}</td>

                  <td
                    style={{
                      color:
                        order.mode === "BUY"
                          ? "green"
                          : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {order.mode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;