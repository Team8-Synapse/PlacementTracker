import React from "react";
import { theme } from "../theme/theme";


/* ===================== FOOTER ===================== */
export default function Footer({ darkMode }) {
  return (
    <footer style={{
      background: darkMode ? "#1a1a1a" : theme.maroonDark,
      color: "white",
      padding: "20px 32px",
      textAlign: "center",
      marginTop: "auto"
    }}>
      <p>&copy; 2024 AMRITA Placement Tracker All rights reserved.</p>
      <p>Developed for Amrita Vishwa Vidyapeetham - Academic Year 2024-25</p>
    </footer>
  );
}

/* ===================== UTILITY STYLES ===================== */
const buttonStyle = (bg, color) => ({
  background: bg,
  color,
  border: "none",
  padding: "10px 16px",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 14,
  fontWeight: "500",
  display: "flex",
  alignItems: "center",
  gap: 8,
  transition: "all 0.2s"
});

const inputStyle = (bg) => ({
  width: "100%",
  padding: "10px 12px",
  border: `1px solid ${theme.border}`,
  borderRadius: 6,
  fontSize: 14,
  background: bg
});

const selectStyle = (bg) => ({
  ...inputStyle(bg),
  cursor: "pointer"
});