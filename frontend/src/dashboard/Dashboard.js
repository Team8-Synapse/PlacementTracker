import React from "react";
import StatCard from "./StatCard";
import ChartCard from "./ChartCard";
import InfoCard from "./InfoCard";
import { theme } from "../data/constants";

import {
  Users,
  CheckCircle,
  XCircle,
  Target,
  Award,
  DollarSign,
  TrendingUp,
  Briefcase
} from "lucide-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

export default function Dashboard({ stats, students, chartData, chartType, setChartType, darkMode }) {
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
