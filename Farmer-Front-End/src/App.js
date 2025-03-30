import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Pages/Home";
import Login from "./Components/Farmer/Login";
import FarmerDashboard from "./Components/Pages/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home />} />
          <Route path="/farmerlogin" element={<Login />} />
          <Route path="/farmerdashboard" element={<FarmerDashboard />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
