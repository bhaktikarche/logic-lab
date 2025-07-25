import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import QuestionList from "./components/QuestionList";
import SolvePage from "./components/SolvePage";
import Profile from "./components/Profile";
import AdminDashboard from "./components/AdminDashboard";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./components/LandingPage";
import { Toaster } from "react-hot-toast";
import Bookmarks from "./components/Bookmarks";
import SubmissionsPage from "./components/SubmissionsPage.jsx";

function App() {
  return (
    <>

        <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  containerStyle={{}}
  toastOptions={{
    // Define default options
    className: '',
    duration: 5000,
    removeDelay: 1000,
    style: {
      background: '#363636',
      color: '#fff',
    },

    // Default options for specific types
    success: {
      duration: 3000,
      iconTheme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
      <Routes>
        {/* Public Routes */}
         <Route path="/" element={<LandingPage />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/questions/:subjectId"
          element={
            <ProtectedRoute>
              <QuestionList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/solve/:subjectId/:questionId"
          element={
            <ProtectedRoute>
              <SolvePage/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/submissions"
          element={
            <ProtectedRoute>
              <SubmissionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
         <Route
          path="/bookmarks"
          element={
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          }
        />
       

        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>


  
    </>
  );
}

export default App;
