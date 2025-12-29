import express from "express";

const router = express.Router();

// TEMP in-memory store
let orders = [];

// CREATE ORDER (called after payment)
router.post("/", (req, res) => {
  const { tableNumber, items, total } = req.body;

  console.log("🧾 Incoming order items:", items); // 👈 optional debug

  if (!tableNumber || !items || !total) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  const order = {
    id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    tableNumber,
    items,
    total,
    status: "PAID",
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  res.status(201).json(order);
});

// FETCH ALL ORDERS (for dashboard)
router.get("/", (req, res) => {
  res.json(orders);
});

export default router;
