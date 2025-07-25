# Logic_Lab 💡

Logic_Lab is a web-based platform designed to help users practice, bookmark, and solve coding questions categorized by subject and difficulty. Built using a full-stack architecture with a React frontend and a Node.js + Express backend, it simulates a HackerRank-like experience for developers.

---

## 🚀 Features

### 👨‍💻 Frontend (React)
- User login & registration flow
- Dashboard with categorized coding questions
- Modal popup to display question results
- Question filtering by subject/difficulty
- Bookmarking functionality
- Clean and responsive UI (Vite + React)

### 🛠 Backend (Node.js + Express)
- RESTful APIs for:
  - **Users**
  - **Subjects**
  - **Questions**
  - **Bookmarks**
- Authentication middleware (JWT-based)
- Controller & route structure for modularity

---

## 📁 Project Structure

```

logic_lab/
│
├── logic_lab-backend/
│   ├── controllers/
│   │   ├── bookmarkController.js
│   │   ├── questionController.js
│   │   └── subjectController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── routes/
│   │   ├── bookmarkRoutes.js
│   │   ├── questionRoutes.js
│   │   └── subjectRoutes.js
│   └── db.txt                        # Temporary/test database
│
├── public/
│   └── assets/
│       └── login.mp4                # Login background video
│
├── src/
│   └── components/
│       ├── AdminDashboard.jsx       # Admin view for managing users/questions
│       ├── Auth.jsx                 # Auth logic for login/signup & route protection
│       ├── Bookmarks.jsx            # Displays user's bookmarked questions
│       ├── Dashboard.jsx            # Main user dashboard with questions overview
│       ├── LandingPage.jsx          # Public landing page
│       ├── Login.jsx                # Login form component
│       ├── NotFound.jsx             # 404 fallback page
│       ├── Profile.jsx              # User profile and activity stats
│       ├── ProtectedRoute.jsx       # Route wrapper for authenticated views
│       ├── QuestionList.jsx         # Question browser by difficulty/subject
│       ├── ResultModal.jsx          # Result feedback modal after solving
│       ├── Signup.jsx               # Signup form component
│       ├── SolvePage.jsx            # Question solving interface
│       └── Submissions.jsx          # List of user submissions
│
├── package.json                     # Project metadata and dependencies
└── vite.config.js                   # Vite configuration

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/bhaktikarche/logic-lab.git
cd logic-lab
````

### 2. Install frontend dependencies

```bash
npm install
npm run dev
```

### 3. Setup backend

```bash
cd logic_lab-backend
npm install
node server.js
```

> Make sure to configure environment variables and MongoDB/MySQL (if using real DB instead of `db.txt`)

---

## 🛡 Tech Stack

* **Frontend**: React, Vite
* **Backend**: Node.js, Express.js
* **Auth**: JWT + Middleware
* **State Handling**: useState, useEffect
* **Styling**: CSS
* **Database**: Placeholder (`db.txt`), easily extendable to MongoDB/MySQL

---

## 📌 TODO / Coming Soon

* Leaderboard system
* Timer for coding questions
* Profile page & user stats
---

## 📄 License

MIT License © [Bhakti Karche](https://github.com/bhaktikarche)

```
