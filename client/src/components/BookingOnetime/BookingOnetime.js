import React, { useState } from "react";

function BookingOnetime() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`One-Time Meeting Scheduled:\nTitle: ${title}\nDate: ${date}\nStart Tim: ${startTime}\nEnd Time:${endTime}`);
    };

    return (
        <form onSubmit={handleSubmit}>
        <h2>One-Time Meeting</h2>

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
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
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
          <button type="submit">Create One-Time Meeting URL</button>
        </div>
        </form>
    );
}
export default BookingOnetime;