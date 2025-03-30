import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import API_BASE_URL from "../Context/APIURL";
import "./PendingPayment.css"; // ✅ Import the CSS file

const PendingPayments = () => {
  const [farmers, setFarmers] = useState([]);

  // Fetch pending farmers
  useEffect(() => {
    const fetchPendingFarmers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/farmers/all`);
        const data = await response.json();
        if (data.success) {
          setFarmers(data.data.filter(farmer => farmer.paymentStatus === "Pending"));
        }
      } catch (error) {
        console.error("Error fetching farmers:", error);
      }
    };
    fetchPendingFarmers();
  }, []);

  // Mark farmer as paid
  const markAsPaid = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/farmers/updatePaymentStatus/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentStatus: "Completed" }),
      });

      const result = await response.json();
      if (result.success) {
        alert("Payment marked as completed!");
        setFarmers(prevFarmers => prevFarmers.filter(farmer => farmer._id !== id));
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert("Failed to update payment status.");
    }
  };

  return (
    <div className="pending-payments-page"> {/* ✅ Full-page background */}
      <Container className="pending-payments-container"> {/* ✅ Updated class */}
        <Row>
          <Col>
            <h3 className="pending-payments-title">Pending Payments</h3> {/* ✅ Updated class */}
            <Card className="shadow-sm pending-payments-card"> {/* ✅ Updated class */}
              <Card.Body>
                <Table striped bordered hover className="pending-payments-table"> {/* ✅ Updated class */}
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Number</th>
                      <th>City</th>
                      <th>Land Area</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {farmers.length > 0 ? (
                      farmers.map(farmer => (
                        <tr key={farmer._id} className="pending-payments-row"> {/* ✅ Updated class */}
                          <td>{farmer.name}</td>
                          <td>{farmer.number}</td>
                          <td>{farmer.city}</td>
                          <td>{farmer.landArea} acres</td>
                          <td>
                            <Button variant="success" className="pending-payments-button" onClick={() => markAsPaid(farmer._id)}> {/* ✅ Updated class */}
                              Mark as Paid
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="pending-payments-empty">No pending payments</td> {/* ✅ Updated class */}
                      </tr>
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PendingPayments;
