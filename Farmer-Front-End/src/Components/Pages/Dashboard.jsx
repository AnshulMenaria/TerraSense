import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Alert, Card } from "react-bootstrap";
import API_BASE_URL from "../Context/API_BASE_URL";
import "./Dashboard.css";

const FarmerDashboard = () => {
  const [farmerData, setFarmerData] = useState(null);
  const [randomData, setRandomData] = useState(null);
  const [farmingTips, setFarmingTips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const farmerNumber = localStorage.getItem("farmerNumber");

  useEffect(() => {
    if (farmerNumber) {
      fetch(`${API_BASE_URL}/farmers/get/${farmerNumber}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setFarmerData(data.data);
          }
        })
        .catch(() => setError("Failed to fetch farmer data"));
    }

    // ✅ Auto-refresh sensor data every 10 seconds
    generateRandomData(); // Initialize on first load
    const interval = setInterval(generateRandomData, 1000);
    return () => clearInterval(interval);
  }, [farmerNumber]);

  useEffect(() => {
    if (randomData) {
      setFarmingTips(generateFarmingTips(randomData)); // ✅ Update tips whenever sensor data updates
    }
  }, [randomData]);

  // ✅ Generate Random Sensor Data
  const generateRandomData = () => {
    const newData = {
      moisture: Math.floor(Math.random() * 80) + 20, // 20% - 100%
      pH: (Math.random() * 4 + 4).toFixed(1), // pH 4 - 8
      temperature: Math.floor(Math.random() * 20) + 20, // 20°C - 40°C
      humidity: Math.floor(Math.random() * 50) + 40, // 40% - 90%
    };
    setRandomData(newData);
  };

  const handlePayment = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/farmers/updatePaymentStatus/${farmerData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: "Completed" }),
      });
      const data = await response.json();
      if (data.success) {
        setFarmerData((prev) => ({ ...prev, paymentStatus: "Completed" }));
      } else {
        setError(data.message);
      }
    } catch {
      setError("Payment update failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Generate Farming Tips
  // ✅ Generate Farming Tips (with Hindi & more variety)
const generateFarmingTips = (data) => {
  if (!data) return [];

  const { moisture, pH, temperature, humidity } = data;
  let tips = [];

  // 🌊 Moisture Tips
  if (moisture < 30) tips.push("💧 Increase irrigation, use drip irrigation for water conservation. (💧 सिंचाई बढ़ाएं, जल संरक्षण के लिए ड्रिप सिंचाई का उपयोग करें।)");
  if (moisture > 70) tips.push("🌱 Reduce watering to avoid root rot and fungal diseases. (🌱 जड़ सड़न और फंगल रोगों से बचने के लिए पानी कम करें।)");
  if (moisture >= 30 && moisture <= 50) tips.push("🌿 Your soil moisture is balanced. Maintain irrigation as per crop needs. (🌿 आपकी मिट्टी की नमी संतुलित है। फसल की आवश्यकताओं के अनुसार सिंचाई बनाए रखें।)");

  // 🧪 Soil pH Tips
  if (pH < 5.5) tips.push("🔬 Add lime to increase soil pH for better nutrient availability. (🔬 पोषक तत्वों की उपलब्धता बढ़ाने के लिए मिट्टी में चूना मिलाएं।)");
  if (pH > 8) tips.push("🧪 Use sulfur or organic compost to lower soil pH. (🧪 मिट्टी का पीएच कम करने के लिए सल्फर या जैविक खाद का उपयोग करें।)");
  if (pH >= 6 && pH <= 7.5) tips.push("✅ Your soil pH is optimal for most crops. (✅ आपकी मिट्टी का pH अधिकतर फसलों के लिए उपयुक्त है।)");

  // ☀️ Temperature Tips
  if (temperature > 35) tips.push("☀️ Use mulch or shade nets to protect crops from heat stress. (☀️ गर्मी से फसलों की रक्षा के लिए मल्च या शेड नेट्स का उपयोग करें।)");
  if (temperature < 20) tips.push("🔥 Consider using greenhouse or plastic covers to retain heat. (🔥 गर्मी बनाए रखने के लिए ग्रीनहाउस या प्लास्टिक कवर का उपयोग करें।)");

  // 💨 Humidity Tips
  if (humidity > 80) tips.push("🌾 Ensure proper drainage to prevent mold and fungal infections. (🌾 फफूंद और फंगल संक्रमण को रोकने के लिए उचित जल निकासी सुनिश्चित करें।)");
  if (humidity < 50) tips.push("💦 Use misting or sprinkler irrigation to maintain humidity for crops. (💦 फसलों के लिए आर्द्रता बनाए रखने के लिए मिस्टिंग या स्प्रिंकलर सिंचाई का उपयोग करें।)");

  // 🏡 General Soil & Crop Tips
  tips.push("🌿 Add organic compost regularly to improve soil fertility. (🌿 मिट्टी की उर्वरता बढ़ाने के लिए नियमित रूप से जैविक खाद डालें।)");
  tips.push("🚜 Rotate crops to prevent soil nutrient depletion. (🚜 मिट्टी में पोषक तत्वों की कमी रोकने के लिए फसल चक्र अपनाएं।)");
  tips.push("🦠 Use biofertilizers to improve soil microbial activity. (🦠 मिट्टी में सूक्ष्मजीवों की गतिविधि बढ़ाने के लिए जैविक उर्वरकों का उपयोग करें।)");
  tips.push("🧑‍🌾 Regularly test soil quality for balanced fertilizer application. (🧑‍🌾 संतुलित उर्वरक अनुप्रयोग के लिए नियमित रूप से मिट्टी की गुणवत्ता जांचें।)");

  // ✅ Ensure at least 6 tips
  while (tips.length < 6) {
    tips.push("🌱 Maintain soil aeration by plowing at regular intervals. (🌱 नियमित रूप से जुताई करके मिट्टी में वायुसंचार बनाए रखें।)");
  }

  return tips;
};


  return (
    <Container className="farmer-dashboard-container">
      <h2 className="farmer-dashboard-title text-white">🚜 Farmer Dashboard</h2>
      {error && <Alert variant="danger">{error}</Alert>}

      {farmerData && farmerData.paymentStatus === "Pending" ? (
        <Card className="farmer-dashboard-card bg-warning text-dark">
          <h4>🔔 Subscription Ended</h4>
          <p>Please renew your subscription to access soil data and farming tips.</p>
          <Button variant="primary" onClick={handlePayment} disabled={loading}>
            {loading ? "Processing..." : "💳 Pay Now"}
          </Button>
        </Card>
      ) : (
        farmerData && (
          <>
            {/* ✅ Actual Soil Data Table */}
            <Card className="farmer-dashboard-card bg-secondary">
              <h4 className="text-light">📊 Soil Data</h4>
              <Table striped bordered hover className="bg-white text-dark">
                <thead>
                  <tr>
                    <th>Moisture</th>
                    <th>pH</th>
                    <th>Temperature</th>
                    <th>Humidity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{farmerData.moisture}%</td>
                    <td>{farmerData.pH}</td>
                    <td>{farmerData.temperature}°C</td>
                    <td>{farmerData.humidity}%</td>
                  </tr>
                </tbody>
              </Table>
              <Button variant="success" onClick={() => setShowTipsModal(true)}>📜 View Farming Tips</Button>
            </Card>

            {/* ✅ Simulated Real-Time Sensor Data Table */}
            <Card className="farmer-dashboard-card bg-info mt-4">
              <h4 className="text-light">⏳ Real-Time Sensor Data</h4>
              <Table striped bordered hover className="bg-white text-dark">
                <thead>
                  <tr>
                    <th>Moisture</th>
                    <th>pH</th>
                    <th>Temperature</th>
                    <th>Humidity</th>
                  </tr>
                </thead>
                <tbody>
                  {randomData && (
                    <tr>
                      <td>{randomData.moisture}%</td>
                      <td>{randomData.pH}</td>
                      <td>{randomData.temperature}°C</td>
                      <td>{randomData.humidity}%</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card>
          </>
        )
      )}

      {/* ✅ Farming Tips Modal */}
      <Modal className="farmer-dashboard-modal" show={showTipsModal} onHide={() => setShowTipsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>🌾 Farming Tips</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {farmingTips.length > 0 ? (
              farmingTips.map((tip, index) => <li key={index}>{tip}</li>)
            ) : (
              <li>✅ Your soil conditions are optimal! (आपकी मिट्टी की स्थिति उत्तम है!)</li>
            )}
          </ul>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default FarmerDashboard;
