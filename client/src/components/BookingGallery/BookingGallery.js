import { React, useState, useEffect } from "react";
import { format_url } from "../../conf.js";
import "./BookingGallery.css";

function BookingGallery({ bookings, name, deletable }) {
  const [currentBookings, setCurrentBookings] = useState(bookings);

  useEffect(() => {
    setCurrentBookings(bookings);
  }, [bookings]);

  const handleDelete = async (booking_id) => {
    try {
      const token = localStorage.getItem("token");
      const url = format_url({ endpoint: "/api/booking" }) + `${booking_id}`;
      const resp = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (resp.ok) {
        setCurrentBookings((current) => {
          current.filter((booking) => booking.booking_id != booking_id);
        });
      }
    } catch (err) {
      alert("unable to delete this booking");
    }
  };

  return (
    <div className="bookings-container">
      <p>{name}</p>
      {currentBookings.length === 0 ? (
        <p>No bookings</p>
      ) : (
        currentBookings.map((booking) => (
          <div className="booking-item-container" key={booking.booking_id}>
            <a
              className="booking-item"
              href={`/booking-details/${booking.booking_id}`}
            >
              <p>{booking.name}</p>
              <p>{booking.start}</p>
              {deletable && (
                <button
                  className="delete-booking"
                  onClick={() => handleDelete(booking.booking_id)}
                >
                  x
                </button>
              )}
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default BookingGallery;
