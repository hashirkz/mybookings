import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format_date, format_url } from "../../conf.js";
import AttachmentForm from "../AttachmentForm/AttachmentForm.js";


function BookingRecurring() {
    const [title, setTitle] = useState("");
    const [days, setDays] = useState([]);
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
  
    const handleDayChange = (e) => {
      const { value, checked } = e.target;
      setDays((prevDays) =>
        checked ? [...prevDays, value] : prevDays.filter((day) => day !== value)
      );
    };

    const validateInput = () => {
      if (startTime >= endTime) {
          alert("End time must be after start time.");
          return false;
      }
      if (days.length === 0 || days === null) {
        alert("Please pick a day to repeat each week.");
        return false;
    }
      return true;
   };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    const token = localStorage.getItem("token"); 
    console.log(days);

    let booking = {
        type: "recurring",
        title: title,
        days: days, 
        startTimes: startTime,
        endTimes: endTime,
        startDate: startDate,
        endDate: endDate,
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
      const booking_id =  data.data?.booking_id;

      if (booking_id) {
          navigate(`/booking-details/${booking_id}`);
      } else {
          alert("Booking ID not found in response.");
      }
    }
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
        <AttachmentForm message={message} setMsg={setMessage}/>
        <div className="button-submit">
          <button type="submit">Create Recurring Meeting URL</button>
        </div>
        
      </form>
    );
  }

export default BookingRecurring;
