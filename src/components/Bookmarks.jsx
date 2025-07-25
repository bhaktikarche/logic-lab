import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Bookmark = ({ user }) => {
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const fetchBookmarks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookmarks", {
          params: { userId: user.id },
        });
        setBookmarkedQuestions(res.data);
      } catch (err) {
        toast.error("Failed to fetch bookmarks");
        console.error(err);
      }
    };

    fetchBookmarks();
  }, [user]);

  const handleSolve = (questionId) => {
    navigate(`/solve/${questionId}`);
  };

  const handleRemoveBookmark = async (questionId) => {
    try {
      await axios.delete("http://localhost:5000/api/bookmarks", {
        data: { userId: user.id, questionId },
      });
      setBookmarkedQuestions((prev) =>
        prev.filter((q) => q.id !== questionId)
      );
      toast.success("Bookmark removed");
    } catch (err) {
      toast.error("Failed to remove bookmark");
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">📑 Bookmarked Questions</h2>

      {bookmarkedQuestions.length === 0 ? (
        <p className="text-center text-gray-600">No bookmarked questions yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookmarkedQuestions.map((question) => (
            <div
              key={question.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2">{question.title}</h3>
              <p className="text-sm text-gray-500 mb-4">
                Difficulty: {question.difficulty}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => handleSolve(question.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Solve Now
                </button>
                <button
                  onClick={() => handleRemoveBookmark(question.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmark;
