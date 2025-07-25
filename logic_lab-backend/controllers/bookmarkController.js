import db from "../models/db.js";

// Get all bookmarked questions for a user
export const getBookmarks = async (req, res) => {
  const userId = req.query.userId;
  try {
    const [rows] = await db.query(
      `SELECT q.id, q.title, q.difficulty
       FROM bookmarks b
       JOIN questions q ON b.question_id = q.id
       WHERE b.user_id = ?`,
      [userId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching bookmarks:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// Remove a bookmark
export const removeBookmark = async (req, res) => {
  const { userId, questionId } = req.body;
  try {
    await db.query(
      "DELETE FROM bookmarks WHERE user_id = ? AND question_id = ?",
      [userId, questionId]
    );
    res.json({ message: "Bookmark removed" });
  } catch (err) {
    console.error("Error removing bookmark:", err);
    res.status(500).json({ error: "Database error" });
  }
};

// Update the getBookmarkStatus function to:
export const getBookmarkStatus = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id; 

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const [rows] = await db.query(
      "SELECT * FROM bookmarks WHERE question_id = ? AND user_id = ?",
      [id, userId]
    );
    res.json({ isBookmarked: rows.length > 0 });
  } catch (err) {
    console.error("Error checking bookmark:", err);
    res.status(500).json({ error: "Database error" });
  }
};
