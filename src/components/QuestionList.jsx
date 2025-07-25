import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./QuestionList.css";

function QuestionList() {
  const { subjectId } = useParams(); 
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/questions/${subjectId}`)
      .then((res) => {
        setQuestions(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load questions");
        setLoading(false);
      });
  }, [subjectId]);

  const getDifficultyClass = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'difficulty-easy';
      case 'medium':
        return 'difficulty-medium';
      case 'hard':
        return 'difficulty-hard';
      default:
        return '';
    }
  };

  return (
    <div className="question-list-container">
      <header className="question-list-header">
        <h1 className="project-title">Logic Lab</h1>
        <Link to="/dashboard" className="back-to-dashboard">
          ← Back to Dashboard
        </Link>
      </header>
      
      <h2 className="subject-title">{subjectId.charAt(0).toUpperCase() + subjectId.slice(1)} Questions</h2>
      
      {loading ? (
        <p className="loading-message">Loading questions...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : questions.length === 0 ? (
        <p>No questions found for this subject.</p>
      ) : (
        <ul className="questions-ul">
          {questions.map((q) => (
            <li key={q.id} className="question-item">
              <Link to={`/solve/${subjectId}/${q.id}`} className="question-link">
                {q.title}
                <span className={`difficulty-tag ${getDifficultyClass(q.difficulty)}`}>
                  {q.difficulty}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default QuestionList;