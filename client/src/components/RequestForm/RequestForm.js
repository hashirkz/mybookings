import React, { useState } from "react";
import { format_date, format_url } from "../../conf";
import AttachmentForm from "../../components/AttachmentForm/AttachmentForm.js";


function RequestForm() {
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [emails, setEmails] = useState([""]);
    const [message, setMessage] = useState("");
    
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

    const validateInput = () => {
        if (startTime >= endTime) {
            alert("End time must be after start time.");
            return false;
        }

        if (!emails.length === 0 || emails === null) {
            alert("Must invite at least one email.");
            return false;
        }
        return true;
     };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInput()) return;

        const token = localStorage.getItem("token"); 
        console.log(emails)
        let request = {
            dates: date,
            emails: emails, 
            startTimes: startTime,
            endTimes: endTime,
            message: message,  
        };
        console.log(request);

        const url = format_url({ endpoint: "/api/booking" });
        const resp = await fetch(url, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
        });

        if (resp.ok) {
        const data = await resp.json();
        return data.data?.booking_id;
        }
  };

    return (
        <form onSubmit={handleSubmit}>
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
            
            <div className="forms">
                <label>Invite Email:</label>
                    {emails.map((email, index) => (
                        <div  key={index} style={{ marginBottom: "0.5em" }}>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => handleEmailChange(index, e.target.value)}
                            required
                            placeholder="Enter email"
                        />
                        <button
                            className="delete"
                            type="button"
                            onClick={() => removeEmail(index)}
                        >
                            Remove
                        </button>                        
                        </div>
                    ))}
            </div>
            <AttachmentForm message={message} setMsg={setMessage}/>
            
            <div className="button-submit">
                <button type="button" onClick={addEmail}>
                    + Add Email
                </button>
                <button type="submit">Create Request</button>
            </div>
        </form>
    );
}

export default RequestForm;
