/* ===================== KANBAN VIEW ===================== */
export default function KanbanView({ students, onEdit, darkMode }) {
  const columns = {
    "Registered": students.filter(s => s.placementStatus === "Registered"),
    "In Progress": students.filter(s => s.placementStatus === "In Progress"),
    "Placed": students.filter(s => s.placed),
  };

  return (
    <div style={{ padding: "0 32px 32px", display: "flex", gap: 20, overflowX: "auto" }}>
      {Object.entries(columns).map(([status, studentList]) => (
        <div
          key={status}
          style={{
            minWidth: 320,
            flex: 1,
            background: darkMode ? "#2c2c2c" : theme.beigeDark,
            borderRadius: 12,
            padding: 16
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            {status}
            <span style={{
              background: darkMode ? "#444" : theme.beigeLight,
              padding: "2px 8px",
              borderRadius: 12,
              fontSize: 12,
              fontWeight: "600"
            }}>
              {studentList.length}
            </span>
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {studentList.map(s => (
              <div
                key={s.id}
                style={{
                  background: darkMode ? "#3c3c3c" : "white",
                  borderRadius: 8,
                  padding: 16,
                  boxShadow: theme.shadow,
                  cursor: "pointer",
                  transition: "transform 0.2s"
                }}
                onClick={() => onEdit(s)}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <h4 style={{ margin: "0 0 8px 0", fontSize: 16 }}>{s.name}</h4>
                <p style={{ margin: "0 0 8px 0", fontSize: 12, opacity: 0.7 }}>{s.branch} • CGPA: {s.cgpa}</p>
                {s.company && <p style={{ margin: "0 0 4px 0", fontSize: 13 }}>🏢 {s.company}</p>}
                {s.salary > 0 && <p style={{ margin: 0, fontSize: 13, color: theme.success }}>💰 ₹{s.salary}L</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
