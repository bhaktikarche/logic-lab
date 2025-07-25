# 💡 Logic Lab – Coding Practice Platform

Logic Lab is a full-stack coding platform like HackerRank where users can solve programming problems, run code in multiple languages using Judge0, bookmark questions, and view their submissions.

---

## 🎥 Demo

▶️ [Watch Demo Video on Google Drive](https://drive.google.com/file/d/1ehjE66bnuMCa14Ccefq8QatRbdmh1Nba/view?usp=sharing)

---

## 🚀 Features

### 👨‍💻 Frontend (React + Vite)
- ✅ User authentication (Register & Login)
- 🧠 Dashboard with categorized questions (by subject & difficulty)
- ✍️ Solve Page with Monaco Editor
- ⚙️ Run & Submit code using Judge0 API
- 📌 Bookmark your favorite questions
- 📜 View submission history
- 🌗 Light/Dark Mode Toggle
- 🔐 Protected routes using JWT

### 🛠 Backend (Node.js + Express + MySQL)
- 🔐 Auth APIs – Register, Login with hashed passwords
- ❓ Question APIs – Fetch by ID, subject, difficulty
- 📌 Bookmark APIs – Add/remove bookmarks per user
- 📨 Submission APIs – Track and retrieve past submissions
- 📚 Subject APIs – Organize problems by subject
- 🔐 Middleware – JWT authentication & route protection

---

## 🧱 Folder Structure

```

logic\_lab/
│
├── logic\_lab-backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookmarkController.js
│   │   ├── questionController.js
│   │   ├── subjectController.js
│   │   └── submissionController.js
│   ├── models/
│   │   ├── db.js
│   │   ├── User.js
│   │   ├── Question.js
│   │   └── ...
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── bookmarkRoutes.js
│   │   ├── questionRoutes.js
│   │   ├── subjectRoutes.js
│   │   └── submissionRoutes.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   └── server.js
│
├── public/
│   └── assets/
│       ├── login-preview\.gif
│       └── login.mp4
│
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── SolvePage.jsx
│   │   ├── Bookmarks.jsx
│   │   ├── Submissions.jsx
│   │   ├── Login.jsx
│   │   ├── Signup.jsx
│   │   └── ProtectedRoute.jsx
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .gitignore
├── package.json
└── vite.config.js

````

---

## 🔧 Environment Variables (`.env`)

Create a `.env` file inside `logic_lab-backend`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=logic_lab
JWT_SECRET=your_secret_key
````

---

## ⚙️ How to Run Locally

### ✅ Prerequisites

* Node.js and npm
* MySQL
* Judge0 API (self-hosted or RapidAPI)

### 🔌 Backend Setup

```bash
cd logic_lab/logic_lab-backend
npm install
npm run dev
```

> Make sure your MySQL database is running and matches your `.env` settings.

### 💻 Frontend Setup

```bash
cd logic_lab
npm install
npm run dev
```

---

## 🧠 Tech Stack

| Layer     | Tech                             |
| --------- | -------------------------------- |
| Frontend  | React, Vite, Tailwind (optional) |
| Backend   | Node.js, Express.js              |
| Auth      | JWT, bcrypt                      |
| Database  | MySQL                            |
| Code Exec | Judge0 API                       |
| Editor    | Monaco Editor                    |
| Toasts    | React Hot Toast                  |
| Icons     | React Icons                      |

---

## 📌 Future Improvements

* 🏆 Leaderboard and points
* ⏱ Timed contests
* 📊 Profile stats and streaks
* 🧪 Admin panel for uploading test cases
* 🧩 Add more languages and debugging tools

---

## 📜 License

MIT © [Bhakti Karche](https://github.com/bhaktikarche)
