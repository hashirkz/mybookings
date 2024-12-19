import { React, useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar.js";
import BookingGallery from "../../components/BookingGallery/BookingGallery.js";
import { format_url } from "../../conf.js";
import "./History.css";

function History() {
  const [createdBookings, setCreatedBookings] = useState([]);
  const [requests, setRequests] = useState([]);

  const handleDeleteBooking = async (booking_id, setBookings) => {
    try {
      const token = localStorage.getItem("token");
      const url = format_url({ endpoint: `/api/booking/${booking_id}` });
      const resp = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (resp.ok) {
        setBookings((current) => {
          return current.filter((booking) => booking.booking_id !== booking_id);
        });
      }
    } catch (err) {
      alert("unable to delete this booking");
    }
  };

  
  const handleDeleteRequest = async (requestId, setRequests) => {
    try {
      const token = localStorage.getItem("token");
      const url = format_url({ endpoint: `/api/request/${requestId}` });
      const resp = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (resp.ok) {
        setRequests((current) => {
          return current.filter((booking) => booking.requestId !== requestId);
        });
      }
    } catch (err) {
      alert("unable to delete this request");
    }
  };


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
      setCreatedBookings(data.data);
    } else {
      alert("unable to fetch bookings");
    }
  };

  const fetchRequests = async (token, type) => {
    const url = format_url({ endpoint: "/api/request", q: {type: type}});
    const resp = await fetch(url, {
        method: "GET",
        headers: {Authorization: `Bearer ${token}`}
      });
    if (resp.ok) {
      const data = await resp.json();
      if (type === "recipient") {
        setRequests(data.data);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchBookings(token, "created");
      // fetchBookings(token, "invited");
      fetchRequests(token, "recipient");

    }
  }, []);


  return (
    <>
      <NavBar />
      <div className="history-container">
        <BookingGallery
          bookings={createdBookings}
          name="Your Bookings"
          deletable={true}
          handleDelete={(booking_id) =>
            handleDeleteBooking(booking_id, setCreatedBookings)
          }
        />
        <BookingGallery
          bookings={requests}
          name="Your Requests"
          deletable={true}
          handleDelete={(requestId) => 
            handleDeleteRequest(requestId, setRequests)
          }
        />
      </div>
    </>
  );
}



export default History;
