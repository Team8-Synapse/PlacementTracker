import React from "react";
import { theme } from "../theme/theme";
import { BarChart3, Users, TrendingUp, FileText, Activity } from "lucide-react";

export default function TabNavigation({ activeTab, setActiveTab, darkMode }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: <BarChart3 size={16} /> },
    { id: "students", label: "Students", icon: <Users size={16} /> },
    { id: "analytics", label: "Analytics", icon: <TrendingUp size={16} /> },
    { id: "reports", label: "Reports", icon: <FileText size={16} /> },
    { id: "comparison", label: "Compare", icon: <Activity size={16} /> },
  ];

  return (
    <nav style={{
      background: darkMode ? "#2c2c2c" : theme.maroonDark,
      padding: "0 32px",
      display: "flex",
      gap: 8,
      borderBottom: `2px solid ${darkMode ? "#444" : theme.maroon}`
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={{
            background: activeTab === tab.id ? (darkMode ? "#444" : theme.maroon) : "transparent",
            color: "white",
            border: "none",
            padding: "12px 24px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 14,
            fontWeight: activeTab === tab.id ? "600" : "400",
            borderRadius: "8px 8px 0 0",
            transition: "all 0.2s"
          }}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </nav>
  );
}