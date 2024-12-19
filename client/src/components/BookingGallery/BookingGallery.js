import { React } from "react";
import BookingItem from "./BookingItem.js";
import RequestItem from "./RequestItem.js";
import "./BookingGallery.css";

function BookingGallery({ bookings, name, deletable, handleDelete }) {
  return (
    <div className="bookings-container">
      <p>{name}</p>
      {bookings.length === 0 ? (
        <p>no bookings</p>
      ) : (
        bookings.map((booking) => (       
          booking.type == "request" ? (
            <RequestItem
            key={booking.requestId}
            booking={booking}
            deletable={deletable}
            handleDelete={handleDelete}
            />
          ): (
            <BookingItem
            key={booking.booking_id}
              booking={booking}
              deletable={deletable}
              handleDelete={handleDelete}
            />
          )
        ))      
      )}
    </div>
  );
}

export default BookingGallery;
