import { React} from "react";
const ItemRecurring = (booking) => {
    const days = booking.booking.days.join(', ');

    return (
        <div>
            <p>Every {days} from {booking.booking.startDate} to {booking.booking.endDate}</p>
            <p>From {booking.booking.startTimes} to {booking.booking.endTimes}</p>
            <p>Message: {booking.booking.message}</p>
        </div>
  );
};
export default ItemRecurring;