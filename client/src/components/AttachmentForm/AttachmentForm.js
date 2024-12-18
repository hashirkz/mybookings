import React, { useState } from "react";

function AttachmentForm({ onSubmitComment }) {
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            onSubmitComment(comment); 
            setComment(""); 
        }
    };

    return (
        <div className="forms">
            <label>Optional Comments:</label>
            <form onSubmit={handleSubmit}>
                <label >
                    <textarea 
                        className="comments" 
                        style={{width: "100%"}}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Enter your comments here..."
                    />
                </label>
            </form>
        </div>
    );
}

export default AttachmentForm;
