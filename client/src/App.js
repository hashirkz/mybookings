import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
      <Route path="/home" element={<Home />} />
      <Route path="/booking" element={<Booking />} />

      <Route path="/request" element={<Request />} />

      <Route path="/history" element={<History />} />

    </Routes>
  </Router>
  );
}

export default App;
