import React, { useState } from "react";
import { signupUser, loginUser } from "../services/firebase";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    await signupUser(email, password);
    alert("User created. Now login.");
  };

  const login = async () => {
    await loginUser(email, password);

    // IMPORTANT — store ONLY email
    localStorage.setItem("user", email);

    // remove old junk if exists
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (
    <div style={{ marginTop: 150, textAlign: "center" }}>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button onClick={signup}>Signup</button>
      <button onClick={login}>Login</button>
    </div>
  );
}
