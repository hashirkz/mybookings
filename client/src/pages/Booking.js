import { React, useState, useEffect } from "react";
import NavBar from "../components/NavBar/NavBar";
import BookingCalendar from "../components/BookingCalendar/BookingCalendar";
import TimeDropdown from "../components/TimeDropdown/TimeDropdown.js";
import AddList from "../components/AddList/AddList.js";
import { format_url, format_date } from "../conf.js";

function Booking() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookingName, setBookingName] = useState("");
  const [startHour, setStartHour] = useState(1);
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

  const handleCreateBooking = () => {};

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
          length1={12}
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
      </form>
    </>
  );
}

export default Booking;
