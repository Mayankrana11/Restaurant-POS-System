import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import IpadFrame from "../components/IpadFrame";

const API_BASE = "http://localhost:5000";

export default function Confirmation() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [visible, setVisible] = useState(false);

  // Prevent duplicate POST on re-render
  const orderSentRef = useRef(false);

  useEffect(() => {
    setVisible(true);

    if (!state || orderSentRef.current) return;
    orderSentRef.current = true;

    // Send order to backend
    fetch(`${API_BASE}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        tableNumber: state.tableNumber,
        items: state.items,          // will later become item snapshots
        total: state.totalPrice
      })
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("✅ Order stored successfully:", data);

        // 🔑 STEP 2: Replace frontend orderId with backend orderId
        navigate("/confirmation", {
          replace: true,
          state: {
            ...state,
            orderId: data.id
          }
        });
      })
      .catch((err) => {
        console.error("❌ Failed to store order:", err);
      });
  }, [state, navigate]);

  if (!state) {
    return (
      <IpadFrame>
        <div className="absolute inset-0 flex items-center justify-center text-xl">
          No order found.
        </div>
      </IpadFrame>
    );
  }

  const { tableNumber, totalPrice, orderId } = state;

  return (
    <IpadFrame>
      {/* FORCE TRUE CENTERING */}
      <div
        className={`absolute inset-0 flex items-center justify-center bg-pink-50 transition-all duration-500 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        `}
      >
        {/* CONFIRMATION CARD */}
        <div className="bg-white/80 backdrop-blur rounded-[2.5rem] shadow-2xl px-24 py-20 flex flex-col items-center text-center w-[760px]">

          <h2 className="text-6xl font-bold mb-8">
            Order Confirmed 🎉
          </h2>

          <p className="text-2xl mb-2">
            Table <span className="font-semibold">#{tableNumber}</span>
          </p>

          <p className="text-lg text-gray-500 mb-1">
            Order ID
          </p>

          <p className="text-4xl font-bold mb-10">
            {orderId || "Generating..."}
          </p>

          <p className="text-3xl font-semibold mb-14">
            Amount Paid: ₹{totalPrice}
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-black hover:bg-zinc-800 text-white px-28 py-6 rounded-2xl text-2xl font-semibold transition-transform hover:scale-105"
          >
            Back to Menu
          </button>

        </div>
      </div>
    </IpadFrame>
  );
}
