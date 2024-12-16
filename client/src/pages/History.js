import { React, useState, useEffect } from "react";
import NavBar from "../components/NavBar/NavBar.js";
import BookingGallery from "../components/BookingGallery/BookingGallery.js";
import { format_url } from "../conf.js";
import "./History.css";

function History() {
  const [createdBookings, setCreatedBookings] = useState([]);
  const [invitedBookings, setInvitedBookings] = useState([]);

  const handleDelete = async (booking_id, setBookings) => {
    try {
      const token = localStorage.getItem("token");
      const url = format_url({ endpoint: "/api/booking" }) + `/${booking_id}`;
      const resp = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (resp.ok) {
        setBookings((current) => {
          return current.filter((booking) => booking.booking_id != booking_id);
        });
      }
    } catch (err) {
      alert("unable to delete this booking");
    }
  };

  const fetchBookings = async (token, type) => {
    const url = format_url({ endpoint: "/api/history" }) + `?type=${type}`;
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (resp.ok) {
      const data = await resp.json();
      type == "created"
        ? setCreatedBookings(data.data)
        : setInvitedBookings(data.data);
    } else {
      alert("unable to fetch bookings");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchBookings(token, "created");
      fetchBookings(token, "invited");
    }
  }, []);

  // sorting the bookings
  // const sortedCreatedBookings = [...createdBookings].sort(
  //   (booking1, booking2) => {
  //     return new Date(booking2.start) - new Date(booking1.start);
  //   }
  // );

  // const sortedInvitedBookings = [...invitedBookings].sort(
  //   (booking1, booking2) => {
  //     return new Date(booking2.start) - new Date(booking1.start);
  //   }
  // );
  return (
    <>
      <NavBar />
      <div className="history-container">
        <BookingGallery
          bookings={createdBookings}
          name="your bookings"
          deletable={true}
          handleDelete={(booking_id) =>
            handleDelete(booking_id, setCreatedBookings)
          }
        />
        <BookingGallery
          bookings={invitedBookings}
          name="your invited"
          deletable={false}
        />
      </div>
    </>
  );
}



export default History;
