import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { User, Lock, LogIn } from "lucide-react";
import { theme } from "../data/constants";

export default function LoginPage() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    // TEMP LOGIN (mock auth)
    login({
      name: email.split("@")[0],
      email,
      role, // student | admin | cir
    });
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: theme.beige,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: 380,
          background: "white",
          padding: 32,
          borderRadius: 12,
          boxShadow: theme.shadow
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>
          Placement Tracker Login
        </h2>

        {error && (
          <div style={{
            color: "red",
            marginBottom: 12,
            fontSize: 14
          }}>
            {error}
          </div>
        )}

        {/* EMAIL */}
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <User size={18} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                marginLeft: 8,
                padding: 8
              }}
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div style={{ marginBottom: 16 }}>
          <label>Password</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Lock size={18} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                flex: 1,
                marginLeft: 8,
                padding: 8
              }}
            />
          </div>
        </div>

        {/* ROLE */}
        <div style={{ marginBottom: 24 }}>
          <label>Login as</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ width: "100%", padding: 8 }}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
            <option value="cir">Placement Officer (CIR)</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            background: theme.maroon,
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8
          }}
        >
          <LogIn size={18} />
          Login
        </button>
      </form>
    </div>
  );
}
