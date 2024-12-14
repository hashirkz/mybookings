import React, { useState } from "react";
import { format_url } from "../../conf.js";
import css from "./Login.module.css";

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
      console.log("Registration successful:", data);
      alert("Registration successful! Please log in.");
    } else {
      const errorData = await resp.json();
      console.error("Registration error:", errorData);
      alert(`Error: ${errorData.error || "Something went wrong"}`);
    }
  };

  return (
    <div className={css.loginContainer}>
      <form className={css.loginForm} onSubmit={handleSignup}>
        <input
          name="user"
          type="text"
          placeholder="Email"
          className={css.inputText}
          onChange={handleChange}
          required
        />
        <input
          name="pass"
          type="password"
          placeholder="Password"
          className={css.inputText}
          onChange={handleChange}
          required
        />
        <button type="submit" className={css.inputText}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
