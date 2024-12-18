import React,  { useState }from "react";
import NavBar from "../../components/NavBar/NavBar";
import RequestForm from "../../components/RequestForm/RequestForm";
import "./Request.css";
import Dropdown from "../../components/NavBar/Dropdown.js";


function Request() {
  return (
    <>
    <div className="container">
      <NavBar></NavBar>
      <div>
        <h1>Send a Request</h1>
        <RequestForm></RequestForm>
      </div>
      <Dropdown></Dropdown>
    </div>

    </>
  );
}
  
  export default Request;
  