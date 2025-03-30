import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert, Card, Badge } from "react-bootstrap";
import API_BASE_URL from "../Context/APIURL";

const CompletedSoilReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompletedReports = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/reports`);
        const data = await response.json();

        if (data.success) {
          const completedReports = data.data.filter(
            (report) => report.status === "Completed"
          );
          setReports(completedReports);
        } else {
          setError("Failed to fetch reports.");
        }
      } catch (err) {
        setError("Error fetching reports.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedReports();
  }, []);

  return (
    <Container className="mt-4">
      <Card className="shadow-sm p-4">
        <h2 className="text-center mb-4 text-success">✅ Completed Soil Test Reports</h2>

        {loading && (
          <div className="text-center my-4">
            <Spinner animation="border" variant="success" size="lg" />
            <p className="mt-3">Fetching completed reports...</p>
          </div>
        )}

        {error && <Alert variant="danger">{error}</Alert>}

        {!loading && reports.length === 0 && (
          <Alert variant="info" className="text-center">
            No completed reports found.
          </Alert>
        )}

        {reports.length > 0 && (
          <div className="table-responsive">
            <Table striped bordered hover responsive className="mt-3 text-center">
              <thead className="table-success text-white">
                <tr>
                  <th>#</th>
                  <th>Farmer Name</th>
                  <th>Mobile</th>
                  <th>Moisture</th>
                  <th>pH</th>
                  <th>Temperature</th>
                  <th>Humidity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={report._id}>
                    <td>{index + 1}</td>
                    <td>{report.farmerName}</td>
                    <td>{report.farmerMobile}</td>
                    <td>{report.moisture}</td>
                    <td>{report.pH}</td>
                    <td>{report.temperature}</td>
                    <td>{report.humidity}</td>
                    <td>
                      <Badge bg="success">Completed</Badge>
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

export default CompletedSoilReports;
