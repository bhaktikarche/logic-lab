import db from "../models/db.js";

export const submitCode = async (req, res) => {
  const { questionId } = req.params;
  const { language, code, output, status } = req.body;
  const userId = req.user.id; 

  try {
    await db.query(
      "INSERT INTO submissions (user_id, question_id, language, code, output, status) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, questionId, language, code, output, status]
    );
    res.status(201).json({ message: "Submission saved successfully" });
  } catch (err) {
    console.error("Error saving submission:", err);
    res.status(500).json({ error: "Failed to save submission" });
  }
};

export const getSubmissionsByUser = async (req, res) => {
  const userId = req.user.id;

  try {
    const [rows] = await db.query(
      `SELECT s.*, q.title AS question_title
       FROM submissions s
       JOIN questions q ON s.question_id = q.id
       WHERE s.user_id = ?
       ORDER BY s.submitted_at DESC`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching submissions:", err);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
};
