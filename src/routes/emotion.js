import express from "express";
import pool from "../config/db.js";
import axios from "axios";

const router = express.Router();

/* =========================
   EMOTION MAP → DB ENUM
========================= */
const EMOTION_DB_MAP = {
  happy: "happy",
  sad: "sad",
  neutral: "neutral",
  angry: "angry"
};

router.post("/predict", async (req, res) => {
  console.log("🔥 EXPRESS /api/predict HIT");

  const { id_user, audio_base64 } = req.body;
  if (!id_user || !audio_base64) {
    return res.status(400).json({ error: "Missing id_user or audio_base64" });
  }

  try {
    /* =========================
       1. SEND AUDIO TO HF
    ========================= */
    const hfRes = await axios.post(
      `https://api-inference.huggingface.co/models/${process.env.HF_MODEL}`,
      Buffer.from(audio_base64, "base64"),
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
          "Content-Type": "audio/wav",
        },
        timeout: 60000,
      }
    );

    const top = hfRes.data[0];
    const emotion = EMOTION_DB_MAP[top.label];
    const confidence = top.score;

    if (!emotion) {
      return res.status(500).json({ error: "Invalid emotion from ML" });
    }

    /* =========================
       2. INSERT DB
    ========================= */
    await pool.query(
      `INSERT INTO emosi (id_user, hasil_emosi, confidence)
       VALUES (?, ?, ?)`,
      [id_user, emotion, confidence]
    );

    return res.json({ emotion, confidence });

  } catch (err) {
    console.error("❌ Predict Error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Prediction failed" });
  }
});

export default router;
