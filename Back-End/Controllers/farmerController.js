const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Farmer = require("../Models/farmerModel");
require("dotenv").config(); // Load environment variables

// ✅ Get All Farmers
exports.getAllFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find(); // Fetch all farmers
    res.json({ success: true, data: farmers });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Get Farmer by Mobile Number
exports.getFarmerByNumber = async (req, res) => {
  const { number } = req.params;

  try {
    const farmer = await Farmer.findOne({ number: number.trim() });

    if (!farmer) {
      return res.status(404).json({ success: false, message: "Farmer not found" });
    }

    res.status(200).json({ success: true, data: farmer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Register Farmer (Default Payment Status: Pending)
exports.registerFarmer = async (req, res) => {
  console.log("Received Data:", req.body); // Debugging log

  const { name, number, city, address, gmail, landArea, password } = req.body;

  if (!name || !number || !city || !address || !landArea || !password) {
    return res.status(400).json({ success: false, message: "All fields except Gmail are required" });
  }

  try {
    const existingFarmer = await Farmer.findOne({ number });
    if (existingFarmer) {
      return res.status(400).json({ success: false, message: "Farmer already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newFarmer = new Farmer({
      name,
      number,
      city,
      address,
      gmail,
      landArea,
      password: hashedPassword,
      paymentStatus: "Pending", // ✅ Default status
      moisture: 0, pH: 0, temperature: 0, humidity: 0, // ✅ Default values
    });

    await newFarmer.save();
    res.status(201).json({ success: true, message: "Farmer registered successfully", data: newFarmer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Login Farmer
exports.loginFarmer = async (req, res) => {
  const { number, password } = req.body;

  if (!number || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const farmer = await Farmer.findOne({ number });
    if (!farmer) {
      return res.status(400).json({ success: false, message: "Farmer not found" });
    }

    const isMatch = await bcrypt.compare(password, farmer.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: farmer._id, number: farmer.number }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ success: true, token, farmer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Update Payment Status
exports.updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    if (!["Pending", "Completed"].includes(paymentStatus)) {
      return res.status(400).json({ success: false, message: "Invalid payment status" });
    }

    const updatedFarmer = await Farmer.findByIdAndUpdate(
      req.params.id,
      { paymentStatus },
      { new: true }
    );

    if (!updatedFarmer) {
      return res.status(404).json({ success: false, message: "Farmer not found" });
    }

    res.json({ success: true, message: `Payment status updated to ${paymentStatus}`, data: updatedFarmer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Update Real-Time Sensor Data
exports.updateSensorData = async (req, res) => {
  try {
    const { number, moisture, pH, temperature, humidity } = req.body;

    const updatedFarmer = await Farmer.findOneAndUpdate(
      { number },
      { moisture, pH, temperature, humidity },
      { new: true }
    );

    if (!updatedFarmer) {
      return res.status(404).json({ success: false, message: "Farmer not found" });
    }

    res.json({ success: true, message: "Sensor data updated", data: updatedFarmer });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ✅ Get Latest Sensor Data for a Farmer
exports.getSensorData = async (req, res) => {
  try {
    const { number } = req.params;
    const farmer = await Farmer.findOne({ number });

    if (!farmer) {
      return res.status(404).json({ success: false, message: "Farmer not found" });
    }

    res.json({
      success: true,
      data: {
        moisture: farmer.moisture,
        pH: farmer.pH,
        temperature: farmer.temperature,
        humidity: farmer.humidity
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
