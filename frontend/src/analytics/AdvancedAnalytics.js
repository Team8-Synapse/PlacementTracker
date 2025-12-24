import React, { useState, useMemo } from "react";
import {
  TrendingUp,
  Target,
  Award,
  Briefcase,
  Users,
  BarChart3,
  Activity,
  Zap,
  Filter,
  Download,
  RefreshCw
} from "lucide-react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Cell
} from "recharts";

/* ===================== THEME ===================== */
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
  purple: "#a855f7",
  pink: "#ec4899",
  text: "#1f2937",
  textLight: "#6b7280",
  border: "#e5e7eb",
  shadow: "0 2px 8px rgba(0,0,0,0.1)"
};

/* ===================== UI HELPERS ===================== */
const Card = ({ children, darkMode }) => (
  <div
    style={{
      background: darkMode ? "#2c2c2c" : "white",
      padding: 24,
      borderRadius: 12,
      boxShadow: theme.shadow,
      border: `1px solid ${darkMode ? "#3b3b3b" : theme.border}`
    }}
  >
    {children}
  </div>
);

const ChartCard = ({ title, icon, children, darkMode }) => (
  <Card darkMode={darkMode}>
    <h3
      style={{
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        gap: 10,
        color: darkMode ? "white" : theme.text
      }}
    >
      {icon}
      {title}
    </h3>
    {children}
  </Card>
);

const StatCard = ({ label, value, icon, color, darkMode }) => (
  <div
    style={{
      padding: 20,
      borderRadius: 12,
      background: darkMode ? "#2c2c2c" : "white",
      border: `1px solid ${darkMode ? "#3b3b3b" : theme.border}`,
      boxShadow: theme.shadow
    }}
  >
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <div style={{ fontSize: 13, color: theme.textLight }}>{label}</div>
        <div style={{ fontSize: 26, fontWeight: 700 }}>{value}</div>
      </div>
      <div style={{ color }}>{icon}</div>
    </div>
  </div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "white", padding: 12, borderRadius: 8 }}>
      <strong>{label}</strong>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }}>
          {p.name}: {p.value}
        </div>
      ))}
    </div>
  );
};

/* ===================== MAIN COMPONENT ===================== */
export default function AdvancedAnalytics({ darkMode }) {
  /* -------- MOCK DATA -------- */
  const students = useMemo(
    () =>
      Array.from({ length: 450 }, (_, i) => ({
        branch: ["CSE", "ECE", "ME", "EEE", "Civil", "IT"][i % 6],
        cgpa: +(6 + Math.random() * 4).toFixed(2),
        salary: Math.random() > 0.2 ? +(3 + Math.random() * 25).toFixed(1) : 0,
        internships: Math.floor(Math.random() * 4),
        placed: Math.random() > 0.2
      })),
    []
  );

  const [branch, setBranch] = useState("all");

  const filtered = branch === "all" ? students : students.filter(s => s.branch === branch);

  /* -------- BRANCH PERFORMANCE -------- */
  const branchPerformance = useMemo(() => {
    const branches = ["CSE", "ECE", "ME", "EEE", "Civil", "IT"];
    return branches.map(b => {
      const data = students.filter(s => s.branch === b);
      const placed = data.filter(s => s.placed);
      return {
        branch: b,
        avgSalary:
          placed.reduce((a, b) => a + b.salary, 0) / placed.length || 0,
        avgCGPA: data.reduce((a, b) => a + b.cgpa, 0) / data.length,
        placementRate: (placed.length / data.length) * 100
      };
    });
  }, [students]);

  /* ===================== UI ===================== */
  return (
    <div style={{ padding: 32 }}>
      <h1 style={{ display: "flex", gap: 12 }}>
        <Activity /> Advanced Analytics
      </h1>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
          gap: 20,
          marginBottom: 30
        }}
      >
        <StatCard
          label="Average Salary"
          value={`₹${(
            filtered.reduce((a, b) => a + b.salary, 0) / filtered.length
          ).toFixed(1)} L`}
          icon={<TrendingUp />}
          color={theme.success}
          darkMode={darkMode}
        />
        <StatCard
          label="Average CGPA"
          value={(
            filtered.reduce((a, b) => a + b.cgpa, 0) / filtered.length
          ).toFixed(2)}
          icon={<Award />}
          color={theme.warning}
          darkMode={darkMode}
        />
        <StatCard
          label="Placement Rate"
          value={`${(
            (filtered.filter(s => s.placed).length / filtered.length) *
            100
          ).toFixed(1)}%`}
          icon={<Target />}
          color={theme.maroon}
          darkMode={darkMode}
        />
      </div>

      {/* BRANCH PERFORMANCE CHART */}
      <ChartCard
        title="Branch-wise Performance"
        icon={<BarChart3 />}
        darkMode={darkMode}
      >
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={branchPerformance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="branch" type="category" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="avgSalary" fill={theme.success} name="Avg Salary (LPA)" />
            <Bar
              dataKey="placementRate"
              fill={theme.info}
              name="Placement Rate (%)"
            />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
