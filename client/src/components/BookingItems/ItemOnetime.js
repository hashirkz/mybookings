import { React} from "react";
const ItemOnetime = (booking ) => {
    console.log(booking)
    return (
        <div>
            <p>On {booking.booking.dates}</p>
            <p>From {booking.booking.startTimes} to {booking.booking.endTimes}</p>
            <p>Message: {booking.booking.message}</p>
        </div>
  );
};
export default ItemOnetime;