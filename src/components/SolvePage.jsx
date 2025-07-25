import React, { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiCode,
  FiPlay,
  FiBookmark,
  FiUser,
  FiArrowLeft,
} from "react-icons/fi";
import {
  FaJava,
  FaPython
} from "react-icons/fa";
import {
  SiCplusplus,
  SiJavascript
} from "react-icons/si";
import "./SolvePage.css";

const SolvePage = () => {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const defaultCodeTemplates = {
    cpp: `#include <iostream>
using namespace std;

int main() {
    // Your code here
    return 0;
}`,
    python: `# Your code here`,
    java: `public class Main {
    public static void main(String[] args) {
        // Your code here
    }
}`,
    javascript: `// Your code here`
  };

  const languageIcons = {
    cpp: <SiCplusplus className="language-icon" />,
    python: <FaPython className="language-icon" />,
    java: <FaJava className="language-icon" />,
    javascript: <SiJavascript className="language-icon" />
  };

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/questions/question/${questionId}`
        );
        setQuestion(res.data);
        setCode(defaultCodeTemplates[language] || "");

        const token = localStorage.getItem("token");
        if (token) {
          try {
            const bookmarkRes = await axios.get(
              `http://localhost:5000/api/bookmarks/${questionId}/bookmark-status`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            setIsBookmarked(bookmarkRes.data.isBookmarked);
          } catch (bookmarkErr) {
            console.warn("Unable to fetch bookmark status", bookmarkErr);
            setIsBookmarked(false);
          }
        }
      } catch (err) {
        console.error("Error loading question:", err);
        toast.error("❌ Failed to load question");
      }
    };

    fetchQuestionData();
  }, [questionId, language]);

  const getLanguageId = (lang) => {
    switch (lang) {
      case "cpp": return 54;
      case "python": return 71;
      case "java": return 62;
      case "javascript": return 63;
      default: return 54;
    }
  };

  const runCode = async (input) => {
    try {
      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: code,
          language_id: getLanguageId(language),
          stdin: input || "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": "10bc6b6ab0mshf64167fd2aefaa2p146d08jsnf708294cb69a",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      return response.data.stdout || response.data.stderr || response.data.compile_output || "⚠️ No Output";
    } catch (error) {
      console.error("Execution Error:", error);
      return "💥 Error while executing code";
    }
  };

  const handleRun = async () => {
    if (!question) return;
    setLoading(true);
    setOutput("⏳ Running your code...");

    try {
      const result = await runCode(userInput);
      setOutput(result.trim());
      toast.success("✅ Code executed!");
    } catch {
      toast.error("❌ Execution error");
    } finally {
      setLoading(false);
    }
  };

  const toggleBookmark = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to bookmark questions");
      return navigate("/login");
    }

    try {
      if (isBookmarked) {
        await axios.delete(`http://localhost:5000/api/questions/${questionId}/bookmark`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("🔖 Bookmark removed");
      } else {
        await axios.post(`http://localhost:5000/api/questions/${questionId}/bookmark`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("🔖 Bookmarked!");
      }
      setIsBookmarked(!isBookmarked);
    } catch (err) {
      toast.error("⚠️ Bookmark update failed");
    }
  };

  const handleSubmit = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("Login required");
    return navigate("/login");
  }

  if (!question) {
    toast.error("Question not loaded");
    return;
  }

  try {
    const status =
      output.trim() === question.sample_output?.trim()
        ? "Correct"
        : "Wrong";

    await axios.post(
      `http://localhost:5000/api/submissions/${questionId}`,
      {
        language,
        code,
        output,
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("🎉 Submission successful!");
  } catch (err) {
    console.error(err);
    toast.error("❌ Submission failed");
  }
};


  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out");
    navigate("/login");
  };

  useEffect(() => {
    const closeMenu = (e) => {
      if (!e.target.closest(".profile-menu-container")) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, []);

  const getDifficultyClass = (difficulty) => {
    switch (difficulty) {
      case 1: return "easy";
      case 2: return "medium";
      case 3: return "hard";
      default: return "";
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 1: return "Easy";
      case 2: return "Medium";
      case 3: return "Hard";
      default: return "";
    }
  };

  return (
    <div className="solve-page">
      <header className="solve-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Back
        </button>
        <h1
  className="logo cursor-pointer hover:text-blue-500 transition"
  onClick={() => navigate("/dashboard")}
>
  <FiCode /> Logic Lab
</h1>

        <div className="profile-menu-container">
          <button className="profile-button" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <FiUser /> Profile
          </button>
          {showProfileMenu && (
            <div className="profile-dropdown">
              <button onClick={() => navigate("/profile")}>My Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      <div className="solve-container">
        <div className="problem-section">
          <div className="problem-header">
            <h2>{question?.title || "Loading question..."}</h2>
            {question && (
              <div className="question-meta">
                <span className={`difficulty-badge ${getDifficultyClass(question.difficulty)}`}>
                  {getDifficultyText(question.difficulty)}
                </span>
                <button
                  className={`bookmark-button ${isBookmarked ? "bookmarked" : ""}`}
                  onClick={toggleBookmark}
                >
                  <FiBookmark /> {isBookmarked ? "Bookmarked" : "Bookmark"}
                </button>
              </div>
            )}
          </div>

          <div className="problem-content">
            {question ? (
              <>
                <div className="problem-description">
                  <h3>Description</h3>
                  <p>{question.description}</p>
                </div>
                <div className="io-section">
                  <div className="io-group">
                    <h3>Input Format</h3>
                    <pre>{question.input_format}</pre>
                  </div>
                  <div className="io-group">
                    <h3>Output Format</h3>
                    <pre>{question.output_format}</pre>
                  </div>
                </div>
                <div className="constraints">
                  <h3>Constraints</h3>
                  <pre>{question.constraints}</pre>
                </div>
                <div className="sample-section">
                  <h3>Sample Input</h3>
                  <pre className="sample-input">{question.sample_input}</pre>
                  <h3>Sample Output</h3>
                  <pre className="sample-output">{question.sample_output}</pre>
                  {question.explanation && (
                    <>
                      <h3>Explanation</h3>
                      <p>{question.explanation}</p>
                    </>
                  )}
                </div>
              </>
            ) : (
              <div className="loading-content">Loading question details...</div>
            )}
          </div>
        </div>

        <div className="editor-section">
          <div className="editor-header">
            <div className="language-selector">
              {languageIcons[language]}
              <select
                value={language}
                onChange={(e) => {
                  setLanguage(e.target.value);
                  setCode(defaultCodeTemplates[e.target.value] || "");
                }}
              >
                <option value="cpp">C++</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="javascript">JavaScript</option>
              </select>
            </div>
            <div className="editor-actions">
              <button
                className={`run-button ${loading ? "loading" : ""}`}
                onClick={handleRun}
                disabled={loading}
              >
                <FiPlay /> {loading ? "Running..." : "Run"}
              </button>

     <button
  className="submit-button"
  onClick={handleSubmit}
  disabled={
    loading || !question || output.trim() !== question.sample_output?.trim()
  }
>
  ✅ Submit
</button>

            </div>
          </div>

          <MonacoEditor
            height="60vh"
            theme="vs-dark"
            language={language}
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              automaticLayout: true,
              wordWrap: "on",
              renderWhitespace: "selection",
              padding: { top: 10 }
            }}
            loading={<div className="editor-loading">Loading editor...</div>}
          />

          <div className="io-container">
            <div className="input-section">
              <h4>Custom Input</h4>
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Enter custom input to test your code..."
                rows={5}
              />
            </div>

            <div className="output-section">
              <h4>Output</h4>
              <pre className={`output-content ${output.includes("Error") ? "error" : ""}`}>
                {output || "Your output will appear here..."}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolvePage;
