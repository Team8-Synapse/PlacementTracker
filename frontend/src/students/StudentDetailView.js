/* ===================== STUDENT DETAIL VIEW ===================== */
export default function StudentDetailView({ student, darkMode }) {
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
