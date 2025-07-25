import db from '../models/db.js';

export const getAllSubjects = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM subjects");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
};
