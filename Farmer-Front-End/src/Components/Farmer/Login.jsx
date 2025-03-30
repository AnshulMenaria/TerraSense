import React, { useState, useContext } from "react";
import { Container, Form, Button, Alert, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import "./Login.css"; // Import updated CSS

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ number: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await login(formData.number, formData.password);
      if (response.success) {
        navigate("/farmerdashboard");
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <Container className="login-container">
        <Card className="login-card shadow-lg">
          <h3 className="text-center">🌱 Farmer Login</h3>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control 
                type="text" 
                name="number" 
                placeholder="Enter mobile number" 
                required 
                value={formData.number} 
                onChange={handleChange} 
                className="login-input-field"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                name="password" 
                placeholder="Enter password" 
                required 
                value={formData.password} 
                onChange={handleChange} 
                className="login-input-field"
              />
            </Form.Group>

            <Button variant="success" type="submit" disabled={loading} className="login-button w-100">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form>

        </Card>
      </Container>
    </div>
  );
};

export default Login;
