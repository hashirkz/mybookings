import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import RequestForm from "../../components/RequestForm/RequestForm";
import "./Request.css";

function Request() {
  return (
    <>
    <div className="container">
      <NavBar></NavBar>
      <div>
        <h1>Send a Request</h1>
        <RequestForm></RequestForm>
      </div>
    </div>

    </>
  );
}
  
  export default Request;
  