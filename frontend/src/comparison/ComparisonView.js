/* ===================== COMPARISON VIEW ===================== */
export default function ComparisonView({ students, darkMode }) {
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
