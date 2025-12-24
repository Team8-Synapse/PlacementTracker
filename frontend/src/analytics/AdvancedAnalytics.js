import React, { useState, useMemo } from "react";
import { theme } from "../data/constants";
import ChartCard from "../dashboard/ChartCard";

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
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

export default function AdvancedAnalytics({ students, chartData, stats, darkMode }) {
  const [metric, setMetric] = useState("salary");

  const processedData = useMemo(() => {
    return students.map(s => ({
      name: s.name,
      salary: s.salary,
      cgpa: s.cgpa,
      internships: s.internships
    }));
  }, [students]);

  const selectStyle = {
    padding: "8px 10px",
    borderRadius: 6,
    border: `1px solid ${theme.border}`,
    background: darkMode ? "#2c2c2c" : "white",
    color: darkMode ? "white" : theme.text
  };

  return (
    <div style={{ padding: 32 }}>
      <div style={{ marginBottom: 20 }}>
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          style={selectStyle}
        >
          <option value="salary">Salary</option>
          <option value="cgpa">CGPA</option>
          <option value="internships">Internships</option>
        </select>
      </div>

      <ChartCard title="Metric Trend" darkMode={darkMode}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={processedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={metric}
              stroke={theme.success}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Skill vs Salary" darkMode={darkMode}>
        <ResponsiveContainer width="100%" height={300}>
          <ScatterChart>
            <CartesianGrid />
            <XAxis dataKey="cgpa" name="CGPA" />
            <YAxis dataKey="salary" name="Salary" />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter data={processedData} fill={theme.maroon} />
          </ScatterChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Internships Impact" darkMode={darkMode}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={processedData}>
            <CartesianGrid />
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Bar dataKey="internships" fill={theme.info} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard title="Overall Profile Radar" darkMode={darkMode}>
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart data={processedData.slice(0, 5)}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar
              name="CGPA"
              dataKey="cgpa"
              stroke={theme.success}
              fill={theme.success}
              fillOpacity={0.6}
            />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}
