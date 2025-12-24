import React from "react";
import { theme } from "../data/constants";

export default function NotificationContainer({ notifications }) {
  return (
    <div style={{
      position: "fixed",
      top: 80,
      right: 20,
      zIndex: 1000,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }}>
      {notifications.map(notif => (
        <div
          key={notif.id}
          style={{
            background: notif.type === "success" ? theme.success :
                       notif.type === "danger" ? theme.danger :
                       notif.type === "warning" ? theme.warning : theme.info,
            color: "white",
            padding: "12px 20px",
            borderRadius: 8,
            boxShadow: theme.shadow,
            minWidth: 250,
            animation: "slideIn 0.3s ease"
          }}
        >
          {notif.message}
        </div>
      ))}
    </div>
  );
}