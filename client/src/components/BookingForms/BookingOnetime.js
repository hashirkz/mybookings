import React, { useState } from "react";
import AttachmentForm from "../AttachmentForm/AttachmentForm.js";
import { format_date, format_url } from "../../conf.js";


function BookingOnetime() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [message, setMessage] = useState("");
    
    
    const validateInput = () => {
      if (startTime >= endTime) {
          alert("End time must be after start time.");
          return false;
      }
      return true;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateInput()) return;
      
      const token = localStorage.getItem("token");
      let booking = {
          type: "onetime",
          title: title,
          dates: date, 
          startTimes: startTime,
          endTimes: endTime,
          message: message,  
      };
      console.log(booking);

      const url = format_url({ endpoint: "/api/booking" });
      const resp = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });
  
      if (resp.ok) {
        const data = await resp.json();
        return data.data?.booking_id;
      }

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

        <AttachmentForm message={message} setMsg={setMessage}/>

        <div className="button-submit">
          <button type="submit">Create One-Time Meeting URL</button>
        </div>
        </form>
    );
}
export default BookingOnetime;