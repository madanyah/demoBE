import pool from "../config/db.js";

export const register = async (req, res) => {
  const { nama, email, password } = req.body;

  if (!nama || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO user (nama, email, password) VALUES (?, ?, ?)",
      [nama, email, password]
    );

    res.status(201).json({
      message: "Register success",
      id_user: result.insertId
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    res.status(500).json({ message: "Register failed" });
  }
};
