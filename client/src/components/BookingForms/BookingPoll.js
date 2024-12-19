import React, { useState } from "react";
import { format_date, format_url } from "../../conf.js";
import AttachmentForm from "../AttachmentForm/AttachmentForm.js";
import { useNavigate } from "react-router-dom";


function BookingPoll() {
    const [title, setTitle] = useState("");
    const [options, setOptions] = useState([
        { date: "", startTime: "", endTime: "" },
    ]);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const addOption = () => {
        setOptions([...options, { date: "", startTime: "", endTime: "" }]);
    };

    const handleOptionChange = (index, field, value) => {
        const newOptions = [...options];
        newOptions[index][field] = value;
        setOptions(newOptions);
    };

    const deleteOption = (index) => {
        const newOptions = options.filter((_, i) => i !== index);
        setOptions(newOptions);
        
    };

    const validateInput = () => {
        for (const option of options) {
            if (option.startTime >= option.endTime) {
                alert("End time must be after start time.");
                return false;
            }
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInput()) return;
        
        const token = localStorage.getItem("token");
        const dates = options.map(option => option.date);
        const startTimes = options.map(option => option.startTime);
        const endTimes = options.map(option => option.endTime);
        let booking = {
            type: "poll",
            title: title,
            dates: dates, 
            startTimes: startTimes,
            endTimes: endTimes,
            message: message,  
            invited: [], 
            votes: [], 
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
        <h2>Meeting Poll</h2>
        <div className="forms">

            <label>Poll Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
        </div>

        <label style={{ marginLeft: "30%", fontWeight:"bolder", color: "#b44a6d" }}>Options for Voting:</label>
        {options.map((option, index) => (
            <div
            key={index}
            >
            <div className="forms">
                <label>Date:</label>
                <input
                    type="date"
                    value={option.date}
                    onChange={(e) => handleOptionChange(index, "date", e.target.value)}
                    required
                />
            </div>
            

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
            <button type="submit">Create Poll</button>
            </div>
        </form>
    );
}

export default BookingPoll;
