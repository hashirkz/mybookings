import { React, useState, useEffect } from "react";
import NavBar from "../../components/NavBar/NavBar.js";
import BookingCalendar from "../../components/BookingCalendar/BookingCalendar.js";
import TimeDropdown from "../../components/TimeDropdown/TimeDropdown.js";
import AddList from "../../components/AddList/AddList.js";
import { format_url, format_date } from "../../conf.js";

function Booking() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookingName, setBookingName] = useState("");
  const [startHour, setStartHour] = useState(0);
  const [startMin, setStartMin] = useState(0);
  const [duration, setDuration] = useState({ hr: 0, min: 0 });
  const [attachments, setAttachments] = useState([]);
  const [newAttachment, setNewAttachment] = useState("");
  const [invited, setInvited] = useState([]);
  const [newInvited, setNewInvited] = useState("");

  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const handleSelectedDate = (day) => {
    const newSelectedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setSelectedDate(newSelectedDate);
  };

  const handleAddInvited = () => {
    if (newInvited.trim()) {
      setInvited([...invited, newInvited]);
      setNewInvited("");
    }
  };

  const handleAddAttachment = () => {
    if (newAttachment.trim()) {
      setAttachments([...attachments, newAttachment]);
      setNewAttachment("");
    }
  };

  const handleRemoveInvited = (index) => {
    const updated = invited.filter((_, i) => i !== index);
    setInvited(updated);
  };

  const handleRemoveAttachment = (index) => {
    const updated = attachments.filter((_, i) => i !== index);
    setAttachments(updated);
  };

  const fetchInvited = async (invited) => {
    let url = "";
    let resp = null;
    let data = null;

    const invitedUsers = await Promise.all(
      invited.map(async (user) => {
        url = format_url({ endpoint: "/api/users", q: { user: user } });
        resp = await fetch(url, {
          method: "GET",
        });

        if (resp.ok) {
          data = await resp.json();
          if (!data.data) {
            alert(`user ${user} does not exist`);
            return;
          }
          return data.data.user_id;
        }
      })
    );

    return invitedUsers.filter((user_id) => user_id !== null);
  };

  const calcStartEndTimes = (
    currentDate,
    startHour,
    startMin,
    durationHr,
    durationMin
  ) => {
    startHour = parseInt(startHour);
    startMin = parseInt(startMin);
    durationHr = parseInt(durationHr);
    durationMin = parseInt(durationMin);

    const startDatetime = new Date(currentDate);
    startDatetime.setHours(startHour, startMin, 0, 0);

    const endDatetime = new Date(startDatetime);
    endDatetime.setHours(startDatetime.getHours() + durationHr);
    endDatetime.setMinutes(startDatetime.getMinutes() + durationMin);

    const overflowMinutes = Math.floor(endDatetime.getMinutes() / 60);
    endDatetime.setHours(endDatetime.getHours() + overflowMinutes);
    endDatetime.setMinutes(endDatetime.getMinutes() % 60);

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hour = String(date.getHours()).padStart(2, "0");
      const minute = String(date.getMinutes()).padStart(2, "0");

      return `${year}-${month}-${day} ${hour}:${minute}`;
    };

    return {
      start: formatDate(startDatetime),
      end: formatDate(endDatetime),
    };
  };

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    if (!bookingName.trim() || !invited) {
      alert("you must include a booking name and and invite at least 1 user");
      return;
    }
    const invitedUsers = await fetchInvited(invited);
    const { start, end } = calcStartEndTimes(
      currentDate,
      startHour,
      startMin,
      duration.hr,
      duration.min
    );

    const token = localStorage.getItem("token");
    let booking = {
      name: bookingName,
      invited: invitedUsers,
      start: start,
      end: end,
      attachments: attachments,
    };
    console.log(booking);

    const url = format_url({ endpoint: "/api/booking" });
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });

    if (resp.ok) {
      const data = await resp.json();
      return data.data?.booking_id;
    }
  };

  return (
    <>
      <NavBar />
      <BookingCalendar
        currentDate={currentDate}
        selectedDate={selectedDate}
        changeMonth={changeMonth}
        handleSelectedDate={handleSelectedDate}
      />
      <form onSubmit={handleCreateBooking}>
        <input
          name="name"
          type="text"
          placeholder="booking name: "
          value={bookingName}
          onChange={(e) => setBookingName(e.target.value)}
        />
        <TimeDropdown
          length1={24}
          length2={60}
          selected1={startHour}
          selected2={startMin}
          handleChange1={(e) => setStartHour(e.target.value)}
          handleChange2={(e) => setStartMin(e.target.value)}
        />
        <TimeDropdown
          length1={100}
          length2={60}
          selected1={duration.hr}
          selected2={duration.min}
          handleChange1={(e) =>
            setDuration({ hr: e.target.value, min: duration.min })
          }
          handleChange2={(e) =>
            setDuration({ hr: duration.hr, min: e.target.value })
          }
        />

        <AddList
          name="invited"
          list={invited}
          newItem={newInvited}
          setNewItem={setNewInvited}
          handleRemove={(index) => handleRemoveInvited(index)}
          handleAdd={handleAddInvited}
        />

        <AddList
          name="attachments"
          list={attachments}
          newItem={newAttachment}
          setNewItem={setNewAttachment}
          handleRemove={(index) => handleRemoveAttachment(index)}
          handleAdd={handleAddAttachment}
        />
        <button type="submit"> create new booking </button>
      </form>
    </>
  );
}

export default Booking;
