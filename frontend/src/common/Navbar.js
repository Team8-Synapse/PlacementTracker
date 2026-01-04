import React from "react";
import { Bell, Settings } from "lucide-react";
import { theme } from "../theme/theme";


export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <header style={{ 
      background: darkMode?  theme.beigeDark : theme.maroon, 
      color: "white", 
      padding: "16px 32px",
      boxShadow: theme.shadow,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "box-shadow 0.3s ease",

    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <h1 style={{ margin: 0, fontSize: 28 }}>
        AMRITA Placement Tracker
      </h1>

      <span style={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: "#22c55e",
        boxShadow: "0 0 6px #22c55e"
      }} />
    </div>

        <p style={{ margin: "4px 0 0 0", fontSize: 14, opacity: 0.9 }}>
          Advanced Placement Management System · Academic Year 2024-25
        </p>
      </div>

      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <div style={{ position: "relative" }}>
        <Bell size={20} style={{ cursor: "pointer" }} />
        <span style={{
          position: "absolute",
          top: -4,
          right: -4,
          background: "#ef4444",
          color: "white",
          borderRadius: "50%",
          fontSize: 10,
          width: 16,
          height: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600
        }}>
          3
        </span>
      </div>

        <Settings size={20} style={{ cursor: "pointer" }} />

        <button 
          onClick={() => setDarkMode(!darkMode)}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            color: "white",
            padding: "8px 16px",
            borderRadius: 6,
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}
