console.log("🔥 EXPRESS FILE INI YANG JALAN");

import dotenv from "dotenv";
dotenv.config(); // ✅ HARUS PALING ATAS SEBELUM DB

import express from "express";
import cors from "cors";
import pool from "./config/db.js";
// import mysql from "mysql2/promise";

import emotionRoutes from "./routes/emotion.js";
import userRoutes from "./routes/user.js";

/* ===== TEST DB CONNECTION (STEP 1.5) ===== */
(async () => {
  try {
    const [rows] = await pool.query("SELECT 1");
    console.log("✅ DB CONNECTED", rows);
  } catch (err) {
    console.error("❌ DB ERROR", err);
  }
})();

/* ===== APP ===== */
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() as now");
    res.json({
      status: "OK",
      db_time: rows[0].now,
    });
  } catch (err) {
    console.error("DB TEST ERROR:", err);
    res.status(500).json({
      status: "ERROR",
      message: err.message,
    });
  }
});

app.get("/test-users", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM user LIMIT 5");
  res.json(rows);
});

app.use("/api/user", userRoutes);
app.use("/api/predict", emotionRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working!");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

