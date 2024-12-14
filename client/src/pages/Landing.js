import React from "react";
import "./Landing.css";

const Landing = () => {

  return (
    <div className="layout-container">
      <div className="main-content">
        <div className="left-panel">
          <img src="/logo.png" alt="Logo" className="logo-image" />
        </div>
        <div className="right-panel">
          <h1>myBookings</h1>
          <p>Book your first meeting now!</p>
          <a className="start-button" href="/signup">Start Today!</a>
          <p>Already a member? <a className="login-here" href="/login" >Login Here</a></p>
          <p>Have a Booking URL?</p>
        </div>
      </div>
     
    </div>
  );
};

export default Landing;
