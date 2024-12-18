import React from "react";

function AttachmentForm({ msg, setMsg  }) {

    return (
        <div className="forms">
            <label>Message:</label>
            <textarea 
                className="comments" 
                style={{width: "100%"}}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Optional Message"
            />
        </div>
    );
}

export default AttachmentForm;
