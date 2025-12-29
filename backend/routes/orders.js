import express from "express";

const router = express.Router();

// TEMP in-memory store
let orders = [];

// CREATE ORDER (called after confirmation)
router.post("/", (req, res) => {
  const {
    tableNumber,
    items,
    total,
    paymentMethod = "QR",
    paymentStatus = "PAID"
  } = req.body;

  console.log("🧾 Incoming order items:", items);
  console.log("💳 Payment:", paymentMethod, paymentStatus);


  if (!tableNumber || !items || !total) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  const order = {
    id: "ORD-" + Math.floor(100000 + Math.random() * 900000),
    tableNumber,
    items,
    total,

    // 💳 Payment info
    paymentMethod,            // QR | CARD | CASH
    paymentStatus,            // PAID | UNPAID

    // 🍳 Order lifecycle
    status: "NEW",             // NEW → ONGOING → COMPLETED

    createdAt: new Date().toISOString()
  };

  orders.push(order);
  res.status(201).json(order);
});

// FETCH ALL ORDERS (for dashboard)
router.get("/", (req, res) => {
  res.json(orders);
});

// UPDATE ORDER STATUS (staff dashboard)
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = orders.find((o) => o.id === id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  if (!["NEW", "ONGOING", "COMPLETED"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  order.status = status;
  res.json(order);
});

export default router;
