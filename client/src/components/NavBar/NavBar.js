import React from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import Dropdown from "./Dropdown";

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }
  
  return (
    <div className="navbar">
      <div className="navbar-left">
          <a href="/home" className="navbar-title">
            <img src="/logo-background.png" className="navbar-logo" alt="Logo"></img>
            myBookings
          </a>
        </div>
      <div className="navbar-right">
        <a href="/request" className="navbar-link">Request</a>
        <a href="/booking" className="navbar-link">Booking</a>
        <a href="/home" className="navbar-link">History</a>
        <button className="logout-button" onClick={handleLogout}>Log Out</button>
      </div>
      <Dropdown/>
    </div>
  );
}

export default NavBar;
