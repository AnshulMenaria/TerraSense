import React, { useState, useContext } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { AuthContext } from "../Context/AuthContext";
import API_BASE_URL from "../Context/APIURL";
import "./UpdateCredentials.css";

const UpdateCredentials = () => {
  // eslint-disable-next-line
  const { admin } = useContext(AuthContext); 
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ Handle Update Request
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/admin/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}`, // ✅ Get token from local storage
        },
        body: JSON.stringify({ username, newPassword }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Credentials updated successfully!");
        setError("");
      } else {
        setError(data.message);
        setMessage("");
      }
    } catch (err) {
      setError("Failed to update credentials.");
      setMessage("");
    }
  };

  return (
    <div className="update-credentials-page"> {/* ✅ Full Page Background */}
      <Container className="update-credentials-container"> {/* ✅ Professional Box */}
        <h2 className="update-credentials-title">Update Admin Credentials</h2>

        {/* ✅ Success & Error Messages */}
        {message && <Alert variant="success" className="update-credentials-message">{message}</Alert>}
        {error && <Alert variant="danger" className="update-credentials-message">{error}</Alert>}

        {/* ✅ Form for Updating Credentials */}
        <Form onSubmit={handleUpdate} className="update-credentials-form">
          <Form.Group className="mb-3">
            <Form.Label>New Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="update-credentials-input"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="update-credentials-input"
              required
            />
          </Form.Group>

          <Button type="submit" className="update-credentials-button">
            Update Credentials
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default UpdateCredentials;
