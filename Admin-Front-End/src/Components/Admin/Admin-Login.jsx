import React, { useState, useContext } from "react";
import { Container, Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import "./Admin-Login.css";

const AdminLogin = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const result = await login(username, password);

    if (result.success) {
      navigate("/admindashboard");
    } else {
      setError(result.message);
    }
  };

  return (
    <Container className="smartfarm-admin-container">
      <Card className="smartfarm-admin-card">
        <h3 className="smartfarm-admin-title">Admin Login</h3>
        {error && <Alert variant="danger" className="smartfarm-admin-alert">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3 smartfarm-admin-form-group">
            <Form.Label className="smartfarm-admin-label">Username</Form.Label>
            <Form.Control
              type="text"
              className="smartfarm-admin-input"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3 smartfarm-admin-form-group">
            <Form.Label className="smartfarm-admin-label">Password</Form.Label>
            <Form.Control
              type="password"
              className="smartfarm-admin-input"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit" className="w-100 smartfarm-admin-btn">
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default AdminLogin;
