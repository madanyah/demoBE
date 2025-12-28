import express from "express";
import pool from "../config/db.js";

const router = express.Router();

router.post("/enter", async (req, res) => {
  const { nama, email, password } = req.body;

  if (!nama || !email || !password) {
    return res.status(400).json({ message: "nama, email, password required" });
  }

  try {
    // cek user
    const [rows] = await pool.query(
      "SELECT * FROM user WHERE email = ?",
      [email]
    );

    if (rows.length > 0) {
      // user sudah ada
      return res.json({
        message: "User exist",
        id_user: rows[0].id_user
      });
    }

    // user baru
    const [result] = await pool.query(
      "INSERT INTO user (nama, email, password) VALUES (?, ?, ?)",
      [nama, email, password]
    );

    res.json({
      message: "User created",
      id_user: result.insertId
    });

  } catch (err) {
    console.error("USER ENTER ERROR:", err.message);
    res.status(500).json({ message: "Failed" });
  }
});

export default router;
