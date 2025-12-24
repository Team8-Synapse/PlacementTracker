import React from "react";
import { theme } from "../data/constants";

export default function StatCard({ title, value, icon, color, darkMode }) {
  return (
    <div style={{
      background: darkMode ? "#2c2c2c" : theme.beigeDark,
      padding: 20,
      borderRadius: 12,
      boxShadow: theme.shadow,
      display: "flex",
      alignItems: "center",
      gap: 16,
      transition: "transform 0.2s",
      cursor: "pointer"
    }}
    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      <div style={{ 
        background: color, 
        color: "white", 
        padding: 12, 
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {icon}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 12, opacity: 0.8 }}>{title}</p>
        <h2 style={{ margin: "4px 0 0 0", fontSize: 24 }}>{value}</h2>
      </div>
    </div>
  );
}
