import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; 
import Editor from '@monaco-editor/react';
import './SolvePage.css';

const allQuestions = [
  { id: 1, title: 'Two Sum', description: 'Find two numbers that add up to a target.', subject: 'javascript' },
  { id: 2, title: 'Reverse a String', description: 'Reverse a given string.', subject: 'javascript' },
  { id: 3, title: 'Longest Substring', description: 'Find the length of the longest substring without repeating characters.', subject: 'javascript' },
  { id: 4, title: 'Merge K Lists', description: 'Merge K sorted linked lists.', subject: 'cpp' },
  { id: 5, title: 'BCNF Decomposition', description: 'Perform BCNF decomposition of a relation.', subject: 'dbms' },
];

export default function SolvePage() {
  const { subject, id } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState('// Start coding here...');

  const question = allQuestions.find(q => q.id === parseInt(id) && q.subject === subject);

  const handleSubmit = () => {
    const existing = JSON.parse(localStorage.getItem('submissions')) || [];

    const newSubmission = {
      id: Date.now(),
      question: question.title,
      time: new Date().toLocaleString(),
      status: 'Passed', 
    };

    localStorage.setItem('submissions', JSON.stringify([newSubmission, ...existing]));

    toast.success('Code submitted!');
    navigate(`/questions/${subject}`);
  };

  const addBookmark = () => {
    const stored = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const exists = stored.find(q => q.id === question.id && q.subject === subject);

    if (!exists) {
      const updated = [...stored, { id: question.id, subject, title: question.title }];
      localStorage.setItem('bookmarks', JSON.stringify(updated));
      toast.success('Bookmarked!');
    } else {
      toast('Already bookmarked');
    }
  };

  if (!question) {
    return (
      <div className="solve-page-container">
        <p>Question not found.</p>
        <Link to={`/questions/${subject}`} className="back-button">
          <i className="fas fa-arrow-left"></i> Back to Questions
        </Link>
      </div>
    );
  }

  return (
    <div className="solve-page-container">
      <div className="solve-header">
        <Link to={`/questions/${subject}`} className="back-button">
          <i className="fas fa-arrow-left"></i> Back to Questions
        </Link>
        <h2><i className="fas fa-terminal"></i> {question.title}</h2>
      </div>

      <div className="question-details">
        <p>{question.description}</p>
      </div>

      <div className="code-editor-placeholder">
        <Editor
          height="300px"
          defaultLanguage={subject === 'cpp' ? 'cpp' : 'javascript'}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
        />
      </div>

      <div className="button-group">
        <button className="submit-button" onClick={handleSubmit}>
          <i className="fas fa-paper-plane"></i> Submit Code
        </button>
        <button className="bookmark-button" onClick={addBookmark}>
          <i className="fas fa-bookmark"></i> Bookmark
        </button>
      </div>
    </div>
  );
}
