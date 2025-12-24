/* ===================== STUDENT FORM ===================== */
export default function StudentForm({ student, onSubmit, darkMode }) {
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
