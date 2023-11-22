// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; // Import Navigate
import { useSelector } from "react-redux";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/DashBoard";
import StudentInfo from "./pages/StudentInfo";
import Navbar from "./components/Navbar";
import FeedbackForm from "./pages/FeedbackForm";
import Feedback from "./pages/Feedback";

const Main = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      {isAuthenticated && <Navbar/>}
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />}
        />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/feedback"
          element={isAuthenticated ? <Feedback/> : <Navigate to="/login" />}
        />
        <Route
          path="/student-info/:id"
          element={isAuthenticated ? <StudentInfo /> : <Navigate to="/login" />}
        />
        <Route
          path="/feedback-form/:id"
          element={<FeedbackForm />}
        />
        <Route index element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default Main;
