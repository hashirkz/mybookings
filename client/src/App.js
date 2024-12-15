import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute.js";
import Login from "./components/Login-Signup/Login.js";
import Signup from "./components/Login-Signup/Signup.js";
import Home from "./pages/Home.js";
import Booking from "./pages/Booking.js";
import History from "./pages/History.js";
import Request from "./pages/Request.js";
import Landing from "./pages/Landing.js";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
        <Route path="/request" element={<ProtectedRoute><Request /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />

      </Routes>
    </Router>
  );
}

export default App;
