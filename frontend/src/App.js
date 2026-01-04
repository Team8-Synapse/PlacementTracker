import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useAuth } from "./auth/AuthContext";
import Login from "./auth/Login";
import { ROLE_PERMISSIONS } from "./auth/roles";


import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  AreaChart, Area,
  ScatterChart, Scatter
} from "recharts";
import { Download, Upload, User, Award, Briefcase, TrendingUp, Filter, Search, Plus, Edit, Trash2, Eye, EyeOff, Mail, Phone, Calendar, MapPin, DollarSign, Star, Target, Activity, Users, Building, BookOpen, Clock, CheckCircle, XCircle, AlertCircle, FileText, BarChart3, PieChart as PieIcon, Settings, Bell, RefreshCw, Save, Share2, Printer, ChevronDown, ChevronUp, ExternalLink, Linkedin, Github, Globe, MessageSquare, ThumbsUp, Copy, CheckCheck } from "lucide-react";

// DATA
import initialStudents from "./data/initialStudents";
import { theme, branches } from "./data/constants";

// COMMON
import TabNavigation from "./common/TabNavigation";
import NotificationContainer from "./common/NotificationContainer";
import Modal from "./common/Modal";
import Footer from "./common/Footer";
import Navbar from "./common/Navbar";

// STUDENTS
import Controls from "./students/Controls";
import StudentTable from "./students/StudentTable";
import StudentGrid from "./students/StudentGrid";
import KanbanView from "./students/KanbanView";
import StudentForm from "./students/StudentForm";
import StudentDetailView from "./students/StudentDetailView";

// ANALYTICS
import AdvancedAnalytics from "./analytics/AdvancedAnalytics";

// REPORTS
import ReportsSection from "./reports/ReportsSection";

// COMPARISON
import ComparisonView from "./comparison/ComparisonView";

// STORAGE
import { loadFromStorage, saveToStorage } from "./utils/storage";

// DASHBOARD
import Dashboard from "./dashboard/Dashboard";

/* ===================== MAIN APP ===================== */
export default function App() {
  const { user } = useAuth();
  const allowedTabs = ROLE_PERMISSIONS[user.role]?.tabs || [];
  const [students, setStudents] = useState(() => {
    const saved = loadFromStorage();
    return saved?.students || initialStudents;
  });
  
  const [activeTab, setActiveTab] = useState("dashboard");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    branch: "All",
    year: "All",
    placementStatus: "All",
    company: "All",
    salaryMin: "",
    salaryMax: "",
    cgpaMin: "",
    cgpaMax: "",
    gender: "All",
    location: "All",
  });
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedForCompare, setSelectedForCompare] = useState([]);
  const [exportFormat, setExportFormat] = useState("csv");
  const [bulkAction, setBulkAction] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [chartType, setChartType] = useState("bar");
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [autoSave, setAutoSave] = useState(true);
  const [savedSearches, setSavedSearches] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [timeline, setTimeline] = useState([]);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave) {
      saveToStorage({ students, filters, savedSearches });
    }
  }, [students, autoSave, filters, savedSearches]);

  // Notification system
  const addNotification = useCallback((message, type = "info") => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, []);

  // Filter logic
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase()) ||
        s.company.toLowerCase().includes(search.toLowerCase());
      const matchesBranch = filters.branch === "All" || s.branch === filters.branch;
      const matchesYear = filters.year === "All" || s.year === Number(filters.year);
      const matchesStatus = filters.placementStatus === "All" || s.placementStatus === filters.placementStatus;
      const matchesCompany = filters.company === "All" || s.company === filters.company;
      const matchesSalary = (!filters.salaryMin || s.salary >= Number(filters.salaryMin)) &&
        (!filters.salaryMax || s.salary <= Number(filters.salaryMax));
      const matchesCGPA = (!filters.cgpaMin || s.cgpa >= Number(filters.cgpaMin)) &&
        (!filters.cgpaMax || s.cgpa <= Number(filters.cgpaMax));
      const matchesGender = filters.gender === "All" || s.gender === filters.gender;
      const matchesLocation = filters.location === "All" || s.preferredLocation === filters.location;
      
      return matchesSearch && matchesBranch && matchesYear && matchesStatus && 
             matchesCompany && matchesSalary && matchesCGPA && matchesGender && matchesLocation;
    });
  }, [students, search, filters]);

  // Sort logic
  const sortedStudents = useMemo(() => {
    const sorted = [...filteredStudents];
    sorted.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (typeof aVal === "string") {
        return sortConfig.direction === "asc" 
          ? aVal.localeCompare(bVal) 
          : bVal.localeCompare(aVal);
      }
      return sortConfig.direction === "asc" ? aVal - bVal : bVal - aVal;
    });
    return sorted;
  }, [filteredStudents, sortConfig]);

  // Statistics
  const stats = useMemo(() => {
    const total = students.length;
    const placed = students.filter(s => s.placed).length;
    const avgCGPA = students.reduce((sum, s) => sum + s.cgpa, 0) / total;
    const avgSalary = students.filter(s => s.salary > 0).reduce((sum, s) => sum + s.salary, 0) / placed || 0;
    const totalOffers = students.reduce((sum, s) => sum + s.offers, 0);
    const highestSalary = Math.max(...students.map(s => s.salary));
    const lowestSalary = Math.min(...students.filter(s => s.salary > 0).map(s => s.salary)) || 0;
    
    return {
      total,
      placed,
      unplaced: total - placed,
      placementRate: ((placed / total) * 100).toFixed(1),
      avgCGPA: avgCGPA.toFixed(2),
      avgSalary: avgSalary.toFixed(1),
      totalOffers,
      highestSalary,
      lowestSalary,
      avgOffers: (totalOffers / total).toFixed(1),
      maleStudents: students.filter(s => s.gender === "Male").length,
      femaleStudents: students.filter(s => s.gender === "Female").length,
      avgAttendance: (students.reduce((sum, s) => sum + s.attendance, 0) / total).toFixed(1),
      studentsWithBacklofgs: students.filter(s => s.backlogs > 0).length,
      avgProjects: (students.reduce((sum, s) => sum + s.projects, 0) / total).toFixed(1),
      avgInternships: (students.reduce((sum, s) => sum + s.internships, 0) / total).toFixed(1),
    };
  }, [students]);

  // Chart data
  const chartData = useMemo(() => {
    const branchData = branches.filter(b => b !== "All").map(branch => ({
      name: branch,
      placed: students.filter(s => s.branch === branch && s.placed).length,
      unplaced: students.filter(s => s.branch === branch && !s.placed).length,
      avgSalary: (students.filter(s => s.branch === branch && s.salary > 0)
        .reduce((sum, s) => sum + s.salary, 0) / students.filter(s => s.branch === branch && s.placed).length) || 0,
    }));

    const companyData = [...new Set(students.filter(s => s.company).map(s => s.company))]
      .map(company => ({
        name: company,
        count: students.filter(s => s.company === company).length,
        avgSalary: (students.filter(s => s.company === company)
          .reduce((sum, s) => sum + s.salary, 0) / students.filter(s => s.company === company).length) || 0,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    const salaryDistribution = [
      { range: "0-20 LPA", count: students.filter(s => s.salary > 0 && s.salary <= 20).length },
      { range: "20-40 LPA", count: students.filter(s => s.salary > 20 && s.salary <= 40).length },
      { range: "40-60 LPA", count: students.filter(s => s.salary > 40 && s.salary <= 60).length },
      { range: "60+ LPA", count: students.filter(s => s.salary > 60).length },
    ];

    const cgpaDistribution = [
      { range: "< 7.0", count: students.filter(s => s.cgpa < 7.0).length },
      { range: "7.0-8.0", count: students.filter(s => s.cgpa >= 7.0 && s.cgpa < 8.0).length },
      { range: "8.0-9.0", count: students.filter(s => s.cgpa >= 8.0 && s.cgpa < 9.0).length },
      { range: "9.0+", count: students.filter(s => s.cgpa >= 9.0).length },
    ];

    const yearData = [2024, 2025].map(year => ({
      year,
      placed: students.filter(s => s.year === year && s.placed).length,
      unplaced: students.filter(s => s.year === year && !s.placed).length,
    }));

    return { branchData, companyData, salaryDistribution, cgpaDistribution, yearData };
  }, [students]);

  // CRUD operations
  const addStudent = (student) => {
    const newStudent = { ...student, id: Date.now(), lastUpdated: new Date().toISOString() };
    setStudents([...students, newStudent]);
    addNotification(`Student ${student.name} added successfully`, "success");
    setShowModal(false);
  };

  const updateStudent = (updatedStudent) => {
    setStudents(students.map(s => s.id === updatedStudent.id 
      ? { ...updatedStudent, lastUpdated: new Date().toISOString() } 
      : s));
    addNotification(`Student ${updatedStudent.name} updated successfully`, "success");
    setShowModal(false);
    setSelectedStudent(null);
  };

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter(s => s.id !== id));
      addNotification("Student deleted successfully", "success");
    }
  };

  const bulkDelete = () => {
    if (window.confirm(`Delete ${selectedRows.length} students?`)) {
      setStudents(students.filter(s => !selectedRows.includes(s.id)));
      setSelectedRows([]);
      addNotification(`${selectedRows.length} students deleted`, "success");
    }
  };

  // Export functionality
  const exportData = (format) => {
    const dataToExport = selectedRows.length > 0 
      ? students.filter(s => selectedRows.includes(s.id))
      : sortedStudents;

    if (format === "csv") {
      const headers = Object.keys(dataToExport[0]).join(",");
      const rows = dataToExport.map(s => Object.values(s).map(v => 
        typeof v === "string" && v.includes(",") ? `"${v}"` : v
      ).join(","));
      const csv = [headers, ...rows].join("\n");
      downloadFile(csv, "placement-data.csv", "text/csv");
    } else if (format === "json") {
      downloadFile(JSON.stringify(dataToExport, null, 2), "placement-data.json", "application/json");
    }
    addNotification(`Data exported as ${format.toUpperCase()}`, "success");
  };

  const downloadFile = (content, filename, type) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import functionality
  const importData = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (Array.isArray(imported)) {
          setStudents([...students, ...imported.map(s => ({ ...s, id: Date.now() + Math.random() }))]);
          addNotification(`${imported.length} students imported`, "success");
        }
      } catch (err) {
        addNotification("Import failed. Invalid file format.", "danger");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={{ minHeight: "100vh", background: darkMode ? "#1a1a1a" : theme.beige, color: darkMode ? "#fff" : theme.text }}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <NotificationContainer notifications={notifications} />
      
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} darkMode={darkMode} />
      
      {activeTab === "dashboard" && (
        <Dashboard 
          stats={stats} 
          students={students} 
          chartData={chartData} 
          chartType={chartType}
          setChartType={setChartType}
          darkMode={darkMode}
        />
      )}
      
      {activeTab === "students" && (
        <>
          <Controls
            search={search}
            setSearch={setSearch}
            filters={filters}
            setFilters={setFilters}
            showAdvancedFilters={showAdvancedFilters}
            setShowAdvancedFilters={setShowAdvancedFilters}
            viewMode={viewMode}
            setViewMode={setViewMode}
            compareMode={compareMode}
            setCompareMode={setCompareMode}
            sortConfig={sortConfig}
            setSortConfig={setSortConfig}
            darkMode={darkMode}
            onExport={exportData}
            onImport={importData}
            exportFormat={exportFormat}
            setExportFormat={setExportFormat}
            bulkAction={bulkAction}
            setBulkAction={setBulkAction}
            selectedRows={selectedRows}
            onBulkDelete={bulkDelete}
            onAddStudent={() => { setModalType("add"); setShowModal(true); }}
          />
          
          {viewMode === "table" && (
            <StudentTable
              students={sortedStudents}
              onEdit={(student) => { setSelectedStudent(student); setModalType("edit"); setShowModal(true); }}
              onDelete={deleteStudent}
              onView={(student) => { setSelectedStudent(student); setModalType("view"); setShowModal(true); }}
              sortConfig={sortConfig}
              setSortConfig={setSortConfig}
              compareMode={compareMode}
              selectedForCompare={selectedForCompare}
              setSelectedForCompare={setSelectedForCompare}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              darkMode={darkMode}
            />
          )}
          
          {viewMode === "grid" && (
            <StudentGrid
              students={sortedStudents}
              onEdit={(student) => { setSelectedStudent(student); setModalType("edit"); setShowModal(true); }}
              onDelete={deleteStudent}
              onView={(student) => { setSelectedStudent(student); setModalType("view"); setShowModal(true); }}
              darkMode={darkMode}
            />
          )}
          
          {viewMode === "kanban" && (
            <KanbanView
              students={sortedStudents}
              onEdit={(student) => { setSelectedStudent(student); setModalType("edit"); setShowModal(true); }}
              darkMode={darkMode}
            />
          )}
        </>
      )}
      
      {activeTab === "analytics" && allowedTabs.includes("analytics") && (
        <AdvancedAnalytics 
          students={students} 
          chartData={chartData}
          stats={stats}
          darkMode={darkMode}
        />
      )}
      
      {activeTab === "reports" && (
        <ReportsSection 
          students={students}
          stats={stats}
          onExport={exportData}
          darkMode={darkMode}
        />
      )}
      
      {activeTab === "comparison" && (
        <ComparisonView
          students={selectedForCompare.map(id => students.find(s => s.id === id)).filter(Boolean)}
          darkMode={darkMode}
        />
      )}
      
      {showModal && (
        <Modal onClose={() => { setShowModal(false); setSelectedStudent(null); }}>
          {modalType === "add" && <StudentForm onSubmit={addStudent} darkMode={darkMode} />}
          {modalType === "edit" && <StudentForm student={selectedStudent} onSubmit={updateStudent} darkMode={darkMode} />}
          {modalType === "view" && <StudentDetailView student={selectedStudent} darkMode={darkMode} />}
        </Modal>
      )}
      
      <Footer darkMode={darkMode} />
    </div>
  );
}


