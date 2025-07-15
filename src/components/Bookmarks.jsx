import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Bookmarks.css";

export default function Bookmarks() {
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("bookmarks");
    if (stored) {
      setBookmarkedQuestions(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="bookmarks-page">
      <h2><i className="fas fa-bookmark"></i> Bookmarked Questions</h2>

      {bookmarkedQuestions.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div className="bookmark-list">
          {bookmarkedQuestions.map((q, idx) => (
            <div
              key={idx}
              className="bookmark-card"
              onClick={() => navigate(`/solve/${q.subject}/${q.id}`)}
            >
              <h4>{q.title}</h4>
              <p><strong>Subject:</strong> {q.subject}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
