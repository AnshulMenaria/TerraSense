import React, { createContext, useState, useEffect } from "react";
import API_BASE_URL from "./APIURL";
import { jwtDecode } from "jwt-decode"; // ✅ Corrected import

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedAdminToken = localStorage.getItem("adminToken");

    if (storedAdminToken) {
      try {
        const decoded = jwtDecode(storedAdminToken); // ✅ Fixed function name
        setAdmin({ token: storedAdminToken, username: decoded.username });
      } catch (error) {
        console.error("Invalid token, removing from storage");
        localStorage.removeItem("adminToken");
      }
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        const decoded = jwtDecode(data.token); // ✅ Use named function correctly
        setAdmin({ token: data.token, username: decoded.username });
        return { success: true };
      } else {
        return { success: false, message: "Invalid credentials" };
      }
    } catch (error) {
      return { success: false, message: "Login failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
