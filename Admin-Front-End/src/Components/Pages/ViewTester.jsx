import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table, Button, Form, Modal } from "react-bootstrap";
import API_BASE_URL from "../Context/APIURL";
import cities from "../Context/Cities";

const TestersCities = () => {
  const [testers, setTesters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentTester, setCurrentTester] = useState({
    name: "",
    city: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [editId, setEditId] = useState(null);

  // ✅ Fetch Testers from Backend
  useEffect(() => {
    fetch(`${API_BASE_URL}/tester/get`)
      .then((res) => res.json())
      .then((data) => setTesters(data.data))
      .catch((err) => console.error("Error fetching testers:", err));
  }, []);

  // ✅ Open Add or Edit Modal
  const handleShow = (type, tester = null) => {
    setModalType(type);
    if (type === "edit" && tester) {
      setCurrentTester({ ...tester, password: "" }); // Reset password field for editing
      setEditId(tester._id);
    } else {
      setCurrentTester({ name: "", city: "", email: "", mobile: "", password: "" });
      setEditId(null);
    }
    setShowModal(true);
  };

  // ✅ Close Modal
  const handleClose = () => setShowModal(false);

  // ✅ Handle Form Submission (Add or Edit)
  const handleSubmit = () => {
    const url = modalType === "add" ? `${API_BASE_URL}/tester/add` : `${API_BASE_URL}/tester/edit/${editId}`;
    const method = modalType === "add" ? "POST" : "PUT";
  
    // Ensure password is included in the request body
    const testerData = {
      name: currentTester.name,
      city: currentTester.city,
      email: currentTester.email,
      mobile: currentTester.mobile,
    };
  
    if (currentTester.password || modalType === "add") { 
      testerData.password = currentTester.password; // Prevent empty password issue
    }
  
    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testerData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTesters((prev) =>
            modalType === "add"
              ? [...prev, data.data]
              : prev.map((tester) => (tester._id === editId ? data.data : tester))
          );
          handleClose();
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.error("Error:", err));
  };
  
  // ✅ Handle Delete Tester
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this tester?")) return;

    fetch(`${API_BASE_URL}/tester/delete/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTesters((prev) => prev.filter((tester) => tester._id !== id));
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  // ✅ Filter Testers Based on Search
  const filteredTesters = testers.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.mobile.includes(searchTerm)
  );

  return (
    <Container className="mt-4">
      {/* Search Bar and Add Tester Button */}
      <Row className="mb-3">
        <Col md={8}>
          <Form.Control
            type="text"
            placeholder="Search by name, city, email, or mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={4} className="text-end">
          <Button variant="primary" onClick={() => handleShow("add")}>+ Add Tester</Button>
        </Col>
      </Row>

      {/* Table */}
      <Table bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Email</th>
            <th>Mobile</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTesters.map((tester) => (
            <tr key={tester._id}>
              <td>{tester.name}</td>
              <td>{tester.city}</td>
              <td>{tester.email}</td>
              <td>{tester.mobile}</td>
              <td className="text-center">
                <Button variant="warning" size="sm" onClick={() => handleShow("edit", tester)}>Edit</Button>{" "}
                <Button variant="danger" size="sm" onClick={() => handleDelete(tester._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add/Edit Tester Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalType === "add" ? "Add Tester" : "Edit Tester"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tester Name</Form.Label>
              <Form.Control type="text" placeholder="Enter tester name" value={currentTester.name}
                onChange={(e) => setCurrentTester({ ...currentTester, name: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Select
                value={currentTester.city}
                onChange={(e) => setCurrentTester({ ...currentTester, city: e.target.value })}
                required
              >
                <option value="">Select City</option>
                {cities.map((city, index) => (
                  <option key={index} value={`${city.name}, ${city.state}`}>
                    {city.name}, {city.state}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" value={currentTester.email}
                onChange={(e) => setCurrentTester({ ...currentTester, email: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="text" placeholder="Enter mobile number" value={currentTester.mobile}
                onChange={(e) => setCurrentTester({ ...currentTester, mobile: e.target.value })} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" value={currentTester.password}
                onChange={(e) => setCurrentTester({ ...currentTester, password: e.target.value })} />
              <Form.Text className="text-muted">{modalType === "edit" ? "(Leave blank to keep current password)" : ""}</Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cancel</Button>
          <Button variant="success" onClick={handleSubmit}>{modalType === "add" ? "Add Tester" : "Save Changes"}</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TestersCities;
