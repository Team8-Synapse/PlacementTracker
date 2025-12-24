import React, { useState } from "react";

// Icons
import { Download, Printer } from "lucide-react";

// Theme
import { theme } from "../data/constants";

const selectStyle = (darkMode) => ({
  padding: "8px 10px",
  borderRadius: 6,
  border: `1px solid ${theme.border}`,
  background: darkMode ? "#2c2c2c" : "white",
  color: darkMode ? "white" : theme.text
});

const inputStyle = (darkMode) => ({
  padding: "8px 10px",
  borderRadius: 6,
  border: `1px solid ${theme.border}`,
  background: darkMode ? "#2c2c2c" : "white",
  color: darkMode ? "white" : theme.text
});

const buttonStyle = (bg, color = "white") => ({
  background: bg,
  color,
  border: "none",
  padding: "8px 14px",
  borderRadius: 6,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: 13
});


export default function ReportsSection({ students, stats, onExport, darkMode }) {
  const [reportType, setReportType] = useState("placement");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const generateReport = () => {
    let reportData = students;

    if (dateRange.start && dateRange.end) {
      reportData = students.filter(s => {
        const offerDate = new Date(s.offerLetterDate);
        const start = new Date(dateRange.start);
        const end = new Date(dateRange.end);
        return offerDate >= start && offerDate <= end;
      });
    }

    const report = {
      type: reportType,
      generatedAt: new Date().toISOString(),
      dateRange,
      stats,
      data: reportData
    };

    onExport(JSON.stringify(report, null, 2), `report-${reportType}-${Date.now()}.json`);
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Reports & Exports</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div style={{ background: darkMode ? "#2c2c2c" : "white", padding: 20, borderRadius: 12, boxShadow: theme.shadow }}>
          <h3>Report Configuration</h3>
          
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 8 }}>Report Type</label>
            <select value={reportType} onChange={e => setReportType(e.target.value)} style={selectStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}>
              <option value="placement">Placement Report</option>
              <option value="academic">Academic Performance</option>
              <option value="company">Company-wise Report</option>
              <option value="branch">Branch-wise Report</option>
            </select>
          </div>
          
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", marginBottom: 8 }}>Date Range (Optional)</label>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="date"
                value={dateRange.start}
                onChange={e => setDateRange({ ...dateRange, start: e.target.value })}
                style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={e => setDateRange({ ...dateRange, end: e.target.value })}
                style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
              />
            </div>
          </div>
          
          <button onClick={generateReport} style={buttonStyle(theme.success, "white")}>
            <Download size={16} /> Generate Report
          </button>
        </div>
        
        <div style={{ background: darkMode ? "#2c2c2c" : "white", padding: 20, borderRadius: 12, boxShadow: theme.shadow }}>
          <h3>Quick Stats Summary</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <strong>Total Students:</strong> {stats.total}
            </div>
            <div>
              <strong>Placed:</strong> {stats.placed} ({stats.placementRate}%)
            </div>
            <div>
              <strong>Avg CGPA:</strong> {stats.avgCGPA}
            </div>
            <div>
              <strong>Avg Package:</strong> ₹{stats.avgSalary}L
            </div>
            <div>
              <strong>Highest Package:</strong> ₹{stats.highestSalary}L
            </div>
            <div>
              <strong>Total Offers:</strong> {stats.totalOffers}
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: 32 }}>
        <h3>Export Options</h3>
        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => onExport("csv")} style={buttonStyle(theme.info, "white")}>
            <Download size={16} /> Export as CSV
          </button>
          <button onClick={() => onExport("json")} style={buttonStyle(theme.warning, "white")}>
            <Download size={16} /> Export as JSON
          </button>
          <button onClick={() => onExport("pdf")} style={buttonStyle(theme.danger, "white")}>
            <Printer size={16} /> Export as PDF
          </button>
        </div>
      </div>
    </div>
  );
}
