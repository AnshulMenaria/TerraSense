const express = require("express");
const { registerAdmin, loginAdmin, getAdminDashboard, updateAdminCredentials } = require("../Controllers/AdminLogin");
const { verifyToken } = require("../MiddleWare/Auth");
const { registerFarmer, loginFarmer, getAllFarmers, getFarmerByNumber, updatePaymentStatus, updateSensorData, getSensorData } = require("../Controllers/farmerController");

const router = express.Router();

// 🔹 Admin Routes
router.post("/admin/register", registerAdmin);
router.post("/admin/login", loginAdmin);
router.get("/admin/dashboard", verifyToken, getAdminDashboard);
router.put("/admin/update", verifyToken, updateAdminCredentials);


// 🔹 Farmer Routes
router.post("/farmers/register", registerFarmer);
router.post("/farmers/login", loginFarmer);
router.get("/farmers/all", getAllFarmers);
router.get("/farmers/get/:number", getFarmerByNumber);
router.put("/farmers/updatePaymentStatus/:id", updatePaymentStatus);

// Sensor Data Management
router.put("/updateSensorData", updateSensorData);
router.get("/getSensorData/:number", getSensorData);



module.exports = router;
