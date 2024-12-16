import { React } from "react";
import "./BookingCalendar.css";

const BookingCalendar = ({
  currentDate,
  selectedDate,
  changeMonth,
  handleSelectedDate,
}) => {
  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(month + 1, year);
    const firstDay = getFirstDayOfMonth(month, year);

    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="month-button" onClick={() => changeMonth(-1)}>
          &lt;
        </button>
        <h2>
          {currentMonth} {currentYear}
        </h2>
        <button className="month-button" onClick={() => changeMonth(1)}>
          &gt;
        </button>
      </div>
      <div className="calendar-grid">
        <div className="calendar-day-header">
          <div className="calendar-day-header">Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="calendar-days">
          {renderCalendar().map((day, index) =>
            day ? (
              <div
                className={`calendar-day ${
                  day &&
                  selectedDate &&
                  selectedDate.getDate() === day &&
                  selectedDate.getMonth() === month &&
                  selectedDate.getFullYear() === year
                    ? "selected"
                    : ""
                }`}
                key={index}
                onClick={() => day && handleSelectedDate(day)}
              >
                {day}
              </div>
            ) : (
              <div className="calendar-day-empty" key={index}></div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
