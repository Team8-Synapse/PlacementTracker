import React from "react";
import { useAuth } from "./AuthContext";
import Login from "./Login";

export default function AuthGate({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return children;
}
