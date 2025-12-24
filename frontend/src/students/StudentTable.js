import React from "react";
import { theme } from "../data/constants";

import {
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle,
  Mail,
  Phone
} from "lucide-react";


export default function StudentTable({ 
  students, onEdit, onDelete, onView, sortConfig, setSortConfig,
  compareMode, selectedForCompare, setSelectedForCompare, selectedRows, setSelectedRows, darkMode
}) {
  const handleSort = (key) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc"
    });
  };

  const toggleRowSelection = (id) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const toggleCompareSelection = (id) => {
    setSelectedForCompare(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : 
      prev.length < 5 ? [...prev, id] : prev
    );
  };

  const tableHeaderStyle = {
    padding: "12px 16px",
    textAlign: "left",
    background: darkMode ? "#3c3c3c" : theme.maroonDark,
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    userSelect: "none"
  };

  const tableCellStyle = (placed) => ({
    padding: "12px 16px",
    borderBottom: `1px solid ${theme.border}`,
    background: placed ? "#e8f5e9" : "#ffebee"
  });

  return (
    <div style={{ padding: "0 32px 32px", overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", background: darkMode ? "#2c2c2c" : "white", borderRadius: 12, overflow: "hidden", boxShadow: theme.shadow }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>
              <input 
                type="checkbox" 
                checked={selectedRows.length === students.length}
                onChange={e => setSelectedRows(e.target.checked ? students.map(s => s.id) : [])}
              />
            </th>
            <th style={tableHeaderStyle} onClick={() => handleSort("name")}>
              Name {sortConfig.key === "name" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th style={tableHeaderStyle} onClick={() => handleSort("branch")}>Branch</th>
            <th style={tableHeaderStyle} onClick={() => handleSort("cgpa")}>
              CGPA {sortConfig.key === "cgpa" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th style={tableHeaderStyle}>Status</th>
            <th style={tableHeaderStyle} onClick={() => handleSort("company")}>Company</th>
            <th style={tableHeaderStyle} onClick={() => handleSort("salary")}>
              Salary {sortConfig.key === "salary" && (sortConfig.direction === "asc" ? "↑" : "↓")}
            </th>
            <th style={tableHeaderStyle} onClick={() => handleSort("offers")}>Offers</th>
            <th style={tableHeaderStyle}>Contact</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.id} style={{ transition: "background 0.2s" }}>
              <td style={tableCellStyle(s.placed)}>
                <input 
                  type="checkbox"
                  checked={selectedRows.includes(s.id)}
                  onChange={() => toggleRowSelection(s.id)}
                />
                {compareMode && (
                  <input 
                    type="checkbox"
                    checked={selectedForCompare.includes(s.id)}
                    onChange={() => toggleCompareSelection(s.id)}
                    style={{ marginLeft: 8 }}
                  />
                )}
              </td>
              <td style={tableCellStyle(s.placed)}>
                <strong>{s.name}</strong>
                <br />
                <small style={{ opacity: 0.7 }}>{s.email}</small>
              </td>
              <td style={tableCellStyle(s.placed)}>{s.branch}</td>
              <td style={tableCellStyle(s.placed)}>
                <span style={{ 
                  background: s.cgpa >= 9 ? theme.success : s.cgpa >= 8 ? theme.info : theme.warning,
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: 4,
                  fontSize: 12,
                  fontWeight: "600"
                }}>
                  {s.cgpa}
                </span>
              </td>
              <td style={tableCellStyle(s.placed)}>
                {s.placed ? (
                  <span style={{ color: theme.success, display: "flex", alignItems: "center", gap: 4 }}>
                    <CheckCircle size={16} /> Placed
                  </span>
                ) : (
                  <span style={{ color: theme.danger, display: "flex", alignItems: "center", gap: 4 }}>
                    <XCircle size={16} /> {s.placementStatus}
                  </span>
                )}
              </td>
              <td style={tableCellStyle(s.placed)}>{s.company || "-"}</td>
              <td style={tableCellStyle(s.placed)}>
                {s.salary > 0 ? `₹${s.salary}L` : "-"}
              </td>
              <td style={tableCellStyle(s.placed)}>
                <span style={{
                  background: s.offers > 1 ? theme.success : s.offers === 1 ? theme.info : theme.textLight,
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: 4,
                  fontSize: 12
                }}>
                  {s.offers}
                </span>
              </td>
              <td style={tableCellStyle(s.placed)}>
                <div style={{ display: "flex", gap: 8 }}>
                  <Mail size={14} title={s.email} style={{ cursor: "pointer", opacity: 0.7 }} />
                  <Phone size={14} title={s.phone} style={{ cursor: "pointer", opacity: 0.7 }} />
                </div>
              </td>
              <td style={tableCellStyle(s.placed)}>
                <div style={{ display: "flex", gap: 8 }}>
                  <Eye size={16} style={{ cursor: "pointer", color: theme.info }} onClick={() => onView(s)} title="View Details" />
                  <Edit size={16} style={{ cursor: "pointer", color: theme.warning }} onClick={() => onEdit(s)} title="Edit" />
                  <Trash2 size={16} style={{ cursor: "pointer", color: theme.danger }} onClick={() => onDelete(s.id)} title="Delete" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
