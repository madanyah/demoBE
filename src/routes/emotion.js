import express from "express";
import pool from "../config/db.js";
import axios from "axios";
import fs from "fs";
import path from "path";
import FormData from "form-data";
import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import { fileURLToPath } from "url";

ffmpeg.setFfmpegPath(ffmpegPath);

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   MAP EMOSI ML → DB ENUM
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

  let webmPath;
  let wavPath;

  try {
    /* =========================
       1. BASE64 → WEBM
    ========================= */
    const buffer = Buffer.from(audio_base64, "base64");
    webmPath = path.join(__dirname, `audio_${Date.now()}.webm`);
    wavPath = webmPath.replace(".webm", ".wav");

    fs.writeFileSync(webmPath, buffer);

    /* =========================
       2. WEBM → WAV (PCM)
    ========================= */
    await new Promise((resolve, reject) => {
      ffmpeg(webmPath)
        .audioChannels(1)
        .audioFrequency(16000)
        .audioCodec("pcm_s16le")
        .format("wav")
        .on("end", resolve)
        .on("error", reject)
        .save(wavPath);
    });

    /* =========================
       3. SEND WAV → ML
    ========================= */
    const form = new FormData();

    form.append(
      "file",
      fs.createReadStream(tmpPath),
      {
        filename: "audio.wav",
        contentType: "audio/wav",
      }
    );

    const mlRes = await axios.post(
      `${process.env.ML_BASE_URL}/predict`,
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
        timeout: 120000,
      }
    );

    const { emotion: rawEmotion, confidence } = mlRes.data;
    const emotion = EMOTION_DB_MAP[rawEmotion];

    if (!emotion) {
      throw new Error(`Invalid emotion from ML: ${rawEmotion}`);
    }

    /* =========================
       4. INSERT TO DB
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
    return res.status(500).json({
      error: "Prediction failed",
    });
  } finally {
    if (webmPath && fs.existsSync(webmPath)) fs.unlinkSync(webmPath);
    if (wavPath && fs.existsSync(wavPath)) fs.unlinkSync(wavPath);
  }
});

export default router;