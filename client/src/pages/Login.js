import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format_url } from "../conf.js";
import "./Login.css";

function Login() {
  const [user, setUser] = useState({ user: "", pass: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleAuth = async (endpoint) => {
    const resp = await fetch(format_url({ endpoint: endpoint }), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (resp.ok) {
      const data = await resp.json();
      localStorage.setItem("token", data.token);
      navigate("/home");
    } else {
      const data = await resp.json();
      alert(`${data.status}: ${data.msg}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    handleAuth("/api/auth/login");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    handleAuth("/api/auth/signup");
  };

  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <input
            name="user"
            type="text"
            placeholder="Email"
            className="input-text"
            onChange={handleChange}
          />
          <input
            name="pass"
            type="password"
            placeholder="Password"
            className="input-text"
            onChange={handleChange}
          />
          <button type="submit" className="input-button">
            Log In
          </button>
        </form>
        <div className="signup-container">
          <p>dont have an account?</p>
          <button className="input-button" onClick={handleSignup}>
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;