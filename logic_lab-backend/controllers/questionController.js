import db from '../models/db.js';

// Get all questions for a subject
export const getQuestionsBySubject = async (req, res) => {
  const { subjectId } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT * FROM questions WHERE subject_id = ?",
      [subjectId]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single question by ID
export const getQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM questions WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching question:", err);
    res.status(500).json({ error: "Database error" });
  }
};




