import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./Components/Admin/Admin-Login";
import AdminDashboard from "./Components/Admin/Dashboard";
import ProtectedRoute from "./Components/Context/ProtectedRoute";
import UpdateCredentials from "./Components/Admin/UpdateCredentials";
import TotalUsers from "./Components/Pages/TotalUser";
import PendingPayments from "./Components/Pages/PendingPaymet";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}/>
        <Route path="/updatecredentials" element={<ProtectedRoute><UpdateCredentials /></ProtectedRoute>}/>
        <Route path="/totalusers" element={<ProtectedRoute><TotalUsers /></ProtectedRoute>}/>
        <Route path="/pendingpayment" element={<ProtectedRoute><PendingPayments /></ProtectedRoute>}/>
       
      </Routes>
    </Router>
  );
}

export default App;
