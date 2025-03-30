import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // ✅ Correct import
import API_BASE_URL from "./API_BASE_URL";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [farmer, setFarmer] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("farmerToken");
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        setFarmer({ token: storedToken, number: decoded.number, name: decoded.name });
      } catch (error) {
        localStorage.removeItem("farmerToken");
      }
    }
  }, []);

  // ✅ Farmer Login
  const login = async (number, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/farmers/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ number, password }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("farmerToken", data.token);
        localStorage.setItem("farmerNumber", number);
        const decoded = jwtDecode(data.token);
        setFarmer({ token: data.token, number: decoded.number, name: decoded.name });
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Login failed" };
    }
  };

  // ✅ Logout Function (No Navigation Here)
  const logout = () => {
    localStorage.removeItem("farmerToken");
    localStorage.removeItem("farmerNumber");
    setFarmer(null);
  };

  return <AuthContext.Provider value={{ farmer, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
