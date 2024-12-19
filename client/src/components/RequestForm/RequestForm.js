import React, { useState } from "react";
import { format_date, format_url } from "../../conf";
import AttachmentForm from "../../components/AttachmentForm/AttachmentForm.js";


function RequestForm() {
    const [title, setTitle] = useState("");
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

    const fetchUserId = async (email) => {
        const token = localStorage.getItem("token");
        const url = format_url({ endpoint: `/api/users?user=${email}` });
        const resp = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
    
        if (resp.ok) {
          const data = await resp.json();
          return data.data?.user_id || null;
        }
        return null;
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateInput()) return;
        const recipientIds = [];

        const token = localStorage.getItem("token"); 

        for (const email of emails) {
            const id  = await fetchUserId(email);

            if (id){
                recipientIds.push(id);
            } else {
                alert(`Failed to find user ID for email: ${email}`);
                return;
            }
        }

        console.log(emails)
        
        for (const i of recipientIds) {
            let request = {
                type:"request",
                title: title,
                dates: date,
                recipientId: i, 
                startTimes: startTime,
                endTimes: endTime,
                message: message,  
            };
            console.log(request);
    
            const url = format_url({ endpoint: "/api/request" });
            const resp = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(request),
            });
    
            console.log(resp);
    
            if (resp.ok) {
                const data = await resp.json();
                alert(`Request ${data.data.request_id} Successfully Created!`);
              } else {
                alert(resp);
              }
        }
  };

    return (
        <form onSubmit={handleSubmit}>
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
