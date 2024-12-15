import { React, useState, useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import { format_url } from "../conf.js";
import "./History.css";

function History() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async (token) => {
    const url = format_url({ endpoint: "/api/history" });
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (resp.ok) {
      const data = await resp.json();
      setBookings(data.data);
    } else {
      alert("unable to fetch bookings");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token);
      fetchBookings(token);
    }
  }, []);

  // sorting the bookings
  const sortedBookings = bookings.sort((booking1, booking2) => {
    return new Date(booking2.start) - new Date(booking1.start);
  });
  return (
    <>
      <NavBar />
      <div className="history-container">
        <div className="bookings-container">
          {sortedBookings.length == 0 ? (
            <p>no bookings</p>
          ) : (
            sortedBookings.map((booking) => {
              return (
                <a
                  className="booking-item"
                  href={`booking/${booking.booking_id}`}
                >
                  <p>{booking.name}</p>
                  <p>{booking.start}</p>
                </a>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

export default History;
