import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TabletLayout from "../components/IpadFrame";

const API_BASE = "http://localhost:5000";

export default function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [visible, setVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("QR");

  useEffect(() => {
    setVisible(true);
  }, []);

  if (!state) {
    return (
      <TabletLayout>
        <div className="flex items-center justify-center h-full text-xl">
          Invalid payment session.
        </div>
      </TabletLayout>
    );
  }

  const { items, totalPrice, tableNumber } = state;

  const isPaid = paymentMethod !== "CASH";

  return (
    <TabletLayout>
      <div
        className={`h-full w-full flex items-center justify-center
          bg-gradient-to-b from-pink-50 to-pink-100
          transition-all duration-500 ease-out
          ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <div className="bg-white rounded-[3rem] shadow-2xl px-20 py-16 flex flex-col items-center w-[800px]">

          <h2 className="text-6xl font-bold mb-6">Payment</h2>

          <p className="text-2xl mb-2">Table #{tableNumber}</p>
          <p className="text-4xl font-bold mb-8">₹{totalPrice}</p>

          {/* PAYMENT METHOD */}
          <div className="w-full mb-8 space-y-3">
            {["QR", "CARD", "CASH"].map((method) => (
              <label
                key={method}
                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer ${
                  paymentMethod === method ? "border-green-600 bg-green-50" : "border-gray-300"
                }`}
              >
                <span className="text-xl font-semibold">{method}</span>
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                />
              </label>
            ))}
          </div>

          {/* QR ONLY */}
          {paymentMethod === "QR" && (
            <div className="bg-white rounded-[2.5rem] shadow-xl p-8 mb-8">
              <img
                src={`${API_BASE}/images/qr.jpg`}
                alt="QR"
                className="w-[360px] h-[360px]"
              />
            </div>
          )}

          <button
            onClick={() => {
              navigate("/confirmation", {
                state: {
                  items,
                  totalPrice,
                  tableNumber,
                  paymentMethod,
                  paymentStatus: isPaid ? "PAID" : "UNPAID"
                }
              });
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-24 py-6 rounded-3xl text-2xl font-semibold"
          >
            Confirm Order
          </button>
        </div>
      </div>
    </TabletLayout>
  );
}
