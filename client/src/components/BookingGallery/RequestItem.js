import { React } from "react";

function RequestItem({ booking, deletable, handleDelete }) {
  return (
    <>
      <div
        className="booking-item"
      >
        <p>{booking.title} on {booking.dates} from {booking.startTimes} to {booking.startTimes}</p>

        {deletable && (
          <button
            className="delete-booking"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleDelete(booking.requestId);
            }}
          >
            x
          </button>
        )}



      </div>
        
    </>
  );
}

export default RequestItem;
