import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "./Dashboard.css";

const AdminDashboard = () => {
  return (
    <Container className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Admin Dashboard</h2>
      <Row className="admin-dashboard-row">
        {/* Total Users */}
        <Col md={4}>
          <a href="/totalusers" className="admin-dashboard-link">
            <Card className="shadow-sm text-center p-4 admin-dashboard-tile bg-primary">
              <h4>Total Users</h4>
            </Card>
          </a>
        </Col>

        {/* Payment Pending Farmers */}
        <Col md={4}>
          <a href="/pendingpayment" className="admin-dashboard-link">
            <Card className="shadow-sm text-center p-4 admin-dashboard-tile bg-warning">
              <h4>Payment Pending Farmers</h4>
            </Card>
          </a>
        </Col>

        {/* Update Credentials */}
        <Col md={4}>
          <a href="/updatecredentials" className="admin-dashboard-link">
            <Card className="shadow-sm text-center p-4 admin-dashboard-tile bg-danger">
              <h4>Update Credentials</h4>
            </Card>
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
