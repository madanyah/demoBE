console.log("🔥 EXPRESS FILE INI YANG JALAN");
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";

import emotionRoutes from "./routes/emotion.js";
import userRoutes from "./routes/user.js";

export { pool };

dotenv.config();
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

// ROUTES
app.use("/api/user", userRoutes);
app.use("/api/predict", emotionRoutes);

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
