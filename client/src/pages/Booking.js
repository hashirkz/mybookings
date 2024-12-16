import { React, useState, useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import BookingCalendar from "../components/BookingCalendar/BookingCalendar";
import { format_url, format_date } from "../conf.js";

function Booking() {
  return (
    <>
      <NavBar />
      <BookingCalendar />
    </>
  );
}

export default Booking;
