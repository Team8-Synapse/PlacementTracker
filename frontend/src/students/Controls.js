import React from "react";

// Icons
import {
  Search,
  Plus,
  Filter,
  Activity,
  Trash2,
  Download,
  Upload
} from "lucide-react";

// Constants
import { theme, branches, companies, locations } from "../data/constants";


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

const inputStyle = {
  padding: "8px 10px",
  borderRadius: 6,
  border: `1px solid ${theme.border}`,
  width: "100%"
};

const selectStyle = (darkMode) => ({
  padding: "8px 10px",
  borderRadius: 6,
  border: `1px solid ${theme.border}`,
  width: "100%",
  background: darkMode ? "#2c2c2c" : "white",
  color: darkMode ? "white" : theme.text
});



export default function Controls({ 
  search, setSearch, filters, setFilters, showAdvancedFilters, setShowAdvancedFilters,
  viewMode, setViewMode, compareMode, setCompareMode, sortConfig, setSortConfig,
  darkMode, onExport, onImport, exportFormat, setExportFormat, bulkAction, setBulkAction,
  selectedRows, onBulkDelete, onAddStudent
}) {
  const cardBg = darkMode ? "#2c2c2c" : theme.beigeDark;
  
  return (
    <div style={{ padding: "20px 32px" }}>
      {/* Primary Controls */}
      <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 250 }}>
          <Search size={18} style={{ position: "absolute", left: 12, top: 10, opacity: 0.5 }} />
          <input
            placeholder="Search by name, email, or company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 10px 10px 40px",
              border: `1px solid ${theme.border}`,
              borderRadius: 8,
              fontSize: 14,
              background: cardBg
            }}
          />
        </div>
        
        <button onClick={onAddStudent} style={buttonStyle(theme.success, "white")}>
          <Plus size={16} /> Add Student
        </button>
        
        <button onClick={() => setShowAdvancedFilters(!showAdvancedFilters)} style={buttonStyle(theme.info, "white")}>
          <Filter size={16} /> {showAdvancedFilters ? "Hide" : "Show"} Filters
        </button>
        
        <button onClick={() => setCompareMode(!compareMode)} style={buttonStyle(theme.warning, "white")}>
          <Activity size={16} /> {compareMode ? "Exit" : "Compare"} Mode
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div style={{
          background: cardBg,
          padding: 20,
          borderRadius: 12,
          marginBottom: 16,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 12
        }}>
          <select value={filters.branch} onChange={e => setFilters({ ...filters, branch: e.target.value })} style={selectStyle(cardBg)}>
            {branches.map(b => <option key={b}>{b}</option>)}
          </select>
          
          <select value={filters.year} onChange={e => setFilters({ ...filters, year: e.target.value })} style={selectStyle(cardBg)}>
            <option>All</option>
            <option>2024</option>
            <option>2025</option>
            <option>2026</option>
          </select>
          
          <select value={filters.placementStatus} onChange={e => setFilters({ ...filters, placementStatus: e.target.value })} style={selectStyle(cardBg)}>
            <option>All</option>
            <option>Placed</option>
            <option>In Progress</option>
            <option>Registered</option>
            <option>Not Interested</option>
          </select>
          
          <select value={filters.company} onChange={e => setFilters({ ...filters, company: e.target.value })} style={selectStyle(cardBg)}>
            <option>All</option>
            {companies.map(c => <option key={c}>{c}</option>)}
          </select>
          
          <input
            placeholder="Min Salary (LPA)"
            type="number"
            value={filters.salaryMin}
            onChange={e => setFilters({ ...filters, salaryMin: e.target.value })}
            style={inputStyle(cardBg)}
          />
          
          <input
            placeholder="Max Salary (LPA)"
            type="number"
            value={filters.salaryMax}
            onChange={e => setFilters({ ...filters, salaryMax: e.target.value })}
            style={inputStyle(cardBg)}
          />
          
          <input
            placeholder="Min CGPA"
            type="number"
            step="0.1"
            value={filters.cgpaMin}
            onChange={e => setFilters({ ...filters, cgpaMin: e.target.value })}
            style={inputStyle(cardBg)}
          />
          
          <input
            placeholder="Max CGPA"
            type="number"
            step="0.1"
            value={filters.cgpaMax}
            onChange={e => setFilters({ ...filters, cgpaMax: e.target.value })}
            style={inputStyle(cardBg)}
          />
          
          <select value={filters.gender} onChange={e => setFilters({ ...filters, gender: e.target.value })} style={selectStyle(cardBg)}>
            <option>All</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          
          <select value={filters.location} onChange={e => setFilters({ ...filters, location: e.target.value })} style={selectStyle(cardBg)}>
            <option>All</option>
            {locations.map(l => <option key={l}>{l}</option>)}
          </select>
          
          <button 
            onClick={() => setFilters({
              branch: "All", year: "All", placementStatus: "All", company: "All",
              salaryMin: "", salaryMax: "", cgpaMin: "", cgpaMax: "", gender: "All", location: "All"
            })}
            style={buttonStyle(theme.danger, "white")}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* View Mode & Bulk Actions */}
      <div style={{ display: "flex", gap: 12, justifyContent: "space-between", flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <button 
            onClick={() => setViewMode("table")} 
            style={buttonStyle(viewMode === "table" ? theme.maroon : cardBg, viewMode === "table" ? "white" : theme.text)}
          >
            Table View
          </button>
          <button 
            onClick={() => setViewMode("grid")} 
            style={buttonStyle(viewMode === "grid" ? theme.maroon : cardBg, viewMode === "grid" ? "white" : theme.text)}
          >
            Grid View
          </button>
          <button 
            onClick={() => setViewMode("kanban")} 
            style={buttonStyle(viewMode === "kanban" ? theme.maroon : cardBg, viewMode === "kanban" ? "white" : theme.text)}
          >
            Kanban View
          </button>
        </div>
        
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {selectedRows.length > 0 && (
            <>
              <span style={{ fontSize: 14 }}>{selectedRows.length} selected</span>
              <button onClick={onBulkDelete} style={buttonStyle(theme.danger, "white")}>
                <Trash2 size={16} /> Delete Selected
              </button>
            </>
          )}
          
          <select value={exportFormat} onChange={e => setExportFormat(e.target.value)} style={selectStyle(cardBg)}>
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
            <option value="pdf">PDF</option>
          </select>
          
          <button onClick={() => onExport(exportFormat)} style={buttonStyle(theme.success, "white")}>
            <Download size={16} /> Export
          </button>
          
          <label style={{ ...buttonStyle(theme.info, "white"), cursor: "pointer" }}>
            <Upload size={16} /> Import
            <input 
              type="file" 
              accept=".json" 
              style={{ display: "none" }}
              onChange={e => onImport(e.target.files[0])}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

