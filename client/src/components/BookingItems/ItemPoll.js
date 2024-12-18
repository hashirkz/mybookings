import { React, useState } from "react";
const ItemPoll = (booking) => {
    console.log(booking)
    const [selectedOption, setSelectedOption] = useState("");


    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
    return (
        <div>
            <p>Message: {booking.booking.message}</p>

            <p>Please choose one:</p>

            {booking.booking.dates.map((date, index) => {
                const startTime = booking.booking.startTimes[index];
                const endTime = booking.booking.endTimes[index];
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