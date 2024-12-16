import { React } from "react";
import BookingItem from "./BookingItem.js";
import "./BookingGallery.css";

function BookingGallery({ bookings, name, deletable, handleDelete }) {
  return (
    <div className="bookings-container">
      <p>{name}</p>
      {bookings.length === 0 ? (
        <p>no bookings</p>
      ) : (
        bookings.map((booking) => (
          <BookingItem
            booking={booking}
            deletable={deletable}
            handleDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default BookingGallery;
