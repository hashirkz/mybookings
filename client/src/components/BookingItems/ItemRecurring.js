import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemRecurring = (booking, owner) => {
  const navigate = useNavigate();

  return (
    <div className="booking-info">
        <h1>{booking.title} with {owner}</h1>
        <p>on {booking.options.dat}</p>
        <p>{booking.startTime} to {booking.endTime}</p>
        <p>Message: {booking.mesage}</p>
    </div>
  );
};

export default ItemRecurring;
