import React, { useState, useMemo, useEffect, useCallback } from "react";
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

/* ===================== THEME ===================== */
const theme = {
  maroon: "#7b1e1e",
  maroonDark: "#5c1515",
  maroonLight: "#9d3636",
  beige: "#f5f1e6",
  beigeDark: "#e6dcc7",
  beigeLight: "#fffef9",
  success: "#2e7d32",
  successLight: "#66bb6a",
  danger: "#c62828",
  dangerLight: "#ef5350",
  warning: "#f57c00",
  warningLight: "#ffa726",
  info: "#0288d1",
  infoLight: "#29b6f6",
  text: "#2c2c2c",
  textLight: "#666",
  border: "#ddd",
  shadow: "0 2px 8px rgba(0,0,0,0.1)",
  shadowHover: "0 4px 12px rgba(0,0,0,0.15)",
};

/* ===================== INITIAL DATA ===================== */
const initialStudents = [
  { id: 1, name: "Arjun Kumar", branch: "CSE", cgpa: 8.9, placed: true, company: "Amazon", year: 2025, offers: 2, salary: 42, email: "arjun@amrita.edu", phone: "9876543210", address: "Chennai", dob: "2003-05-15", skills: ["Python", "AWS", "React"], internships: 2, projects: 5, certifications: ["AWS Certified"], interviews: 8, bio: "Passionate about cloud computing", linkedin: "linkedin.com/in/arjun", github: "github.com/arjun", portfolio: "arjun.dev", preferredLocation: "Bangalore", expectedSalary: 40, attendance: 92, backlogs: 0, extraCurricular: ["Coding Club", "NSS"], achievements: ["Hackathon Winner"], gender: "Male", category: "General", placementStatus: "Placed", offerLetterDate: "2024-11-15", joiningDate: "2025-07-01", interviewRounds: 4, technicalScore: 85, hrScore: 90, aptitudeScore: 88, communicationScore: 87, overallScore: 87.5, mentorAssigned: "Dr. Sharma", lastUpdated: "2024-12-01", notes: "Excellent performer" },
  { id: 2, name: "Priya Singh", branch: "ECE", cgpa: 8.2, placed: false, company: "", year: 2025, offers: 0, salary: 0, email: "priya@amrita.edu", phone: "9876543211", address: "Mumbai", dob: "2003-08-22", skills: ["VLSI", "Embedded C"], internships: 1, projects: 3, certifications: [], interviews: 3, bio: "Electronics enthusiast", linkedin: "", github: "", portfolio: "", preferredLocation: "Mumbai", expectedSalary: 30, attendance: 88, backlogs: 1, extraCurricular: ["IEEE"], achievements: [], gender: "Female", category: "OBC", placementStatus: "In Progress", offerLetterDate: "", joiningDate: "", interviewRounds: 0, technicalScore: 75, hrScore: 72, aptitudeScore: 78, communicationScore: 70, overallScore: 73.75, mentorAssigned: "Dr. Patel", lastUpdated: "2024-12-10", notes: "Working on skill improvement" },
  { id: 3, name: "Rahul Verma", branch: "AI", cgpa: 9.1, placed: true, company: "Google", year: 2024, offers: 3, salary: 58, email: "rahul@amrita.edu", phone: "9876543212", address: "Bangalore", dob: "2002-12-10", skills: ["Machine Learning", "TensorFlow", "Python", "Deep Learning"], internships: 3, projects: 8, certifications: ["Google ML", "Deep Learning Specialization"], interviews: 12, bio: "AI/ML researcher", linkedin: "linkedin.com/in/rahulv", github: "github.com/rahulv", portfolio: "rahulverma.ai", preferredLocation: "Bangalore", expectedSalary: 50, attendance: 96, backlogs: 0, extraCurricular: ["AI Club President", "Research Assistant"], achievements: ["Best Project Award", "Research Paper Published"], gender: "Male", category: "General", placementStatus: "Placed", offerLetterDate: "2023-10-20", joiningDate: "2024-07-15", interviewRounds: 5, technicalScore: 95, hrScore: 92, aptitudeScore: 94, communicationScore: 90, overallScore: 92.75, mentorAssigned: "Dr. Reddy", lastUpdated: "2024-11-20", notes: "Outstanding student" },
  { id: 4, name: "Sneha Nair", branch: "CSE", cgpa: 8.7, placed: true, company: "Microsoft", year: 2025, offers: 2, salary: 45, email: "sneha@amrita.edu", phone: "9876543213", address: "Kochi", dob: "2003-03-18", skills: ["Java", "Spring Boot", "Azure", "Microservices"], internships: 2, projects: 6, certifications: ["Azure Developer"], interviews: 7, bio: "Full-stack developer", linkedin: "linkedin.com/in/sneha", github: "github.com/sneha", portfolio: "sneha.tech", preferredLocation: "Hyderabad", expectedSalary: 40, attendance: 94, backlogs: 0, extraCurricular: ["Women in Tech"], achievements: ["Smart India Hackathon Finalist"], gender: "Female", category: "General", placementStatus: "Placed", offerLetterDate: "2024-11-25", joiningDate: "2025-07-10", interviewRounds: 4, technicalScore: 88, hrScore: 89, aptitudeScore: 86, communicationScore: 91, overallScore: 88.5, mentorAssigned: "Dr. Kumar", lastUpdated: "2024-12-05", notes: "Strong technical skills" },
  { id: 5, name: "Vikram Desai", branch: "EEE", cgpa: 7.8, placed: false, company: "", year: 2025, offers: 0, salary: 0, email: "vikram@amrita.edu", phone: "9876543214", address: "Pune", dob: "2003-07-30", skills: ["Power Systems", "MATLAB"], internships: 1, projects: 2, certifications: [], interviews: 2, bio: "Electrical engineer", linkedin: "", github: "", portfolio: "", preferredLocation: "Pune", expectedSalary: 25, attendance: 82, backlogs: 2, extraCurricular: [], achievements: [], gender: "Male", category: "SC", placementStatus: "Registered", offerLetterDate: "", joiningDate: "", interviewRounds: 0, technicalScore: 68, hrScore: 65, aptitudeScore: 70, communicationScore: 66, overallScore: 67.25, mentorAssigned: "Dr. Singh", lastUpdated: "2024-12-08", notes: "Needs guidance" },
  { id: 6, name: "Ananya Iyer", branch: "AI", cgpa: 8.95, placed: true, company: "Adobe", year: 2025, offers: 2, salary: 48, email: "ananya@amrita.edu", phone: "9876543215", address: "Bangalore", dob: "2003-01-25", skills: ["Computer Vision", "PyTorch", "OpenCV"], internships: 2, projects: 7, certifications: ["Computer Vision Specialization"], interviews: 9, bio: "Computer vision expert", linkedin: "linkedin.com/in/ananya", github: "github.com/ananya", portfolio: "ananya.ml", preferredLocation: "Bangalore", expectedSalary: 45, attendance: 95, backlogs: 0, extraCurricular: ["Tech Club"], achievements: ["Research Intern at IIT"], gender: "Female", category: "General", placementStatus: "Placed", offerLetterDate: "2024-12-01", joiningDate: "2025-07-20", interviewRounds: 4, technicalScore: 92, hrScore: 88, aptitudeScore: 90, communicationScore: 89, overallScore: 89.75, mentorAssigned: "Dr. Reddy", lastUpdated: "2024-12-12", notes: "Excellent research background" },
  { id: 7, name: "Karthik Menon", branch: "MECH", cgpa: 7.5, placed: true, company: "Tata Motors", year: 2025, offers: 1, salary: 28, email: "karthik@amrita.edu", phone: "9876543216", address: "Coimbatore", dob: "2003-09-12", skills: ["AutoCAD", "SolidWorks", "ANSYS"], internships: 1, projects: 3, certifications: ["AutoCAD Certified"], interviews: 5, bio: "Mechanical design engineer", linkedin: "", github: "", portfolio: "", preferredLocation: "Chennai", expectedSalary: 28, attendance: 85, backlogs: 1, extraCurricular: ["SAE Club"], achievements: [], gender: "Male", category: "OBC", placementStatus: "Placed", offerLetterDate: "2024-11-10", joiningDate: "2025-06-15", interviewRounds: 3, technicalScore: 72, hrScore: 75, aptitudeScore: 70, communicationScore: 73, overallScore: 72.5, mentorAssigned: "Dr. Menon", lastUpdated: "2024-11-28", notes: "Core engineering placement" },
  { id: 8, name: "Divya Krishnan", branch: "CSE", cgpa: 9.3, placed: true, company: "Goldman Sachs", year: 2025, offers: 3, salary: 52, email: "divya@amrita.edu", phone: "9876543217", address: "Delhi", dob: "2003-04-08", skills: ["C++", "Data Structures", "Algorithms", "System Design"], internships: 3, projects: 9, certifications: ["Competitive Programming"], interviews: 15, bio: "Competitive programmer", linkedin: "linkedin.com/in/divyak", github: "github.com/divyak", portfolio: "divya.codes", preferredLocation: "Bangalore", expectedSalary: 50, attendance: 98, backlogs: 0, extraCurricular: ["Coding Club", "ACM ICPC"], achievements: ["CodeChef 5 Star", "Google Kickstart Rank 150"], gender: "Female", category: "General", placementStatus: "Placed", offerLetterDate: "2024-10-30", joiningDate: "2025-07-05", interviewRounds: 6, technicalScore: 98, hrScore: 94, aptitudeScore: 96, communicationScore: 92, overallScore: 95, mentorAssigned: "Dr. Kumar", lastUpdated: "2024-12-15", notes: "Top performer" },
];

const branches = ["All", "CSE", "ECE", "AI", "EEE", "MECH", "CIVIL", "IT", "ECM"];
const companies = ["Amazon", "Google", "Microsoft", "Adobe", "Goldman Sachs", "Morgan Stanley", "Infosys", "TCS", "Wipro", "Cognizant", "Accenture", "Deloitte", "KPMG", "EY", "PWC", "Flipkart", "Paytm", "Zomato", "Swiggy", "Ola", "Uber", "Intel", "NVIDIA", "Qualcomm", "Samsung", "LG", "Tata Motors", "Mahindra", "L&T", "Other"];
const skills = ["Python", "Java", "JavaScript", "C++", "React", "Node.js", "AWS", "Azure", "Machine Learning", "Deep Learning", "Data Science", "DevOps", "Kubernetes", "Docker", "SQL", "MongoDB", "Spring Boot", "Django", "Flask", "TensorFlow", "PyTorch", "Computer Vision", "NLP", "Blockchain"];
const locations = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune", "Kochi", "Kolkata", "Ahmedabad", "Jaipur", "Remote", "Open to Relocate"];

/* ===================== STORAGE FUNCTIONS ===================== */
const STORAGE_KEY = "amrita-placement-data";

const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (e) {
    console.error("Failed to load from storage", e);
    return null;
  }
};

const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error("Failed to save to storage", e);
    return false;
  }
};

/* ===================== MAIN APP ===================== */
export default function App() {
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
      studentsWithBacklogs: students.filter(s => s.backlogs > 0).length,
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
      
      {activeTab === "analytics" && (
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

/* ===================== NAVBAR ===================== */
function Navbar({ darkMode, setDarkMode }) {
  return (
    <header style={{ 
      background: darkMode ? "#2c2c2c" : theme.maroon, 
      color: "white", 
      padding: "16px 32px",
      boxShadow: theme.shadow,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }}>
      <div>
        <h1 style={{ margin: 0, fontSize: 28 }}>AMRITA Placement Tracker</h1>
        <p style={{ margin: "4px 0 0 0", fontSize: 14, opacity: 0.9 }}>
          Advanced Placement Management System · Academic Year 2024-25
        </p>
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Bell size={20} style={{ cursor: "pointer" }} />
        <Settings size={20} style={{ cursor: "pointer" }} />
        <button 
          onClick={() => setDarkMode(!darkMode)}
          style={{
            background: "rgba(255,255,255,0.2)",
            border: "none",
            color: "white",
            padding: "8px 16px",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </header>
  );
}

/* ===================== TAB NAVIGATION ===================== */
function TabNavigation({ activeTab, setActiveTab, darkMode }) {
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

/* ===================== NOTIFICATION CONTAINER ===================== */
function NotificationContainer({ notifications }) {
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

/* ===================== DASHBOARD ===================== */
function Dashboard({ stats, students, chartData, chartType, setChartType, darkMode }) {
  const cardBg = darkMode ? "#2c2c2c" : theme.beigeDark;
  
  return (
    <div style={{ padding: 32 }}>
      {/* Stats Grid */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: 20,
        marginBottom: 32
      }}>
        <StatCard title="Total Students" value={stats.total} icon={<Users />} color={theme.info} darkMode={darkMode} />
        <StatCard title="Placed" value={stats.placed} icon={<CheckCircle />} color={theme.success} darkMode={darkMode} />
        <StatCard title="Unplaced" value={stats.unplaced} icon={<XCircle />} color={theme.danger} darkMode={darkMode} />
        <StatCard title="Placement Rate" value={`${stats.placementRate}%`} icon={<Target />} color={theme.warning} darkMode={darkMode} />
        <StatCard title="Avg CGPA" value={stats.avgCGPA} icon={<Award />} color={theme.maroon} darkMode={darkMode} />
        <StatCard title="Avg Salary" value={`₹${stats.avgSalary}L`} icon={<DollarSign />} color={theme.successLight} darkMode={darkMode} />
        <StatCard title="Highest Package" value={`₹${stats.highestSalary}L`} icon={<TrendingUp />} color={theme.success} darkMode={darkMode} />
        <StatCard title="Total Offers" value={stats.totalOffers} icon={<Briefcase />} color={theme.info} darkMode={darkMode} />
      </div>

      {/* Chart Type Selector */}
      <div style={{ marginBottom: 16, display: "flex", gap: 8 }}>
        {["bar", "line", "pie", "area"].map(type => (
          <button
            key={type}
            onClick={() => setChartType(type)}
            style={{
              padding: "8px 16px",
              background: chartType === type ? theme.maroon : cardBg,
              color: chartType === type ? "white" : theme.text,
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              textTransform: "capitalize"
            }}
          >
            {type} Chart
          </button>
        ))}
      </div>

      {/* Charts Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <ChartCard title="Branch-wise Placement" darkMode={darkMode}>
          <ResponsiveContainer width="100%" height={300}>
            {chartType === "bar" && (
              <BarChart data={chartData.branchData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="placed" fill={theme.success} />
                <Bar dataKey="unplaced" fill={theme.danger} />
              </BarChart>
            )}
            {chartType === "line" && (
              <LineChart data={chartData.branchData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="placed" stroke={theme.success} />
                <Line type="monotone" dataKey="unplaced" stroke={theme.danger} />
              </LineChart>
            )}
            {chartType === "area" && (
              <AreaChart data={chartData.branchData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="placed" stroke={theme.success} fill={theme.success} />
                <Area type="monotone" dataKey="unplaced" stroke={theme.danger} fill={theme.danger} />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Companies" darkMode={darkMode}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.companyData.slice(0, 8)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="count" fill={theme.maroon} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Salary Distribution" darkMode={darkMode}>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData.salaryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={entry => `${entry.range}: ${entry.count}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {chartData.salaryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={[theme.success, theme.info, theme.warning, theme.danger][index % 4]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="CGPA Distribution" darkMode={darkMode}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.cgpaDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill={theme.maroonLight} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Additional Stats */}
      <div style={{ marginTop: 32, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
        <InfoCard title="Gender Distribution" darkMode={darkMode}>
          <p>Male: {stats.maleStudents} ({((stats.maleStudents / stats.total) * 100).toFixed(1)}%)</p>
          <p>Female: {stats.femaleStudents} ({((stats.femaleStudents / stats.total) * 100).toFixed(1)}%)</p>
        </InfoCard>
        <InfoCard title="Academic Performance" darkMode={darkMode}>
          <p>Avg Attendance: {stats.avgAttendance}%</p>
          <p>Students with Backlogs: {stats.studentsWithBacklogs}</p>
        </InfoCard>
        <InfoCard title="Experience Metrics" darkMode={darkMode}>
          <p>Avg Projects: {stats.avgProjects}</p>
          <p>Avg Internships: {stats.avgInternships}</p>
        </InfoCard>
        <InfoCard title="Salary Insights" darkMode={darkMode}>
          <p>Highest: ₹{stats.highestSalary}L</p>
          <p>Lowest: ₹{stats.lowestSalary}L</p>
        </InfoCard>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color, darkMode }) {
  return (
    <div style={{
      background: darkMode ? "#2c2c2c" : theme.beigeDark,
      padding: 20,
      borderRadius: 12,
      boxShadow: theme.shadow,
      display: "flex",
      alignItems: "center",
      gap: 16,
      transition: "transform 0.2s",
      cursor: "pointer"
    }}
    onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
    onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      <div style={{ 
        background: color, 
        color: "white", 
        padding: 12, 
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {icon}
      </div>
      <div>
        <p style={{ margin: 0, fontSize: 12, opacity: 0.8 }}>{title}</p>
        <h2 style={{ margin: "4px 0 0 0", fontSize: 24 }}>{value}</h2>
      </div>
    </div>
  );
}

function ChartCard({ title, children, darkMode }) {
  return (
    <div style={{
      background: darkMode ? "#2c2c2c" : "white",
      padding: 20,
      borderRadius: 12,
      boxShadow: theme.shadow
    }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      {children}
    </div>
  );
}

function InfoCard({ title, children, darkMode }) {
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

/* ===================== CONTROLS ===================== */
function Controls({ 
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

/* ===================== STUDENT TABLE ===================== */
function StudentTable({ 
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

/* ===================== STUDENT GRID VIEW ===================== */
function StudentGrid({ students, onEdit, onDelete, onView, darkMode }) {
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

/* ===================== KANBAN VIEW ===================== */
function KanbanView({ students, onEdit, darkMode }) {
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

/* ===================== STUDENT FORM ===================== */
function StudentForm({ student, onSubmit, darkMode }) {
  const [form, setForm] = useState(student || {
    name: "", branch: "CSE", cgpa: "", year: 2025, email: "", phone: "", address: "",
    dob: "", skills: [], internships: 0, projects: 0, certifications: [], interviews: 0,
    bio: "", linkedin: "", github: "", portfolio: "", preferredLocation: "Bangalore",
    expectedSalary: "", attendance: 90, backlogs: 0, extraCurricular: [], achievements: [],
    gender: "Male", category: "General", placed: false, company: "", salary: 0, offers: 0,
    placementStatus: "Registered", offerLetterDate: "", joiningDate: "", interviewRounds: 0,
    technicalScore: 0, hrScore: 0, aptitudeScore: 0, communicationScore: 0, overallScore: 0,
    mentorAssigned: "", notes: ""
  });

  const [currentSkill, setCurrentSkill] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.cgpa) {
      alert("Please fill all required fields");
      return;
    }
    onSubmit({
      ...form,
      cgpa: Number(form.cgpa),
      year: Number(form.year),
      salary: Number(form.salary) || 0,
      offers: Number(form.offers) || 0,
      internships: Number(form.internships) || 0,
      projects: Number(form.projects) || 0,
      interviews: Number(form.interviews) || 0,
      attendance: Number(form.attendance) || 90,
      backlogs: Number(form.backlogs) || 0,
      expectedSalary: Number(form.expectedSalary) || 0,
      interviewRounds: Number(form.interviewRounds) || 0,
      technicalScore: Number(form.technicalScore) || 0,
      hrScore: Number(form.hrScore) || 0,
      aptitudeScore: Number(form.aptitudeScore) || 0,
      communicationScore: Number(form.communicationScore) || 0,
      overallScore: Number(form.overallScore) || 0,
    });
  };

  const addSkill = () => {
    if (currentSkill && !form.skills.includes(currentSkill)) {
      setForm({ ...form, skills: [...form.skills, currentSkill] });
      setCurrentSkill("");
    }
  };

  const removeSkill = (skill) => {
    setForm({ ...form, skills: form.skills.filter(s => s !== skill) });
  };

  const formStyle = {
    background: darkMode ? "#2c2c2c" : "white",
    padding: 32,
    borderRadius: 12,
    maxWidth: 800,
    maxHeight: "80vh",
    overflowY: "auto"
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ marginTop: 0 }}>{student ? "Edit Student" : "Add New Student"}</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Name *</label>
          <input
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
            required
          />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Email *</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
            required
          />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Phone</label>
          <input
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
          />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Branch *</label>
          <select
            value={form.branch}
            onChange={e => setForm({ ...form, branch: e.target.value })}
            style={selectStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
            required
          >
            {branches.filter(b => b !== "All").map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>CGPA *</label>
          <input
            type="number"
            step="0.01"
            value={form.cgpa}
            onChange={e => setForm({ ...form, cgpa: e.target.value })}
            style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
            required
          />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Year</label>
          <select
            value={form.year}
            onChange={e => setForm({ ...form, year: e.target.value })}
            style={selectStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
          >
            <option>2024</option>
            <option>2025</option>
            <option>2026</option>
          </select>
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Gender</label>
          <select
            value={form.gender}
            onChange={e => setForm({ ...form, gender: e.target.value })}
            style={selectStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
          >
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Date of Birth</label>
          <input
            type="date"
            value={form.dob}
            onChange={e => setForm({ ...form, dob: e.target.value })}
            style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
          />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Address</label>
          <input
            value={form.address}
            onChange={e => setForm({ ...form, address: e.target.value })}
            style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
          />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Category</label>
          <select
            value={form.category}
            onChange={e => setForm({ ...form, category: e.target.value })}
            style={selectStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
          >
            <option>General</option>
            <option>OBC</option>
            <option>SC</option>
            <option>ST</option>
          </select>
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Attendance %</label>
          <input
            type="number"
            value={form.attendance}
            onChange={e => setForm({ ...form, attendance: e.target.value })}
            style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
          />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Backlogs</label>
          <input
            type="number"
            value={form.backlogs}
            onChange={e => setForm({ ...form, backlogs: e.target.value })}
            style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
          />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Internships</label>
          <input
            type="number"
            value={form.internships}
            onChange={e => setForm({ ...form, internships: e.target.value })}
            style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
          />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Projects</label>
          <input
            type="number"
            value={form.projects}
            onChange={e => setForm({ ...form, projects: e.target.value })}
            style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
          />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Interviews Attended</label>
          <input
            type="number"
            value={form.interviews}
            onChange={e => setForm({ ...form, interviews: e.target.value })}
            style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
          />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Preferred Location</label>
          <select
            value={form.preferredLocation}
            onChange={e => setForm({ ...form, preferredLocation: e.target.value })}
            style={selectStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
          >
            {locations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Expected Salary (LPA)</label>
          <input
            type="number"
            value={form.expectedSalary}
            onChange={e => setForm({ ...form, expectedSalary: e.target.value })}
            style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
          />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Placement Status</label>
          <select
            value={form.placementStatus}
            onChange={e => setForm({ ...form, placementStatus: e.target.value })}
            style={selectStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
          >
            <option>Registered</option>
            <option>In Progress</option>
            <option>Placed</option>
            <option>Not Interested</option>
          </select>
        </div>
        
        <div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 28 }}>
            <input
              type="checkbox"
              checked={form.placed}
              onChange={e => setForm({ ...form, placed: e.target.checked })}
            />
            <span style={{ fontSize: 14, fontWeight: "600" }}>Placed</span>
          </label>
        </div>
        
        {form.placed && (
          <>
            <div>
              <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Company</label>
              <select
                value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })}
                style={selectStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
              >
                <option value="">Select Company</option>
                {companies.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            
            <div>
              <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Salary (LPA)</label>
              <input
                type="number"
                value={form.salary}
                onChange={e => setForm({ ...form, salary: e.target.value })}
                style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
              />
            </div>
            
            <div>
              <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Number of Offers</label>
              <input
                type="number"
                value={form.offers}
                onChange={e => setForm({ ...form, offers: e.target.value })}
                style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
              />
            </div>
            
            <div>
              <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Offer Letter Date</label>
              <input
                type="date"
                value={form.offerLetterDate}
                onChange={e => setForm({ ...form, offerLetterDate: e.target.value })}
                style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
              />
            </div>
            
            <div>
              <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Joining Date</label>
              <input
                type="date"
                value={form.joiningDate}
                onChange={e => setForm({ ...form, joiningDate: e.target.value })}
                style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
              />
            </div>
            
            <div>
              <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Interview Rounds</label>
              <input
                type="number"
                value={form.interviewRounds}
                onChange={e => setForm({ ...form, interviewRounds: e.target.value })}
                style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
              />
            </div>
          </>
        )}
        
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Skills</label>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input
              value={currentSkill}
              onChange={e => setCurrentSkill(e.target.value)}
              placeholder="Add a skill"
              style={{ ...inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight), flex: 1 }}
              onKeyPress={e => e.key === "Enter" && (e.preventDefault(), addSkill())}
            />
            <button type="button" onClick={addSkill} style={buttonStyle(theme.success, "white")}>
              Add
            </button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {form.skills.map(skill => (
              <span
                key={skill}
                style={{
                  background: theme.maroon,
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: 16,
                  fontSize: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 8
                }}
              >
                {skill}
                <XCircle size={14} style={{ cursor: "pointer" }} onClick={() => removeSkill(skill)} />
              </span>
            ))}
          </div>
        </div>
        
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Bio</label>
          <textarea
            value={form.bio}
            onChange={e => setForm({ ...form, bio: e.target.value })}
            style={{ ...inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight), minHeight: 80, fontFamily: "inherit" }}
          />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>LinkedIn</label>
          <input
            value={form.linkedin}
            onChange={e => setForm({ ...form, linkedin: e.target.value })}
            style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
            placeholder="linkedin.com/in/username"
          />
        </div>
        
        <div>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>GitHub</label>
          <input
            value={form.github}
            onChange={e => setForm({ ...form, github: e.target.value })}
            style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
            placeholder="github.com/username"
          />
        </div>
        
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Portfolio</label>
          <input
            value={form.portfolio}
            onChange={e => setForm({ ...form, portfolio: e.target.value })}
            style={inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight)}
            placeholder="yourwebsite.com"
          />
        </div>
        
        <div style={{ gridColumn: "1 / -1" }}>
          <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: "600" }}>Notes</label>
          <textarea
            value={form.notes}
            onChange={e => setForm({ ...form, notes: e.target.value })}
            style={{ ...inputStyle(darkMode ? "#3c3c3c" : theme.beigeLight), minHeight: 60, fontFamily: "inherit" }}
          />
        </div>
      </div>
      
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <button type="submit" style={{ ...buttonStyle(theme.success, "white"), flex: 1 }}>
          <Save size={16} /> {student ? "Update" : "Add"} Student
        </button>
        <button type="button" onClick={() => window.history.back()} style={{ ...buttonStyle(theme.textLight, "white"), padding: "10px 20px" }}>
          Cancel
        </button>
      </div>
    </form>
  );
}

/* ===================== STUDENT DETAIL VIEW ===================== */
function StudentDetailView({ student, darkMode }) {
  const sectionStyle = {
    background: darkMode ? "#3c3c3c" : theme.beigeLight,
    padding: 20,
    borderRadius: 8,
    marginBottom: 16
  };

  return (
    <div style={{
      background: darkMode ? "#2c2c2c" : "white",
      padding: 32,
      borderRadius: 12,
      maxWidth: 900,
      maxHeight: "85vh",
      overflowY: "auto"
    }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 24 }}>
        <div>
          <h1 style={{ margin: "0 0 8px 0" }}>{student.name}</h1>
          <p style={{ margin: 0, opacity: 0.7 }}>{student.branch} • Batch {student.year}</p>
        </div>
        <span style={{
          background: student.placed ? theme.success : theme.danger,
          color: "white",
          padding: "8px 16px",
          borderRadius: 8,
          fontWeight: "600",
          fontSize: 14
        }}>
          {student.placed ? "✓ PLACED" : "AVAILABLE"}
        </span>
      </div>

      {/* Quick Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        <div style={{ textAlign: "center", padding: 16, background: darkMode ? "#3c3c3c" : theme.beigeDark, borderRadius: 8 }}>
          <div style={{ fontSize: 24, fontWeight: "700", color: theme.maroon }}>{student.cgpa}</div>
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>CGPA</div>
        </div>
        <div style={{ textAlign: "center", padding: 16, background: darkMode ? "#3c3c3c" : theme.beigeDark, borderRadius: 8 }}>
          <div style={{ fontSize: 24, fontWeight: "700", color: theme.success }}>₹{student.salary}L</div>
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>Package</div>
        </div>
        <div style={{ textAlign: "center", padding: 16, background: darkMode ? "#3c3c3c" : theme.beigeDark, borderRadius: 8 }}>
          <div style={{ fontSize: 24, fontWeight: "700", color: theme.info }}>{student.offers}</div>
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>Offers</div>
        </div>
        <div style={{ textAlign: "center", padding: 16, background: darkMode ? "#3c3c3c" : theme.beigeDark, borderRadius: 8 }}>
          <div style={{ fontSize: 24, fontWeight: "700", color: theme.warning }}>{student.attendance}%</div>
          <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>Attendance</div>
        </div>
      </div>

      {/* Contact Information */}
      <div style={sectionStyle}>
        <h3 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <User size={20} /> Personal Information
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px" }}>
          <div><strong>Email:</strong> {student.email}</div>
          <div><strong>Phone:</strong> {student.phone}</div>
          <div><strong>DOB:</strong> {student.dob}</div>
          <div><strong>Gender:</strong> {student.gender}</div>
          <div><strong>Address:</strong> {student.address}</div>
          <div><strong>Category:</strong> {student.category}</div>
        </div>
      </div>

      {/* Placement Details */}
      {student.placed && (
        <div style={sectionStyle}>
          <h3 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 8 }}>
            <Briefcase size={20} /> Placement Details
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px" }}>
            <div><strong>Company:</strong> {student.company}</div>
            <div><strong>Package:</strong> ₹{student.salary} LPA</div>
            <div><strong>Offers:</strong> {student.offers}</div>
            <div><strong>Offer Date:</strong> {student.offerLetterDate}</div>
            <div><strong>Joining Date:</strong> {student.joiningDate}</div>
          <div><strong>Interview Rounds:</strong> {student.interviewRounds}</div>
        </div>
      </div>)}

      {/* Academic Performance */}
      <div style={sectionStyle}>
        <h3 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <BookOpen size={20} /> Academic Performance
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px" }}>
          <div><strong>CGPA:</strong> {student.cgpa}</div>
          <div><strong>Backlogs:</strong> {student.backlogs}</div>
          <div><strong>Attendance:</strong> {student.attendance}%</div>
          <div><strong>Internships:</strong> {student.internships}</div>
          <div><strong>Projects:</strong> {student.projects}</div>
          <div><strong>Interviews Attended:</strong> {student.interviews}</div>
        </div>
      </div>

      {/* Skills & Experience */}
      <div style={sectionStyle}>
        <h3 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <Target size={20} /> Skills & Experience
        </h3>
        <div style={{ marginBottom: 16 }}>
          <strong>Skills:</strong>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {student.skills.map(skill => (
              <span key={skill} style={{
                background: theme.maroon,
                color: "white",
                padding: "4px 12px",
                borderRadius: 16,
                fontSize: 12
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px" }}>
          <div><strong>Preferred Location:</strong> {student.preferredLocation}</div>
          <div><strong>Expected Salary:</strong> ₹{student.expectedSalary} LPA</div>
        </div>
        {student.certifications.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <strong>Certifications:</strong>
            <ul style={{ marginTop: 8 }}>
              {student.certifications.map(cert => <li key={cert}>{cert}</li>)}
            </ul>
          </div>
        )}
        {student.extraCurricular.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <strong>Extra Curricular:</strong>
            <ul style={{ marginTop: 8 }}>
              {student.extraCurricular.map(activity => <li key={activity}>{activity}</li>)}
            </ul>
          </div>
        )}
        {student.achievements.length > 0 && (
          <div style={{ marginTop: 16 }}>
            <strong>Achievements:</strong>
            <ul style={{ marginTop: 8 }}>
              {student.achievements.map(achievement => <li key={achievement}>{achievement}</li>)}
            </ul>
          </div>
        )}
      </div>

      {/* Bio & Links */}
      <div style={sectionStyle}>
        <h3 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 8 }}>
          <MessageSquare size={20} /> Bio & Links
        </h3>
        <p style={{ marginBottom: 16 }}>{student.bio}</p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {student.linkedin && (
            <a href={`https://${student.linkedin}`} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: theme.info }}>
              <Linkedin size={16} /> LinkedIn
            </a>
          )}
          {student.github && (
            <a href={`https://${student.github}`} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: theme.text }}>
              <Github size={16} /> GitHub
            </a>
          )}
          {student.portfolio && (
            <a href={`https://${student.portfolio}`} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, color: theme.maroon }}>
              <Globe size={16} /> Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Notes */}
      {student.notes && (
        <div style={sectionStyle}>
          <h3 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 8 }}>
            <FileText size={20} /> Notes
          </h3>
          <p>{student.notes}</p>
        </div>
      )}

      {/* Scores (if available) */}
      {(student.technicalScore > 0 || student.hrScore > 0 || student.aptitudeScore > 0 || student.communicationScore > 0) && (
        <div style={sectionStyle}>
          <h3 style={{ marginTop: 0, display: "flex", alignItems: "center", gap: 8 }}>
            <Award size={20} /> Interview Scores
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 16 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: "700", color: theme.success }}>{student.technicalScore}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Technical</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: "700", color: theme.info }}>{student.hrScore}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>HR</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: "700", color: theme.warning }}>{student.aptitudeScore}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Aptitude</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: "700", color: theme.maroon }}>{student.communicationScore}</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Communication</div>
            </div>
            <div style={{ textAlign: "center", gridColumn: "1 / -1" }}>
              <div style={{ fontSize: 28, fontWeight: "700", color: theme.success }}>{student.overallScore}</div>
              <div style={{ fontSize: 14, opacity: 0.8 }}>Overall Score</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================== ADVANCED ANALYTICS ===================== */
function AdvancedAnalytics({ students, chartData, stats, darkMode }) {
  const [selectedMetric, setSelectedMetric] = useState("cgpa");
  const [timeRange, setTimeRange] = useState("all");

  const trendData = useMemo(() => {
    const filtered = timeRange === "all" ? students : students.filter(s => s.year === Number(timeRange));
    
    return [
      { name: "Placed", value: filtered.filter(s => s.placed).length },
      { name: "Unplaced", value: filtered.filter(s => !s.placed).length },
    ];
  }, [students, timeRange]);

  const correlationData = useMemo(() => {
    return students.filter(s => s.placed).map(s => ({
      cgpa: s.cgpa,
      salary: s.salary,
      interviews: s.interviews,
      projects: s.projects
    }));
  }, [students]);

  return (
    <div style={{ padding: 32 }}>
      <h2>Advanced Analytics</h2>
      
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <select value={timeRange} onChange={e => setTimeRange(e.target.value)} style={selectStyle(darkMode ? "#2c2c2c" : theme.beigeDark)}>
          <option value="all">All Time</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
        <select value={selectedMetric} onChange={e => setSelectedMetric(e.target.value)} style={selectStyle(darkMode ? "#2c2c2c" : theme.beigeDark)}>
          <option value="cgpa">CGPA</option>
          <option value="salary">Salary</option>
          <option value="interviews">Interviews</option>
          <option value="projects">Projects</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <ChartCard title="Placement Trends" darkMode={darkMode}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke={theme.maroon} strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="CGPA vs Salary Correlation" darkMode={darkMode}>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart data={correlationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cgpa" name="CGPA" />
              <YAxis dataKey="salary" name="Salary (LPA)" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Students" dataKey="salary" fill={theme.success} />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Skill Distribution" darkMode={darkMode}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={Object.entries(
              students.flatMap(s => s.skills).reduce((acc, skill) => {
                acc[skill] = (acc[skill] || 0) + 1;
                return acc;
              }, {})
            ).map(([skill, count]) => ({ skill, count })).sort((a, b) => b.count - a.count).slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="skill" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill={theme.info} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Performance Radar" darkMode={darkMode}>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={[{
              subject: 'Technical',
              A: stats.avgTechnical || 75,
              fullMark: 100,
            }, {
              subject: 'Communication',
              A: stats.avgCommunication || 80,
              fullMark: 100,
            }, {
              subject: 'Aptitude',
              A: stats.avgAptitude || 78,
              fullMark: 100,
            }, {
              subject: 'HR',
              A: stats.avgHR || 82,
              fullMark: 100,
            }]}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Average Scores" dataKey="A" stroke={theme.maroon} fill={theme.maroon} fillOpacity={0.3} />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

/* ===================== REPORTS SECTION ===================== */
function ReportsSection({ students, stats, onExport, darkMode }) {
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

/* ===================== COMPARISON VIEW ===================== */
function ComparisonView({ students, darkMode }) {
  if (students.length === 0) {
    return (
      <div style={{ padding: 32, textAlign: "center" }}>
        <h2>No Students Selected for Comparison</h2>
        <p>Please go back to the Students tab and select students to compare.</p>
      </div>
    );
  }

  const metrics = [
    { key: "cgpa", label: "CGPA", format: (v) => v },
    { key: "salary", label: "Salary (LPA)", format: (v) => `₹${v}` },
    { key: "offers", label: "Offers", format: (v) => v },
    { key: "interviews", label: "Interviews", format: (v) => v },
    { key: "projects", label: "Projects", format: (v) => v },
    { key: "internships", label: "Internships", format: (v) => v },
    { key: "attendance", label: "Attendance %", format: (v) => `${v}%` },
    { key: "backlogs", label: "Backlogs", format: (v) => v },
  ];

  return (
    <div style={{ padding: 32 }}>
      <h2>Student Comparison</h2>
      
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", background: darkMode ? "#2c2c2c" : "white", borderRadius: 12, overflow: "hidden", boxShadow: theme.shadow }}>
          <thead>
            <tr>
              <th style={{ padding: "12px 16px", textAlign: "left", background: darkMode ? "#3c3c3c" : theme.maroonDark, color: "white", fontWeight: "600" }}>Metric</th>
              {students.map(student => (
                <th key={student.id} style={{ padding: "12px 16px", textAlign: "center", background: darkMode ? "#3c3c3c" : theme.maroonDark, color: "white", fontWeight: "600" }}>
                  {student.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {metrics.map(metric => (
              <tr key={metric.key}>
                <td style={{ padding: "12px 16px", borderBottom: `1px solid ${theme.border}`, background: darkMode ? "#3c3c3c" : theme.beigeLight, fontWeight: "600" }}>
                  {metric.label}
                </td>
                {students.map(student => (
                  <td key={student.id} style={{ padding: "12px 16px", textAlign: "center", borderBottom: `1px solid ${theme.border}` }}>
                    {metric.format(student[metric.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Radar Chart Comparison */}
      <div style={{ marginTop: 32 }}>
        <ChartCard title="Performance Comparison" darkMode={darkMode}>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              {students.map((student, index) => (
                <Radar
                  key={student.id}
                  name={student.name}
                  dataKey="value"
                  stroke={index === 0 ? theme.success : index === 1 ? theme.info : theme.warning}
                  fill={index === 0 ? theme.success : index === 1 ? theme.info : theme.warning}
                  fillOpacity={0.1}
                  data={[
                    { subject: 'CGPA', value: student.cgpa * 10 },
                    { subject: 'Technical', value: student.technicalScore },
                    { subject: 'Communication', value: student.communicationScore },
                    { subject: 'Aptitude', value: student.aptitudeScore },
                    { subject: 'HR', value: student.hrScore },
                  ]}
                />
              ))}
              <Legend />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </div>
  );
}

/* ===================== MODAL ===================== */
function Modal({ children, onClose }) {
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      padding: 20
    }}>
      <div style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh", overflow: "auto" }}>
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: theme.danger,
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: 30,
            height: 30,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}

/* ===================== FOOTER ===================== */
function Footer({ darkMode }) {
  return (
    <footer style={{
      background: darkMode ? "#1a1a1a" : theme.maroonDark,
      color: "white",
      padding: "20px 32px",
      textAlign: "center",
      marginTop: "auto"
    }}>
      <p>&copy; 2024 AMRITA Placement Tracker All rights reserved.</p>
      <p>Developed for Amrita Vishwa Vidyapeetham - Academic Year 2024-25</p>
    </footer>
  );
}

/* ===================== UTILITY STYLES ===================== */
const buttonStyle = (bg, color) => ({
  background: bg,
  color,
  border: "none",
  padding: "10px 16px",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 14,
  fontWeight: "500",
  display: "flex",
  alignItems: "center",
  gap: 8,
  transition: "all 0.2s"
});

const inputStyle = (bg) => ({
  width: "100%",
  padding: "10px 12px",
  border: `1px solid ${theme.border}`,
  borderRadius: 6,
  fontSize: 14,
  background: bg
});

const selectStyle = (bg) => ({
  ...inputStyle(bg),
  cursor: "pointer"
});