import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ItemOnetime = (booking, owner ) => {
  const navigate = useNavigate();
  const [currBookings, setBooking] = useState({});
  const [currOwner, setOwner] = useState("");

  useEffect(() => {
    if (booking) {
      setBooking(booking);
    }
    if (owner) {
      setOwner(owner);
    }
  });

  return (
    <div>
        <h1>{currBookings.title} with {currOwner}</h1>
        <p>On {currBookings.date}</p>
        <p>From {currBookings.startTime} to {currBookings.endTime}</p>
        <p>Message: {currBookings.mesage}</p>
    </div>
  );
};

export default ItemOnetime;
