import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TabletLayout from "../components/IpadFrame";

const API_BASE = "http://localhost:5000";

export default function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [visible, setVisible] = useState(false);

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

  return (
    <TabletLayout>
      {/* FULL HEIGHT CENTERING LAYER */}
      <div
        className={`h-full w-full flex items-center justify-center
          bg-gradient-to-b from-pink-50 to-pink-100
          transition-all duration-500 ease-out
          ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
        `}
      >
        {/* PAYMENT CARD */}
        <div
          className="bg-white/95 backdrop-blur-xl
                     rounded-[3rem]
                     shadow-[0_30px_80px_rgba(0,0,0,0.25)]
                     px-20 py-16
                     flex flex-col items-center"
        >
          {/* Title */}
          <h2 className="text-6xl font-bold mb-6">Payment</h2>

          {/* Meta */}
          <p className="text-2xl mb-2">
            Table <span className="font-semibold">#{tableNumber}</span>
          </p>
          <p className="text-4xl font-bold mb-12">
            ₹{totalPrice}
          </p>

          {/* QR */}
          <div className="bg-white rounded-[2.5rem] shadow-xl p-10 mb-10">
            <img
              src={`${API_BASE}/images/qr.jpg`}
              alt="Payment QR"
              className="w-[480px] h-[480px] object-contain"
            />
          </div>

          <p className="text-gray-600 text-xl mb-12">
            Scan the QR code to complete payment
          </p>

          {/* Action */}
          <button
            onClick={() => {
              navigate("/confirmation", {
                state: {
                  items,
                  totalPrice,
                  tableNumber,
                }
              });
            }}
            className="bg-green-600 hover:bg-green-700
                       text-white px-24 py-6
                       rounded-3xl text-2xl font-semibold
                       transition-transform duration-200
                       hover:scale-105 active:scale-95"
          >
            Confirm Payment
          </button>
        </div>
      </div>
    </TabletLayout>
  );
}
