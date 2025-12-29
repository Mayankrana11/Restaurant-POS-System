import { useEffect, useState } from "react";
import IpadFrame from "../components/IpadFrame";

const API_BASE = "http://localhost:5000";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    fetch(`${API_BASE}/api/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Failed to fetch orders:", err));
  };

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  const updateStatus = (id, status) => {
    fetch(`${API_BASE}/api/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    }).then(fetchOrders);
  };

  return (
    <IpadFrame>
      {/* FULL HEIGHT WRAPPER */}
      <div className="h-full flex flex-col">

        {/* FIXED HEADER */}
        <div className="p-10 pb-4 flex-shrink-0">
          <h1 className="text-4xl font-bold">Staff Dashboard</h1>
        </div>

        {/* SCROLLABLE ORDERS AREA */}
        <div className="flex-1 overflow-y-auto px-10 pb-10 space-y-6">
          {orders.length === 0 && (
            <p className="text-gray-500">No orders yet.</p>
          )}

          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl shadow p-6"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold">
                  Table #{order.tableNumber}
                </h2>

                <span
                  className={`font-semibold ${
                    order.paymentStatus === "PAID"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {order.paymentStatus} ({order.paymentMethod})
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                Order ID: {order.id}
              </p>

              <ul className="mb-4 space-y-1">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.name} × {item.qty}
                  </li>
                ))}
              </ul>

              <p className="font-bold text-xl mb-4">
                Total: ₹{order.total}
              </p>

              {/* STATUS BUTTONS */}
              <div className="flex space-x-4">
                {["ONGOING", "COMPLETED"].map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(order.id, s)}
                    className={`px-5 py-2 rounded-xl font-semibold transition ${
                      order.status === s
                        ? "bg-black text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </IpadFrame>
  );
}
