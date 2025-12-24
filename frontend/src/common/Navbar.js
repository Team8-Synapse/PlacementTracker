import React from "react";
import { Bell, Settings } from "lucide-react";
import { theme } from "../theme/theme";


export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <header style={{ 
      background: darkMode ? "#2c2c2c" : theme.maroon, 
      color: "white", 
      padding: "16px 32px",
      boxShadow: theme.shadow,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 28 }}>AMRITA Placement Tracker</h1>
        <p style={{ margin: "4px 0 0 0", fontSize: 14, opacity: 0.9 }}>
          Advanced Placement Management System · Academic Year 2024-25
        </p>
      </div>

      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Bell size={20} style={{ cursor: "pointer" }} />
        <Settings size={20} style={{ cursor: "pointer" }} />

        <button 
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            color: "white",
            padding: "8px 16px",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}
