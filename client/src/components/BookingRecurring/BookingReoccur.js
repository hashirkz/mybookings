import React, { useState } from "react";
import { format_date } from "../../conf";

function BookingRecurring() {
    const [title, setTitle] = useState("");
    const [days, setDays] = useState([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
  
    const handleDayChange = (event) => {
      const { value, checked } = event.target;
      setDays((prevDays) =>
        checked ? [...prevDays, value] : prevDays.filter((day) => day !== value)
      );
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (!title || !days.length || !startTime || !endTime) {
        alert("Please fill out all required fields.");
        return;
      }
  
      let message = `Recurring Meeting Scheduled:\nTitle: ${title}\nDays: ${days.join(", ")}\nTime: ${startTime} to ${endTime}`;
  
  
      alert(message);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Recurring Meeting</h2>

        <div className="forms">
          <label>Meeting Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="forms">
          <label>Start Date:</label>
          <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
          />

        </div>
        <div className="forms">
          <label>End Date:</label>
          <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
          />

        </div>
       
        <div className="forms">
          <label>Days of the Week:</label>
          <div>
            {["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"].map(
              (day) => (
                <label key={day}>
                  <input
                    className="checkbox"
                    type="checkbox"
                    value={day}
                    checked={days.includes(day)}
                    onChange={handleDayChange}
                  />
                  {day}
                </label>
              )
            )}
          </div>
        </div>
        
        <div className="forms">
          <label>Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>

        <div className="forms">
          <label>End Time:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div> 
        <div className="button-submit">
          <button type="submit">Create Recurring Meeting URL</button>
        </div>
        
      </form>
    );
  }

export default BookingRecurring;
