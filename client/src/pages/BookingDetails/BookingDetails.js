import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format_url, format_date } from "../../conf.js";
import ItemOnetime from "../../components/BookingItems/ItemOnetime.js";
import ItemPoll from "../../components/BookingItems/ItemPoll.js";
import ItemRecurring from "../../components/BookingItems/ItemRecurring.js";
import "./BookingDetails.css";

function BookingDetails() {
  const [booking, setBooking] = useState({});
  const [invited, setInvited] = useState([]);
  const [owner, setOwner] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [selectedVote, setSelectedVote] = useState("");
  const {booking_id } = useParams();

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

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(""); 
  };

  const handleVoteChange = (vote) => {
    setSelectedVote(vote);
    console.log(vote)
};

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!selectedVote) {
      alert("Please select an option before registering.");
      return;
    }

    const updatedBooking = {
      ...booking,
      invited: [...new Set([...(booking.invited || []), email])],
      votes: [...new Set([...(booking.votes || []), { email, vote: selectedVote }])],
    };

    const url = format_url({ endpoint: `/api/booking/${booking_id}` });
    const resp = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBooking),
    });

    if (resp.ok) {
      const data = await resp.json();
      // console.log(`DATA: ${data.title}`);
      setEmail("");
      setInvited((data.invited));
      setBooking((updatedBooking));
      setRegistrationStatus("You have successfully registered!");
      console.log({booking});

    } else {
      setRegistrationStatus("Registration failed. Please try again.");
    }
  };

  // fetch bookings and invited users on mount
  useEffect(() => {
    const fetchMountData = async () => {
      const bookingData = await fetchBooking(booking_id);
      if (bookingData) {
        setBooking(bookingData);

        const ownerData = await fetchUser(bookingData.user_id);
        setOwner(ownerData);

        setInvited(bookingData.invited);
      }
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
        <div className="booking-info">
          <h1>Details</h1>
          <p>
            {booking.title} with {owner}
          </p>

          <div className="details">
            {booking.type === "poll" ? (<ItemPoll booking={booking} handleVoteChange={handleVoteChange}/>) : (<></>)}
            {booking.type === "onetime" ? (<ItemOnetime booking={booking} handleVoteChange={handleVoteChange}/>) : (<></>)}
            {booking.type === "recurring" ? (<ItemRecurring booking={booking} handleVoteChange={handleVoteChange}/>) : (<></>)}

          </div>
          <div className="booking-info">
          <p>Register for this Booking</p>
          <form onSubmit={handleRegister}>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
            />
            <button type="submit">Register</button>
            {emailError && <p className="error">{emailError}</p>}
            {registrationStatus && <p>{registrationStatus}</p>}
          </form>
        </div>
        </div>
     {/*} <div className="booking-info">
          <h1>invited {}</h1>
          {invited.length > 0
            ? invited.map((user) => {
                return <p>{user}</p>;
              })
            : "no invitees"}
        </div>*/}
      </div>
    </>
  );
}

export default BookingDetails;
