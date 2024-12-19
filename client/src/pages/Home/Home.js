import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { format_url } from "../../conf.js";
import { jwtDecode } from "jwt-decode";
import "./Home.css";
import { data } from "react-router-dom";

function Home() {
  const [username, setUsername] = useState("");
  const [totalBookings, setTotalBookings] = useState(0); // since its number
  let total = totalBookings;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    setUsername(decoded.user);
    // ok lemme just see if it works

    fetchBookings(token, "created");
  }, [])
  
  const fetchBookings = async (token, type) => {
    const url = format_url({ endpoint: "/api/history", q: { type: type } });
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (resp.ok) {
      const data = await resp.json();
      setTotalBookings(data.data.length);
    } else {
      alert("unable to fetch bookings");
    }
  };
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
          <h3><center>Total Bookings</center></h3>
          <p><center>{totalBookings}</center></p>
        </div>
      </div>

    </div>
  );
};
export default Home;
