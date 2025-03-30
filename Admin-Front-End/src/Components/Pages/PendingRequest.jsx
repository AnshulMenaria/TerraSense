import React, { useEffect, useState } from "react";
import API_BASE_URL from "../Context/APIURL";
import { Container, Table, Spinner, Card, Badge } from "react-bootstrap";

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/farmer/get`);
      const data = await response.json();
      if (data.success) {
        // ✅ Filter only "Pending" requests
        setRequests(data.data.filter((farmer) => farmer.status === "Pending"));
      }
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-sm p-4">
        <h2 className="text-center mb-4 text-warning">⏳ Pending Soil Test Requests</h2>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="warning" size="lg" />
            <p className="mt-3">Loading Pending Requests...</p>
          </div>
        ) : requests.length === 0 ? (
          <p className="text-center text-muted">No pending requests available.</p>
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover className="text-center">
              <thead className="table-warning">
                <tr>
                  <th>#</th>
                  <th>Farmer Name</th>
                  <th>Mobile Number</th>
                  <th>City</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((farmer, index) => (
                  <tr key={farmer._id}>
                    <td>{index + 1}</td>
                    <td>{farmer.name}</td>
                    <td>{farmer.mobile}</td>
                    <td>{farmer.city}</td>
                    <td>
                      <Badge bg="warning" text="dark">Pending</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </Card>
    </Container>
  );
};

export default PendingRequests;
