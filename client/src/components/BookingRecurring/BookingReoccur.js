import React, { useState } from "react";
import { format_date } from "../../conf";

function BookingRecurring() {
    const [title, setTitle] = useState("");
    const [days, setDays] = useState([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
  
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
  
        <label>Meeting Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
  
        <label>Days of the Week:</label>
        <div>
          {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
            (day) => (
              <label key={day} style={{ marginRight: "10px" }}>
                <input
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
  
        <label>Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
        />
  
        <label>End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
        />
  
        <button type="submit">Create Recurring Meeting</button>
      </form>
    );
  }

export default BookingRecurring;
