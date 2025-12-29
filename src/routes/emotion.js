import express from "express";
import pool from "../config/db.js";
import axios from "axios";
import fs from "fs";
import path from "path";
import FormData from "form-data";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   EMOTION MAP → DB ENUM
========================= */
const EMOTION_DB_MAP = {
  hap: "happy",
  sad: "sad",
  neu: "neutral",
  ang: "angry",
};

router.post("/predict", async (req, res) => {
  console.log("🔥 EXPRESS /api/predict HIT");

  const { id_user, audio_base64 } = req.body;

  if (!id_user || !audio_base64) {
    return res.status(400).json({
      error: "Missing id_user or audio_base64",
    });
  }

  let tmpPath = null; // ✅ WAJIB DI LUAR

  try {
    /* =========================
       1. BASE64 → FILE (WAV)
    ========================= */
    const buffer = Buffer.from(audio_base64, "base64");

    tmpPath = path.join(__dirname, `audio_${Date.now()}.wav`);
    fs.writeFileSync(tmpPath, buffer);

    /* =========================
       2. SEND TO ML SERVICE
    ========================= */
    const form = new FormData();
    form.append("file", fs.createReadStream(tmpPath), {
      filename: "audio.wav",
      contentType: "audio/wav",
    });

    const mlRes = await axios.post(
      `${process.env.ML_BASE_URL}/predict`,
      form,
      {
        headers: form.getHeaders(),
        timeout: 120000, // model berat → kasih napas
      }
    );

    console.log("✅ ML Response:", mlRes.data);

    const { emotion: rawEmotion, confidence } = mlRes.data;

    const emotion = EMOTION_DB_MAP[rawEmotion];
    if (!emotion) {
      return res.status(500).json({
        error: "Invalid emotion returned from ML",
      });
    }

    /* =========================
       3. INSERT TO DATABASE
    ========================= */
    await pool.query(
      `INSERT INTO emosi (id_user, hasil_emosi, confidence)
       VALUES (?, ?, ?)`,
      [id_user, emotion, confidence]
    );

    return res.json({
      emotion,
      confidence,
    });

  } catch (err) {
    console.error("❌ Predict Error:", err.message);
    if (err.response) {
      console.error("❌ ML Service Response:", err.response.status, err.response.data);
    }
    if (err.code) {
      console.error("❌ Error Code:", err.code);
    }

    return res.status(500).json({
      error: "Prediction failed",
      details: err.message
    });

  } finally {
    /* =========================
       4. CLEAN TEMP FILE (SAFE)
    ========================= */
    if (tmpPath && fs.existsSync(tmpPath)) {
      fs.unlinkSync(tmpPath);
    }
  }
});

export default router;