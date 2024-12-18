import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUpFormPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: username, pass: password }),
            });
            if (response.ok) {
                navigate("/login");
            } else {
                const data = await response.json();
                alert(`${data.status}: ${data.msg}`);
            }
    
        } 
        catch (error) {
            console.error("Signup error:", error);
        }
    };
    const handleSignupForm = async (e) => {
        e.preventDefault();
        // handleAuth("/api/auth/signup");
        navigate("/login");
      };

    return (
        <div>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={handleSignupForm}>Sign Up</button>
          </form>
        </div>
      );
}

export default SignUpFormPage;