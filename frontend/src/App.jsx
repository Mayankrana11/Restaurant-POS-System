import { Routes, Route } from "react-router-dom";

import Menu from "./pages/Menu";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/confirmation" element={<Confirmation />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
