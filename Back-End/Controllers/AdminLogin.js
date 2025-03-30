const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../Models/adminLogin"); // Fix incorrect model name

// Admin Registration (Only needed once)
exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({ username }); // Fix: Use correct model
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ success: true, message: "Admin registered successfully" });
  } catch (error) {
    console.error("Error in registerAdmin:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Admin Login
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const admin = await Admin.findOne({ username }); // Fix: Use correct model
    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ success: true, token });
  } catch (error) {
    console.error("Error in loginAdmin:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Protected Admin Dashboard Route
exports.getAdminDashboard = (req, res) => {
  res.json({ success: true, message: "Welcome to Admin Dashboard", admin: req.admin });
};
exports.updateAdminCredentials = async (req, res) => {
  const { username, newPassword } = req.body;
  const adminId = req.admin.id; // Extract admin ID from the token

  try {
    if (!username || !newPassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Admin.findByIdAndUpdate(adminId, { username, password: hashedPassword });

    res.json({ success: true, message: "Admin credentials updated successfully" });
  } catch (error) {
    console.error("Error updating admin credentials:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};