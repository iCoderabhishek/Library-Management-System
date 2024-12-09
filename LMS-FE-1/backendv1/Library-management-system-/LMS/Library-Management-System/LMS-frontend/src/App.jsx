import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import ShowAvailableBooks from "./components/ShowAvailableBooks";
import ShowAllBorrowedBooks from "./components/ShowAllBorrowedBooks";
import BorrowReturnBooks from "./components/BorrowReturnBooks"; // Create this component similarly
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protect the Dashboard route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/available-books"
          element={
            <ProtectedRoute>
              <ShowAvailableBooks />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/borrowed-books"
          element={
            <ProtectedRoute>
              <ShowAllBorrowedBooks />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/borrow-return-books"
          element={
            <ProtectedRoute>
              <BorrowReturnBooks />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
