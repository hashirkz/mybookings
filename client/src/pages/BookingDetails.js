import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format_url } from "../conf.js";
import "./BookingDetails.css";
function BookingDetails() {
  const [booking, setBooking] = useState({});
  const [invited, setInvited] = useState([]);
  const [owner, setOwner] = useState("");

  const { booking_id } = useParams();

  const fmtDate = (d) => {
    let date = new Date(d);
    let date_str = date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    let fmtd_date = date_str.replace(", ", " ");
    return fmtd_date;
  };

  const fetchBooking = async (booking_id) => {
    const url = format_url({ endpoint: "/api/booking" }) + `/${booking_id}`;
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
    const url = format_url({ endpoint: "/api/users" }) + `/${user_id}`;
    const resp = await fetch(url, {
      method: "GET",
    });

    if (resp.ok) {
      const data = await resp.json();
      return data.data.user;
    }
    return "unknown";
  };

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
    };
    fetchMountData();
  }, []);

  return (
    <>
      <div className="booking-container">
        <div className="booking-info">
          <h1>details</h1>
          <p>
            {booking.name} with {owner}
          </p>
          <p>{fmtDate(booking.start)}</p>
          <p>{fmtDate(booking.end)}</p>
          <div className="attachments-list">
            {booking.attachments && booking.attachments.length > 0 ? (
              booking.attachments.map((link, index) => (
                <li key={index} className="attachment">
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {link.split("/").pop()}
                  </a>
                </li>
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
