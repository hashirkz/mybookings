import React,  { useState }from "react";
import NavBar from "../../components/NavBar/NavBar";
import BookingPoll from "../../components/BookingPoll/BookingPoll";
import BookingOnetime from "../../components/BookingOnetime/BookingOnetime";
import RequestForm from "../../components/RequestForm/RequestForm";
import BookingRecurring from "../../components/BookingRecurring/BookingReoccur";
import "./Request.css";


function Request() {
  const [activeTab, setActiveTab] = useState("recurring");

  return (
    <>
    <NavBar></NavBar>
    <div className="booking">
    <h1>Book a Meeting</h1>
    <div className="tabs">
      <button onClick={() => setActiveTab("recurring")} className={`tab ${activeTab === "recurring" ? "active" : ""}`}>
        Recurring Meeting
      </button>
      <button onClick={() => setActiveTab("onetime")} className={`tab ${activeTab === "onetime" ? "active" : ""}`}>
        One-Time Meeting
      </button>
      <button onClick={() => setActiveTab("poll")} className={`tab ${activeTab === "poll" ? "active" : ""}`}>
        Meeting Poll
      </button>
      <button onClick={() => setActiveTab("request")} className={`tab ${activeTab === "request" ? "active" : ""}`}>
      Request
      </button>
    </div>

    <div>
      {activeTab === "recurring" && <BookingRecurring />}
      {activeTab === "onetime" && <BookingOnetime />}
      {activeTab === "poll" && <BookingPoll />}
      {activeTab === "request" && <RequestForm />}

    </div>
  </div>
    </>
  );
}
  
  export default Request;
  