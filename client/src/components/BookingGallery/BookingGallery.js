import { React } from "react";
import "./BookingGallery.css";

function BookingGallery({ bookings, name }) {
  return (
    <div className="bookings-container">
      <p>{name}</p>
      {bookings.length == 0 ? (
        <p>no bookings</p>
      ) : (
        bookings.map((booking) => {
          return (
            <a className="booking-item" href={`booking/${booking.booking_id}`}>
              <p>{booking.name}</p>
              <p>{booking.start}</p>
            </a>
          );
        })
      )}
    </div>
  );
}

export default BookingGallery;
