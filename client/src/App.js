import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute.js";
import Booking from "./pages/Booking/Booking.js";
import BookingDetails from "./pages/BookingDetails/BookingDetails.js";
import History from "./pages/History/History.js";
import Home from "./pages/Home/Home.js";
import Landing from "./pages/Landing/Landing.js";
import Login from "./pages/Login/Login.js";
import Request from "./pages/Request/Request.js";
import SignUpFormPage from "./pages/SignUp/SignUpFormPage.js";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/booking-details/:booking_id"
          element={<BookingDetails />}
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request"
          element={
            <ProtectedRoute>
              <Request />
            </ProtectedRoute>
          }
        />
        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/signup-form"
          element={
            <ProtectedRoute>
              <SignUpFormPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
