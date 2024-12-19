import { React, useState } from "react";
const ItemPoll = ({booking, handleVoteChange }) => {
    const [selectedOption, setSelectedOption] = useState("");


    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        if (handleVoteChange) {
            handleVoteChange(e.target.value); 
        }
    };

    return (
        <div>
            <p>Message: {booking.message}</p>

            <p>Please choose one:</p>

            {booking.dates.map((date, index) => {
                const startTime = booking.startTimes[index];
                const endTime = booking.endTimes[index];
                const option = `${date} from ${startTime} to ${endTime}`;

                return (
                    <div key={index} className="poll">
                        <label>
                            <input
                                type="radio"
                                name="poll"
                                value={option}
                                checked={selectedOption === option}
                                onChange={handleOptionChange}
                            />
                            {date} from {startTime} to {endTime}
                        </label>
                    </div>
                );
            })}
        </div>
    );
};
export default ItemPoll;