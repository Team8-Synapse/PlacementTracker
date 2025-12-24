import React from "react";
import { theme } from "../data/constants";export default function InfoCard({ title, children, darkMode }) {
  return (
    <div style={{
      background: darkMode ? "#2c2c2c" : theme.beigeDark,
      padding: 20,
      borderRadius: 12,
      boxShadow: theme.shadow
    }}>
      <h4 style={{ marginTop: 0, marginBottom: 12 }}>{title}</h4>
      {children}
    </div>
  );
}

