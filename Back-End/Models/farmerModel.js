const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true, unique: true }, // ✅ Mobile Number (Login ID)
  city: { type: String, required: true },
  address: { type: String, required: true },
  gmail: { type: String, required: false },
  landArea: { type: Number, required: true },
  password: { type: String, required: true }, // ✅ Password for authentication
  paymentStatus: { type: String, default: "Pending" }, // ✅ "Pending" → "Completed"
  moisture: { type: Number, default: 0 }, // ✅ Real-time data from IoT
  pH: { type: Number, default: 0 },
  temperature: { type: Number, default: 0 },
  humidity: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Farmer", farmerSchema);
