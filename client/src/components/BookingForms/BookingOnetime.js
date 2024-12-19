import React, { useState } from "react";
import AttachmentForm from "../AttachmentForm/AttachmentForm.js";
import { format_date, format_url } from "../../conf.js";
import { useNavigate } from "react-router-dom";

function BookingOnetime() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const [options, setOptions] = useState([
        {  startTime: "", endTime: "" },
    ]);
    
    
    const validateInput = () => {
      if (startTime >= endTime) {
          alert("End time must be after start time.");
          return false;
      }
      return true;
   };

   const addOption = () => {
    setOptions([...options, {  startTime: "", endTime: "" }]);
  };

  const deleteOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    
  };

  const handleOptionChange = (index, field, value) => {
    const newOptions = [...options];
    setStartTime (newOptions[index][0]);
    setEndTime (newOptions[index][1]);

    newOptions[index][field] = value;
    setOptions(newOptions);
  };

   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!validateInput()) return;
      
      const token = localStorage.getItem("token");
      const startTimes = options.map(option => option.startTime);
      const endTimes = options.map(option => option.endTime);
      let booking = {
          type: "onetime",
          title: title,
          dates: date, 
          startTimes: startTimes,
          endTimes: endTimes,
          message: message,
          invited: [],  
          votes: [],
      };
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
        console.log(booking_id)

        if (booking_id) {
            navigate(`/booking-details/${booking_id}`);
        } else {
            alert("Booking ID not found in response.");
        }
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

        {options.map((option, index) => (
            <div
            key={index}
            >        
            <div className="forms">
                <label>Start Time:</label>
                <input
                    type="time"
                    value={option.startTime}
                    onChange={(e) => handleOptionChange(index, "startTime", e.target.value)}
                    required
                />
            </div>

            <div className="delete-input">
                <div className="forms">
                    <label>End Time:</label>
                    <input
                        type="time"
                        value={option.endTime}
                        onChange={(e) => handleOptionChange(index, "endTime", e.target.value)}
                        required
                    />                
                <button
                    className="delete"
                    type="button"
                    onClick={() => deleteOption(index)}
                >
                    Delete Option
                </button>
                </div>
            </div>
            </div>
        ))}

        <AttachmentForm message={message} setMsg={setMessage}/>

        <div className="button-submit">
        <button type="button" onClick={addOption}>
                + Add Option
            </button>
          <button type="submit">Create One-Time Meeting URL</button>
        </div>
        </form>
    );
}
export default BookingOnetime;