/* ===================== STUDENT GRID VIEW ===================== */
export default function StudentGrid({ students, onEdit, onDelete, onView, darkMode }) {
  return (
    <div style={{
      padding: "0 32px 32px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: 20
    }}>
      {students.map(s => (
        <div
          key={s.id}
          style={{
            background: darkMode ? "#2c2c2c" : "white",
            borderRadius: 12,
            padding: 20,
            boxShadow: theme.shadow,
            transition: "all 0.2s",
            cursor: "pointer",
            border: `3px solid ${s.placed ? theme.success : theme.danger}`
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = theme.shadowHover}
          onMouseLeave={e => e.currentTarget.style.boxShadow = theme.shadow}
          onClick={() => onView(s)}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, alignItems: "start" }}>
            <div>
              <h3 style={{ margin: "0 0 4px 0" }}>{s.name}</h3>
              <p style={{ margin: 0, fontSize: 12, opacity: 0.7 }}>{s.branch} • {s.year}</p>
            </div>
            <span style={{
              background: s.placed ? theme.success : theme.danger,
              color: "white",
              padding: "4px 8px",
              borderRadius: 6,
              fontSize: 11,
              fontWeight: "600"
            }}>
              {s.placed ? "PLACED" : "AVAILABLE"}
            </span>
          </div>
          
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 14, opacity: 0.8 }}>CGPA</span>
              <strong>{s.cgpa}</strong>
            </div>
            {s.company && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 14, opacity: 0.8 }}>Company</span>
                <strong>{s.company}</strong>
              </div>
            )}
            {s.salary > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 14, opacity: 0.8 }}>Package</span>
                <strong style={{ color: theme.success }}>₹{s.salary}L</strong>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 14, opacity: 0.8 }}>Offers</span>
              <strong>{s.offers}</strong>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: 12, paddingTop: 12, borderTop: `1px solid ${theme.border}` }}>
            <button onClick={(e) => { e.stopPropagation(); onView(s); }} style={{ ...buttonStyle(theme.info, "white"), flex: 1, fontSize: 12 }}>
              <Eye size={14} /> View
            </button>
            <button onClick={(e) => { e.stopPropagation(); onEdit(s); }} style={{ ...buttonStyle(theme.warning, "white"), flex: 1, fontSize: 12 }}>
              <Edit size={14} /> Edit
            </button>
            <button onClick={(e) => { e.stopPropagation(); onDelete(s.id); }} style={{ ...buttonStyle(theme.danger, "white"), padding: "8px 12px", fontSize: 12 }}>
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
