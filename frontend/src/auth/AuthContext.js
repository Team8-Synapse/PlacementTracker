import React, { createContext, useContext, useState } from "react";

/* ================= AUTH CONTEXT ================= */
const AuthContext = createContext();

/* ================= PROVIDER ================= */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // "admin" | "student"

  const login = ({ email, password }) => {
    // TEMP MOCK LOGIN (replace later with backend)
    if (email === "admin@amrita.edu" && password === "admin123") {
      setUser({ name: "Admin", email });
      setRole("admin");
      return true;
    }

    if (email.endsWith("@student.amrita.edu") && password === "student123") {
      setUser({ name: "Student", email });
      setRole("student");
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/* ================= HOOK ================= */
export function useAuth() {
  return useContext(AuthContext);
}
