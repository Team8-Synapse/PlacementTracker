import React, { useState, useMemo } from "react";
import { 
  Download, 
  Printer, 
  FileText, 
  Calendar, 
  TrendingUp,
  BarChart3,
  FileSpreadsheet,
  FileJson,
  Filter,
  RefreshCw,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Theme Configuration
const theme = {
  maroon: "#8B0000",
  maroonLight: "#A52A2A",
  beige: "#F5F5DC",
  beigeLight: "#EFEFD0",
  beigeDark: "#E8E8D0",
  success: "#22c55e",
  successLight: "#4ade80",
  danger: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
  infoLight: "#60a5fa",
  text: "#1f2937",
  textLight: "#6b7280",
  border: "#e5e7eb",
  shadow: "0 2px 8px rgba(0,0,0,0.1)"
};

// Styled Components
const Card = ({ children, darkMode, style = {} }) => (
  <div style={{
    background: darkMode ? "#2c2c2c" : "white",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: theme.shadow,
    border: `1px solid ${darkMode ? "#3b3b3b" : theme.border}`,
    ...style
  }}>
    {children}
  </div>
);

const Label = ({ children, darkMode, required = false }) => (
  <label style={{
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
    fontWeight: "600",
    color: darkMode ? "#d1d5db" : theme.text
  }}>
    {children}
    {required && <span style={{ color: theme.danger, marginLeft: "4px" }}>*</span>}
  </label>
);

const Select = ({ value, onChange, options, darkMode, placeholder = "Select..." }) => (
  <select
    value={value}
    onChange={onChange}
    style={{
      width: "100%",
      padding: "10px 12px",
      borderRadius: "8px",
      border: `2px solid ${darkMode ? "#3b3b3b" : theme.border}`,
      background: darkMode ? "#1a1a1a" : "white",
      color: darkMode ? "white" : theme.text,
      fontSize: "14px",
      cursor: "pointer",
      transition: "all 0.2s",
      outline: "none"
    }}
    onFocus={(e) => e.target.style.borderColor = theme.maroon}
    onBlur={(e) => e.target.style.borderColor = darkMode ? "#3b3b3b" : theme.border}
  >
    <option value="">{placeholder}</option>
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
);

const Input = ({ type = "text", value, onChange, darkMode, placeholder = "" }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      width: "100%",
      padding: "10px 12px",
      borderRadius: "8px",
      border: `2px solid ${darkMode ? "#3b3b3b" : theme.border}`,
      background: darkMode ? "#1a1a1a" : "white",
      color: darkMode ? "white" : theme.text,
      fontSize: "14px",
      transition: "all 0.2s",
      outline: "none"
    }}
    onFocus={(e) => e.target.style.borderColor = theme.maroon}
    onBlur={(e) => e.target.style.borderColor = darkMode ? "#3b3b3b" : theme.border}
  />
);

const Button = ({ children, onClick, icon, color = theme.maroon, disabled = false, variant = "solid" }) => {
  const getStyles = () => {
    if (variant === "outline") {
      return {
        background: "transparent",
        color: color,
        border: `2px solid ${color}`,
        hover: { background: `${color}10` }
      };
    }
    return {
      background: disabled ? theme.textLight : color,
      color: "white",
      border: "none",
      hover: { background: disabled ? theme.textLight : color, transform: "translateY(-2px)", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }
    };
  };

  const styles = getStyles();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles,
        padding: "12px 20px",
        borderRadius: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        fontSize: "14px",
        fontWeight: "600",
        transition: "all 0.2s",
        opacity: disabled ? 0.6 : 1
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = styles.hover.transform || "none";
          e.currentTarget.style.boxShadow = styles.hover.boxShadow || "none";
          e.currentTarget.style.background = styles.hover.background;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.background = styles.background;
      }}
    >
      {icon}
      {children}
    </button>
  );
};

const StatBox = ({ label, value, icon, color, darkMode }) => (
  <div style={{
    background: `${color}10`,
    padding: "16px",
    borderRadius: "10px",
    border: `2px solid ${color}20`,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    transition: "all 0.2s"
  }}>
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <span style={{ color: color }}>{icon}</span>
      <span style={{ 
        fontSize: "12px", 
        color: darkMode ? "#9ca3af" : theme.textLight,
        fontWeight: "600"
      }}>
        {label}
      </span>
    </div>
    <div style={{ 
      fontSize: "24px", 
      fontWeight: "700",
      color: darkMode ? "white" : theme.text
    }}>
      {value}
    </div>
  </div>
);

const Notification = ({ type, message, onClose }) => {
  const config = {
    success: { color: theme.success, icon: <CheckCircle size={20} />, bg: "#22c55e10" },
    error: { color: theme.danger, icon: <AlertCircle size={20} />, bg: "#ef444410" },
    info: { color: theme.info, icon: <AlertCircle size={20} />, bg: "#3b82f610" }
  };

  const { color, icon, bg } = config[type] || config.info;

  return (
    <div style={{
      position: "fixed",
      top: "24px",
      right: "24px",
      background: bg,
      border: `2px solid ${color}`,
      borderRadius: "12px",
      padding: "16px 20px",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
      zIndex: 1000,
      minWidth: "300px",
      animation: "slideIn 0.3s ease-out"
    }}>
      <span style={{ color }}>{icon}</span>
      <span style={{ flex: 1, fontSize: "14px", fontWeight: "500", color: theme.text }}>
        {message}
      </span>
      <button
        onClick={onClose}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "18px",
          color: theme.textLight,
          padding: "0 4px"
        }}
      >
        ×
      </button>
    </div>
  );
};

export default function ReportsSection({ darkMode }) {
  // Mock data - replace with actual props
  const students = useMemo(() => Array.from({ length: 450 }, (_, i) => ({
    id: i + 1,
    name: `Student ${i + 1}`,
    branch: ["CSE", "ECE", "ME", "EEE", "Civil", "IT"][i % 6],
    cgpa: (6 + Math.random() * 4).toFixed(2),
    placed: Math.random() > 0.2,
    company: Math.random() > 0.2 ? ["TCS", "Infosys", "Wipro", "Cognizant", "Accenture"][Math.floor(Math.random() * 5)] : null,
    salary: Math.random() > 0.2 ? (3 + Math.random() * 25).toFixed(1) : null,
    offerLetterDate: Math.random() > 0.2 ? new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString() : null
  })), []);

  const stats = useMemo(() => {
    const placed = students.filter(s => s.placed).length;
    const avgSalary = students.filter(s => s.salary).reduce((sum, s) => sum + parseFloat(s.salary), 0) / placed || 0;
    const salaries = students.filter(s => s.salary).map(s => parseFloat(s.salary));
    
    return {
      total: students.length,
      placed,
      unplaced: students.length - placed,
      placementRate: ((placed / students.length) * 100).toFixed(1),
      avgCGPA: (students.reduce((sum, s) => sum + parseFloat(s.cgpa), 0) / students.length).toFixed(2),
      avgSalary: avgSalary.toFixed(1),
      highestSalary: Math.max(...salaries).toFixed(1),
      lowestSalary: Math.min(...salaries).toFixed(1),
      totalOffers: placed
    };
  }, [students]);

  const [reportType, setReportType] = useState("placement");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [filterBranch, setFilterBranch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [notification, setNotification] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    { value: "placement", label: "📊 Placement Report" },
    { value: "academic", label: "🎓 Academic Performance" },
    { value: "company", label: "🏢 Company-wise Report" },
    { value: "branch", label: "🔬 Branch-wise Report" },
    { value: "salary", label: "💰 Salary Analysis" },
    { value: "trend", label: "📈 Placement Trends" }
  ];

  const branches = [
    { value: "CSE", label: "Computer Science" },
    { value: "ECE", label: "Electronics & Communication" },
    { value: "ME", label: "Mechanical Engineering" },
    { value: "EEE", label: "Electrical Engineering" },
    { value: "Civil", label: "Civil Engineering" },
    { value: "IT", label: "Information Technology" }
  ];

  const statusOptions = [
    { value: "placed", label: "Placed" },
    { value: "unplaced", label: "Unplaced" }
  ];

  const filteredData = useMemo(() => {
    let data = [...students];

    // Date range filter
    if (dateRange.start && dateRange.end) {
      data = data.filter(s => {
        if (!s.offerLetterDate) return false;
        const offerDate = new Date(s.offerLetterDate);
        const start = new Date(dateRange.start);
        const end = new Date(dateRange.end);
        return offerDate >= start && offerDate <= end;
      });
    }

    // Branch filter
    if (filterBranch) {
      data = data.filter(s => s.branch === filterBranch);
    }

    // Status filter
    if (filterStatus === "placed") {
      data = data.filter(s => s.placed);
    } else if (filterStatus === "unplaced") {
      data = data.filter(s => !s.placed);
    }

    return data;
  }, [students, dateRange, filterBranch, filterStatus]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const generateReport = async () => {
    setIsGenerating(true);
    
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 1500));

    const report = {
      type: reportType,
      generatedAt: new Date().toISOString(),
      dateRange,
      filters: {
        branch: filterBranch || "All",
        status: filterStatus || "All"
      },
      stats: {
        totalRecords: filteredData.length,
        ...stats
      },
      data: filteredData
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${reportType}-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setIsGenerating(false);
    showNotification("success", `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} report generated successfully!`);
  };

  const exportData = async (format) => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (format === "csv") {
      const headers = ["ID", "Name", "Branch", "CGPA", "Status", "Company", "Salary"];
      const rows = filteredData.map(s => [
        s.id,
        s.name,
        s.branch,
        s.cgpa,
        s.placed ? "Placed" : "Unplaced",
        s.company || "N/A",
        s.salary || "N/A"
      ]);
      
      const csv = [headers, ...rows].map(row => row.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `students-data-${Date.now()}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      showNotification("success", "Data exported as CSV successfully!");
    } else if (format === "json") {
      const blob = new Blob([JSON.stringify(filteredData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `students-data-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showNotification("success", "Data exported as JSON successfully!");
    } else if (format === "pdf") {
      showNotification("info", "PDF export feature coming soon!");
    }

    setIsGenerating(false);
  };

  const resetFilters = () => {
    setDateRange({ start: "", end: "" });
    setFilterBranch("");
    setFilterStatus("");
    showNotification("info", "All filters have been reset");
  };

  return (
    <div style={{ 
      padding: "32px",
      minHeight: "100vh",
      background: darkMode ? "#1a1a1a" : "#f9fafb"
    }}>
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ 
          margin: "0 0 8px 0", 
          fontSize: "32px",
          fontWeight: "700",
          color: darkMode ? "white" : theme.text,
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}>
          <FileText size={32} color={theme.maroon} />
          Reports & Analytics
        </h1>
        <p style={{ 
          margin: 0, 
          color: darkMode ? "#9ca3af" : theme.textLight,
          fontSize: "14px"
        }}>
          Generate comprehensive reports and export placement data
        </p>
      </div>

      {/* Quick Stats */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "16px",
        marginBottom: "32px"
      }}>
        <StatBox
          label="Total Students"
          value={filteredData.length}
          icon={<BarChart3 size={20} />}
          color={theme.info}
          darkMode={darkMode}
        />
        <StatBox
          label="Placed"
          value={`${filteredData.filter(s => s.placed).length} (${stats.placementRate}%)`}
          icon={<CheckCircle size={20} />}
          color={theme.success}
          darkMode={darkMode}
        />
        <StatBox
          label="Avg CGPA"
          value={stats.avgCGPA}
          icon={<TrendingUp size={20} />}
          color={theme.warning}
          darkMode={darkMode}
        />
        <StatBox
          label="Avg Package"
          value={`₹${stats.avgSalary}L`}
          icon={<TrendingUp size={20} />}
          color={theme.maroon}
          darkMode={darkMode}
        />
        <StatBox
          label="Highest Package"
          value={`₹${stats.highestSalary}L`}
          icon={<TrendingUp size={20} />}
          color={theme.successLight}
          darkMode={darkMode}
        />
        <StatBox
          label="Total Offers"
          value={stats.totalOffers}
          icon={<CheckCircle size={20} />}
          color={theme.infoLight}
          darkMode={darkMode}
        />
      </div>

      {/* Main Content Grid */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "24px",
        marginBottom: "32px"
      }}>
        {/* Report Configuration */}
        <Card darkMode={darkMode}>
          <h3 style={{
            margin: "0 0 24px 0",
            fontSize: "20px",
            fontWeight: "600",
            color: darkMode ? "white" : theme.text,
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <FileText size={20} color={theme.maroon} />
            Report Configuration
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <Label darkMode={darkMode} required>Report Type</Label>
              <Select
                value={reportType}
                onChange={e => setReportType(e.target.value)}
                options={reportTypes}
                darkMode={darkMode}
                placeholder="Select report type"
              />
            </div>

            <div>
              <Label darkMode={darkMode}>Date Range (Optional)</Label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <Input
                    type="date"
                    value={dateRange.start}
                    onChange={e => setDateRange({ ...dateRange, start: e.target.value })}
                    darkMode={darkMode}
                  />
                  <span style={{ 
                    fontSize: "12px", 
                    color: darkMode ? "#9ca3af" : theme.textLight,
                    marginTop: "4px",
                    display: "block"
                  }}>
                    Start Date
                  </span>
                </div>
                <div>
                  <Input
                    type="date"
                    value={dateRange.end}
                    onChange={e => setDateRange({ ...dateRange, end: e.target.value })}
                    darkMode={darkMode}
                  />
                  <span style={{ 
                    fontSize: "12px", 
                    color: darkMode ? "#9ca3af" : theme.textLight,
                    marginTop: "4px",
                    display: "block"
                  }}>
                    End Date
                  </span>
                </div>
              </div>
            </div>

            <div style={{ 
              display: "flex", 
              gap: "12px",
              paddingTop: "8px"
            }}>
              <Button
                onClick={generateReport}
                icon={isGenerating ? <RefreshCw size={18} className="spin" /> : <Download size={18} />}
                color={theme.success}
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Report"}
              </Button>
              <Button
                onClick={resetFilters}
                icon={<RefreshCw size={18} />}
                color={theme.textLight}
                variant="outline"
              >
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Filters */}
        <Card darkMode={darkMode}>
          <h3 style={{
            margin: "0 0 24px 0",
            fontSize: "20px",
            fontWeight: "600",
            color: darkMode ? "white" : theme.text,
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <Filter size={20} color={theme.maroon} />
            Advanced Filters
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <Label darkMode={darkMode}>Filter by Branch</Label>
              <Select
                value={filterBranch}
                onChange={e => setFilterBranch(e.target.value)}
                options={branches}
                darkMode={darkMode}
                placeholder="All Branches"
              />
            </div>

            <div>
              <Label darkMode={darkMode}>Filter by Status</Label>
              <Select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value)}
                options={statusOptions}
                darkMode={darkMode}
                placeholder="All Students"
              />
            </div>

            <div style={{
              background: darkMode ? "#1a1a1a" : theme.beigeLight,
              padding: "16px",
              borderRadius: "8px",
              border: `1px solid ${darkMode ? "#3b3b3b" : theme.border}`
            }}>
              <div style={{ 
                fontSize: "13px", 
                color: darkMode ? "#9ca3af" : theme.textLight,
                marginBottom: "8px",
                fontWeight: "600"
              }}>
                Active Filters:
              </div>
              <div style={{ fontSize: "14px", color: darkMode ? "white" : theme.text }}>
                {!filterBranch && !filterStatus && !dateRange.start ? (
                  <span style={{ fontStyle: "italic", color: theme.textLight }}>No filters applied</span>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {filterBranch && <div>• Branch: <strong>{filterBranch}</strong></div>}
                    {filterStatus && <div>• Status: <strong>{statusOptions.find(o => o.value === filterStatus)?.label}</strong></div>}
                    {dateRange.start && <div>• Date Range: <strong>{dateRange.start} to {dateRange.end || "Present"}</strong></div>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Export Options */}
      <Card darkMode={darkMode}>
        <h3 style={{
          margin: "0 0 20px 0",
          fontSize: "20px",
          fontWeight: "600",
          color: darkMode ? "white" : theme.text,
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
          <Download size={20} color={theme.maroon} />
          Quick Export Options
        </h3>

        <div style={{ 
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px"
        }}>
          <Button
            onClick={() => exportData("csv")}
            icon={<FileSpreadsheet size={18} />}
            color={theme.success}
            disabled={isGenerating}
          >
            Export as CSV
          </Button>
          <Button
            onClick={() => exportData("json")}
            icon={<FileJson size={18} />}
            color={theme.warning}
            disabled={isGenerating}
          >
            Export as JSON
          </Button>
          <Button
            onClick={() => exportData("pdf")}
            icon={<Printer size={18} />}
            color={theme.danger}
            disabled={isGenerating}
          >
            Export as PDF
          </Button>
        </div>

        <div style={{
          marginTop: "20px",
          padding: "16px",
          background: darkMode ? "#1a1a1a" : `${theme.info}10`,
          borderRadius: "8px",
          border: `1px solid ${theme.info}30`,
          display: "flex",
          alignItems: "start",
          gap: "12px"
        }}>
          <AlertCircle size={20} color={theme.info} style={{ flexShrink: 0, marginTop: "2px" }} />
          <div style={{ fontSize: "13px", color: darkMode ? "#9ca3af" : theme.textLight, lineHeight: "1.6" }}>
            <strong style={{ color: darkMode ? "white" : theme.text }}>Export Note:</strong> Exports will include only the filtered data based on your current filter selections. Clear all filters to export the complete dataset.
          </div>
        </div>
      </Card>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}