import { React, useState } from "react";
import { format_url } from "../../conf.js";
import "./Login.css";

function Login() {
  const [user, setUser] = useState({ user: "", pass: "" });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const resp = await fetch(format_url({ endpoint: "/api/auth/login" }), {
      method: "post",
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
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <input
            name="user"
            type="text"
            placeholder="username"
            className="input-text"
            onChange={handleChange}
          />
          <input
            name="pass"
            type="password"
            placeholder="password"
            className="input-text"
            onChange={handleChange}
          />
          <button type="submit"></button>
        </form>
      </div>
    </>
  );
}

export default Login;
