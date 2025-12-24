import React from "react";
import { theme } from "../data/constants";
export default function ChartCard({ title, children, darkMode }) {
  return (
    <div style={{
      background: darkMode ? "#2c2c2c" : "white",
      padding: 20,
      borderRadius: 12,
      boxShadow: theme.shadow
    }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {children}
    </div>
  );
}
