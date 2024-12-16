import { React, useState, useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import BookingCalendar from "../components/BookingCalendar/BookingCalendar";
import { format_url, format_date } from "../conf.js";

function Booking() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleSelectedDate = (day) => {
    const newSelectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(newSelectedDate);
  };
  return (
    <>
      <NavBar />
      <BookingCalendar
        currentDate={currentDate}
        selectedDate={selectedDate}
        changeMonth={changeMonth}
        handleSelectedDate={handleSelectedDate}
      />
    </>
  );
}

export default Booking;
