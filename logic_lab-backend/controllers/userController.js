import db from '../models/db.js';

export const getUserStats = async (req, res) => {
  const userId = req.params.id;

  try {
    const [submissions] = await pool.query(
      `SELECT COUNT(*) AS total,
              SUM(CASE WHEN status = 'correct' THEN 1 ELSE 0 END) AS correct
       FROM submissions
       WHERE user_id = ?`,
      [userId]
    );

    const [bookmarks] = await pool.query(
      `SELECT COUNT(*) AS total FROM bookmarks WHERE user_id = ?`,
      [userId]
    );

    res.json({
      totalSubmissions: submissions[0]?.total || 0,
      correctSubmissions: submissions[0]?.correct || 0,
      totalBookmarks: bookmarks[0]?.total || 0,
    });
  } catch (error) {
    console.error("Error fetching user stats:", error);
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};
