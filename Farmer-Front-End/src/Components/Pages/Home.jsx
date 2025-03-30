import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import './Home.css'; 
import herosection from "../../assets/Hero-Section.jpg"

const Home = () => {
  return (
    <Container className="mt-5 bg-light p-5 rounded shadow">
      <h1 className="text-center text-primary mb-4">Welcome to TerraSense</h1>
      <p className="text-center lead text-secondary mb-5">
        The Smart Soil Sensor for Indian Farmers 🌱
      </p>

      {/* ✅ How It Works Section */}
      <Row className="mt-4">
        <Col md={6}>
          <h3 className="text-white">How It Works?</h3>
          <ul className="list-unstyled">
            {[
              "Install the **TerraSense Smart Sensor** in your field.",
              "The sensor collects real-time **soil health & moisture** data.",
              "Data is **sent via SIM** to our AI-powered system.",
              "Farmers receive **WhatsApp alerts** with insights & reports.",
              "Get **personalized crop & fertilizer** recommendations.",
              "Renew your subscription for **₹1499/year** after the first free year."
            ].map((item, index) => (
              <li key={index} className="bg-white p-3 rounded my-2 shadow-sm">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                  <span className="text-dark">✅ {item}</span>
                </motion.div>
              </li>
            ))}
          </ul>
        </Col>
        <Col md={6} className="text-center">
          <motion.img 
            src={herosection}
            alt="TerraSense Sensor"
            className="img-fluid rounded shadow"
            whileHover={{ scale: 1.1 }} 
            transition={{ duration: 0.3 }} 
          />
        </Col>
      </Row>

      {/* ✅ Benefits Section */}
      <Row className="mt-5">
        <Col>
          <h3 className="text-warning">Why Choose TerraSense?</h3>
          <Row>
            {[
              "✅ **Affordable**: Sensor costs only **₹5000** (one-time).",
              "✅ **AI-Powered**: Smart **farming tips & insights** via AI.",
              "✅ **WhatsApp Alerts**: Instant updates on soil health & weather.",
              "✅ **Works Anywhere**: Solar-powered, SIM-enabled, long battery life."
            ].map((benefit, index) => (
              <Col md={6} key={index}>
                <Card className="text-center mb-4 shadow">
                  <Card.Body>
                    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                      <Card.Title className="text-primary">{benefit}</Card.Title>
                    </motion.div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* ✅ Call to Action */}
      <Row className="mt-4 text-center">
        <Col>
          <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
            <Button variant="success" size="lg" className="px-4 py-2 shadow">
              Order Your Sensor Now 🚜
            </Button>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
