import React, { useState } from "react";
import { format_url } from "../../conf.js";
import "./Login.css";

function Signup() {
  const [user, setUser] = useState({ user: "", pass: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const resp = await fetch(format_url({ endpoint: "/api/auth/signup" }), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (resp.ok) {
      const data = await resp.json();
      alert(`${data.status}: ${data.msg}`);
    } else {
      const data = await resp.json();
      alert(`${data.status}: ${data.msg}`);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSignup}>
        <input
          name="user"
          type="text"
          placeholder="Email"
          className="input-text"
          onChange={handleChange}
          required
        />
        <input
          name="pass"
          type="password"
          placeholder="Password"
          className="input-text"
          onChange={handleChange}
          required
        />
        <button type="submit" className="input-text">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
