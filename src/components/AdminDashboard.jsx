import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState('');
  const [newQuestion, setNewQuestion] = useState({
    subject: '',
    title: '',
    description: '',
    difficulty: 'Easy'
  });

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];
    setSubjects(storedSubjects);
  }, []);

  const handleAddSubject = () => {
    if (!newSubject.trim()) return;

    const updatedSubjects = [...subjects, newSubject.trim().toLowerCase()];
    setSubjects(updatedSubjects);
    localStorage.setItem('subjects', JSON.stringify(updatedSubjects));
    setNewSubject('');
  };

  const handleAddQuestion = () => {
    const questionData = JSON.parse(localStorage.getItem('questions')) || [];
    const newId = Date.now();

    const question = {
      id: newId,
      subject: newQuestion.subject,
      title: newQuestion.title,
      description: newQuestion.description,
      difficulty: newQuestion.difficulty
    };

    questionData.push(question);
    localStorage.setItem('questions', JSON.stringify(questionData));
    alert('Question added!');
    setNewQuestion({ subject: '', title: '', description: '', difficulty: 'Easy' });
  };

  return (
    <div className="admin-container">
      <h2><i className="fas fa-user-shield"></i> Admin Dashboard</h2>

      <div className="admin-section">
        <h3>Add New Subject</h3>
        <input
          type="text"
          placeholder="Enter subject name (e.g., Python)"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <button onClick={handleAddSubject}>Add Subject</button>
      </div>

      <div className="admin-section">
        <h3>Add New Question</h3>
        <select
          value={newQuestion.subject}
          onChange={(e) => setNewQuestion({ ...newQuestion, subject: e.target.value })}
        >
          <option value="">Select Subject</option>
          {subjects.map((sub, i) => (
            <option key={i} value={sub}>{sub}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Question Title"
          value={newQuestion.title}
          onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
        />
        <textarea
          placeholder="Question Description"
          value={newQuestion.description}
          onChange={(e) => setNewQuestion({ ...newQuestion, description: e.target.value })}
        />
        <select
          value={newQuestion.difficulty}
          onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <button onClick={handleAddQuestion}>Add Question</button>
      </div>
    </div>
  );
}
