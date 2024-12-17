import React, { useState } from "react";
import { format_date } from "../../conf";

function RequestForm() {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [emails, setEmails] = useState([""]);

    const handleEmailChange = (index, value) => {
        const newEmails = [...emails];
        newEmails[index] = value;
        setEmails(newEmails);
      };
    
    const addEmail = () => {
        setEmails([...emails, ""]);
    };

    const removeEmail = (index) => {
        const newEmails = emails.filter((_, i) => i !== index);
        setEmails(newEmails);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Send a Request</h2>
            
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

        <label>Invite Emails:</label>
            {emails.map((email, index) => (
                <div key={index} style={{ marginBottom: "0.5em" }}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => handleEmailChange(index, e.target.value)}
                    required
                    placeholder="Enter email"
                />
                <button
                    type="button"
                    onClick={() => removeEmail(index)}
                >
                    Remove
                </button>
                </div>
            ))}

            <button type="button" onClick={addEmail}>
                + Add Email
            </button>
        </form>
    );
}

export default RequestForm;
