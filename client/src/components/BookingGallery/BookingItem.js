import { React } from "react";

function BookingItem({ booking, deletable, handleDelete }) {
  return (
    <>
      <a
        className="booking-item"
        href={`/booking-details/${booking.booking_id}`}
      >
        <p>{booking.title}</p>
        <p>{booking.type}</p>
        {deletable && (
          <button
            className="delete-booking"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDelete(booking.booking_id);
            }}
          >
            x
          </button>
        )}
      </a>
    </>
  );
}

export default BookingItem;
