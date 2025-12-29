import { useEffect, useState } from "react";
import IpadFrame from "../components/IpadFrame";

const API_BASE = "http://localhost:5000";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = () => {
      fetch(`${API_BASE}/api/orders`)
        .then((res) => res.json())
        .then((data) => setOrders(data))
        .catch((err) => console.error("Failed to fetch orders:", err));
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <IpadFrame>
      <div className="p-10 space-y-6">
        <h1 className="text-4xl font-bold">Staff Dashboard</h1>

        {orders.length === 0 && (
          <p className="text-gray-500">No orders yet.</p>
        )}

        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow p-6"
          >
            <div className="flex justify-between mb-2">
              <h2 className="text-2xl font-bold">
                Table #{order.tableNumber}
              </h2>
              <span className="font-semibold text-green-600">
                {order.status}
              </span>
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Order ID: {order.id}
            </p>

            {/* ITEMS */}
            <ul className="mb-4 space-y-1">
              {Array.isArray(order.items) ? (
                order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.qty}
                  </li>
                ))
              ) : (
                <li className="text-gray-400 italic">
                  Legacy order format
                </li>
              )}
            </ul>

            <p className="font-bold text-xl">
              Total: ₹{order.total}
            </p>
          </div>
        ))}
      </div>
    </IpadFrame>
  );
}
