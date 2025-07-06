import React from 'react';
import { useNavigate } from 'react-router-dom';
import './QuestionList.css';

const questions = [
  { id: 1, title: 'Two Sum', difficulty: 'Easy' },
  { id: 2, title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium' },
  { id: 3, title: 'Merge K Sorted Lists', difficulty: 'Hard' },
];

export default function QuestionList() {
  const navigate = useNavigate();

  return (
    <div className="question-list-container">
      <h2 className="question-list-title">
        <i className="fas fa-code"></i> Coding Questions
      </h2>

      {questions.map((q) => (
        <div key={q.id} className="question-card">
          <div>
            <h3 className="question-title">
              <i className="fas fa-circle-question" style={{ marginRight: '0.5rem' }}></i>
              {q.title}
            </h3>
            <p className={`difficulty ${q.difficulty.toLowerCase()}`}>
              <i className="fas fa-bolt" style={{ marginRight: '0.3rem' }}></i>
              Difficulty: {q.difficulty}
            </p>
          </div>
          <button
            className="solve-button"
            onClick={() => navigate(`/solve/${q.id}`)}
          >
            <i className="fas fa-play"></i> Solve
          </button>
        </div>
      ))}
    </div>
  );
}
