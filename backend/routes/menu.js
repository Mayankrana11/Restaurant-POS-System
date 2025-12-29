import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/", (req, res) => {
  try {
    const filePath = path.join(__dirname, "../data/menu.json");
    const menu = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    res.json(menu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Menu load failed" });
  }
});

export default router;
