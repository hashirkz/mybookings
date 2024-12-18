import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format_url, format_date } from "../../conf.js";
import "./BookingDetails.css";
import ItemOnetime from "../../components/BookingItems/ItemOnetime.js";
import ItemPoll from "../../components/BookingItems/ItemPoll.js";
import ItemRecurring from "../../components/BookingItems/ItemRecurring.js";


function BookingDetails() {
  const [booking, setBooking] = useState({});
  const [invited, setInvited] = useState([]);
  const [owner, setOwner] = useState("");

  const { booking_id } = useParams();

  const fetchBooking = async (booking_id) => {
    const url = format_url({ endpoint: `/api/booking/${booking_id}` });
    const resp = await fetch(url, {
      method: "GET",
    });

    if (resp.ok) {
      const data = await resp.json();
      return data.data;
    }
    return null;
  };

  const fetchUser = async (user_id) => {
    const url = format_url({ endpoint: `/api/users/${user_id}` });
    const resp = await fetch(url, {
      method: "GET",
    });

    if (resp.ok) {
      const data = await resp.json();
      return data.data.user;
    }
    return "unknown";
  };

  const copyLink = (link) => {
    navigator.clipboard.writeText(link)
    .then(() => {
      console.log(link);
      })
    .catch((error) => {
        console.error("Failed to copy: ", error);
      });
  }

  // fetch bookings and invited users on mount
  useEffect(() => {
    const fetchMountData = async () => {
      const bookingData = await fetchBooking(booking_id);
      if (bookingData) {
        setBooking(bookingData);

        const ownerData = await fetchUser(bookingData.user_id);
        setOwner(ownerData);

        const invitedData = await Promise.all(
          bookingData.invited.map((user_id) => fetchUser(user_id))
        );
        setInvited(invitedData);
      }
      console.log(booking);
      console.log(owner);
    };
    fetchMountData();
  }, [booking_id]);

  if (!booking) {
    return <p>loading</p>;
  }
  return (
    <>
    <a href="/home" className="logo">
        <img src="/logo-background.png" className="navbar-logo" alt="Logo"></img>
          myBookings
      </a>
    
    <div className="copy">
      <p>Booking ID: {booking_id}</p>
      <button onClick={() => copyLink(booking_id)} >Copy Booking ID</button>
      <button onClick={() => copyLink(window.location.href)}>Copy URL</button>
    </div>

    <div className="booking-container">
      {booking.type === "poll" && <ItemPoll booking={booking} owner={owner} />}
      {booking.type === "onetime" && <ItemOnetime booking={booking } owner={owner}/>}
      {booking.type === "recurring" && <ItemRecurring booking={booking} owner={owner}/>}
    </div>

      <div className="booking-container">
        <div className="booking-info">
          <h1>Details</h1>
          <p>
            {booking.dates} with {owner}
          </p>
          <p>
            {format_date({ d: booking.start })} {booking.startTime} to{" "}
            {format_date({ d: booking.end })}
          </p>

          <div className="attachments-list">
            {booking.attachments && booking.attachments.length > 0 ? (
              booking.attachments.map((link, index) => (
                <a
                  href={link}
                  className="attachment"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.split("/").pop()}
                </a>
              ))
            ) : (
              <p>no attachments</p>
            )}
          </div>
        </div>
        <div className="booking-info">
          <h1>invited</h1>
          {invited.length > 0
            ? invited.map((user) => {
                return <p>{user}</p>;
              })
            : "no invitees"}
        </div>
      </div>
    </>
  );
}

export default BookingDetails;
