import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Form, Modal, Table } from "react-bootstrap";
import API_BASE_URL from "../Context/APIURL";
import "./TotalUser.css"; // ✅ Import the new CSS file

const TotalUsers = () => {
  const [farmers, setFarmers] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newFarmer, setNewFarmer] = useState({
    name: "",
    number: "",
    gmail: "",
    city: "",
    address: "",
    landArea: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/farmers/all`);
        const data = await response.json();
        setFarmers(data.data || []);
      } catch (error) {
        console.error("Error fetching farmers:", error);
      }
    };
    fetchFarmers();
  }, []);

  const handleInputChange = (e) => {
    setNewFarmer({ ...newFarmer, [e.target.name]: e.target.value });
  };

  const handleAddFarmer = async () => {
    if (newFarmer.password !== newFarmer.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/farmers/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFarmer),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to add farmer");
      }

      alert("Farmer added successfully!");
      setShowModal(false);
      setNewFarmer({
        name: "",
        number: "",
        gmail: "",
        city: "",
        address: "",
        landArea: "",
        password: "",
        confirmPassword: "",
      });

      setFarmers((prevFarmers) => [...prevFarmers, result.data]);
    } catch (error) {
      console.error("Error adding farmer:", error);
      alert(error.message);
    }
  };

  return (
    <Container className="total-users-container"> {/* ✅ Updated class */}
      <Row className="total-users-search-row"> {/* ✅ Updated class */}
        <Col md={10}>
          <Form.Control
            type="text"
            placeholder="Search Farmer by Name or Number..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="total-users-search-input" // ✅ Corrected className syntax
          />
        </Col>
        <Col md={2}>
          <Button variant="success" onClick={() => setShowModal(true)} className="total-users-add-button">
            Add Farmer
          </Button>
        </Col>
      </Row>

      <Card className="shadow-sm total-users-table-card">
        <Card.Body>
          <Table striped bordered hover className="total-users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Email</th>
                <th>City</th>
                <th>Address</th>
                <th>Land Area</th>
              </tr>
            </thead>
            <tbody>
              {farmers.filter(farmer => 
                farmer.name.toLowerCase().includes(search.toLowerCase()) || 
                farmer.number.includes(search)
              ).map((farmer, index) => (
                <tr key={index} className="total-users-table-row">
                  <td>{farmer.name}</td>
                  <td>{farmer.number}</td>
                  <td>{farmer.gmail || "N/A"}</td>
                  <td>{farmer.city || "N/A"}</td>
                  <td>{farmer.address || "N/A"}</td>
                  <td>{farmer.landArea} acres</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} className="total-users-modal">
        <Modal.Header closeButton>
          <Modal.Title>Add New Farmer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {[
              { label: "Name", name: "name", type: "text" },
              { label: "Number", name: "number", type: "text" },
              { label: "Email", name: "gmail", type: "email" },
              { label: "City", name: "city", type: "text" },
              { label: "Address", name: "address", type: "text" },
              { label: "Land Area (acres)", name: "landArea", type: "number" },
              { label: "Password", name: "password", type: "password" },
              { label: "Confirm Password", name: "confirmPassword", type: "password" },
            ].map((field, idx) => (
              <Form.Group key={idx} className="total-users-form-group">
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type={field.type}
                  name={field.name}
                  value={newFarmer[field.name]}
                  onChange={handleInputChange}
                  className="total-users-input"
                  required
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} className="total-users-modal-button">
            Close
          </Button>
          <Button variant="primary" onClick={handleAddFarmer} className="total-users-modal-button">
            Add Farmer
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TotalUsers;
