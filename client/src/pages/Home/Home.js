import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { format_url } from "../../conf.js";
import { jwtDecode } from "jwt-decode";
import "./Home.css";
import { data } from "react-router-dom";

function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    setUsername(decoded.user);

  }, [])

  return (
    <div className="home">
      <NavBar />
      <hr className="divider"/>

      <div className="welcome">
        <h1>Welcome, {username}</h1>
        <center><p className="desc">McGill's official platform for online booking.</p></center>
      </div>

      <div className="stats">
        <div className="card">
          <h3><center>Active Bookings</center></h3>
          <p><center>5</center></p>
        </div>
        <div className="card">
          <h3><center>Pending Requests</center></h3>
          <p><center>2</center></p>
        </div>
        <div className="card">
          <h3><center>Total Bookings</center></h3>
          <p><center>23</center></p>
        </div>
      </div>

    </div>
  );
}

export default Home;
