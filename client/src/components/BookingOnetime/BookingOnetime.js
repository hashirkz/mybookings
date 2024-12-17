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
        <label>Meeting Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />

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
        <button type="submit">Create One-Time Meeting</button>
        </form>
    );
}
export default BookingOnetime;