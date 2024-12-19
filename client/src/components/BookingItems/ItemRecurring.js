import { React, useState} from "react";

const ItemRecurring = ({booking, handleVoteChange }) => {
    const days = booking.days.join(', ');
    const [selectedOption, setSelectedOption] = useState("");

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        if (handleVoteChange) {
            handleVoteChange(e.target.value); 
        }
    };

    console.log(booking.startTimes);

    return (
        <div>
            <p>Every {days} from {booking.startDate} to {booking.endDate}</p>
            <p>Message: {booking.message}</p>
            <p>Avaliable Time Slots:</p>

            {booking.startTimes.map((startTime, index) => {
                const endTime = booking.endTimes[index];
                const option = `${startTime} to ${endTime}`;

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
                            {startTime} to {endTime}
                        </label>
                    </div>
                );
            })}
        </div>
  );
};
export default ItemRecurring;