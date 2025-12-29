import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import menuRoutes from "./routes/menu.js";
import orderRoutes from "./routes/orders.js";


const app = express();
const PORT = 5000;

// Required for ES modules (__dirname fix)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Serve static images (later useful)
app.use("/images", express.static(path.join(__dirname, "uploads", "images")));

// ROOT ROUTE (THIS FIXES "Cannot GET /")
app.get("/", (req, res) => {
  res.send("Haru no Yorokobi Backend is running ✅");
});

// API ROUTES
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);


// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
