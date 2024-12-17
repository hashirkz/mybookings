import React, { useState } from "react";
import { format_date } from "../../conf";

function BookingPoll() {
    const [title, setTitle] = useState("");
    const [options, setOptions] = useState([
        { date: "", startTime: "", endTime: "" },
    ]);

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

    const validateOptions = () => {
        for (const option of options) {
        if (!option.date || !option.startTime || !option.endTime) {
            alert("All fields (date, start time, end time) are required.");
            return false;
        }
        if (option.startTime >= option.endTime) {
            alert("End time must be after start time.");
            return false;
        }
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateOptions()) return;

        const formattedOptions = options.map(
        (option) => `${option.date} (${option.startTime} to ${option.endTime})`
        );
        alert(`Meeting Poll Created:\nTitle: ${title}\nOptions:\n${formattedOptions.join("\n")}`);
    };

    return (
        <form onSubmit={handleSubmit}>
        <h2>Meeting Poll</h2>

        <label>Poll Title:</label>
        <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
        />

        <label>Options for Voting:</label>
        {options.map((option, index) => (
            <div
            key={index}
            >
            <label>Date:</label>
            <input
                type="date"
                value={option.date}
                onChange={(e) => handleOptionChange(index, "date", e.target.value)}
                required
            />

            <label>Start Time:</label>
            <input
                type="time"
                value={option.startTime}
                onChange={(e) => handleOptionChange(index, "startTime", e.target.value)}
                required
            />

            <label>End Time:</label>
            <input
                type="time"
                value={option.endTime}
                onChange={(e) => handleOptionChange(index, "endTime", e.target.value)}
                required
            />

            <button
                type="button"
                onClick={() => deleteOption(index)}
            >
                Delete Option
            </button>
            </div>
        ))}

        <button type="button" onClick={addOption}>
            + Add Date Option
        </button>


        <button type="submit" >
            Create Poll
        </button>
        </form>
    );
}

export default BookingPoll;
