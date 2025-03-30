import React, { useEffect, useState } from "react";
import API_BASE_URL from "../Context/APIURL";
import { Container, Table, Spinner, Card, Badge, Button } from "react-bootstrap";
import Swal from "sweetalert2"; // ✅ For confirmation dialogs

const PendingReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingReports();
  }, []);

  const fetchPendingReports = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports`);
      const data = await response.json();
      if (data.success) {
        // ✅ Filter reports with status "Pending"
        setReports(data.data.filter((report) => report.status === "Pending"));
      }
    } catch (error) {
      console.error("Error fetching pending reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsCompleted = async (testId) => {
    // ✅ Show confirmation before updating status
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to mark this report as Completed!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, mark as Completed!",
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetch(`${API_BASE_URL}/soilTest/update-status/${testId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "Completed" }),
        });

        const data = await response.json();
        if (data.success) {
          Swal.fire("Success!", "Report marked as Completed.", "success");
          // ✅ Remove from UI
          setReports(reports.filter((report) => report._id !== testId));
        } else {
          Swal.fire("Error", "Failed to update status.", "error");
        }
      } catch (error) {
        console.error("Error updating report status:", error);
      }
    }
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-sm p-4">
        <h2 className="text-center mb-4 text-danger">🛑 Pending Soil Test Reports</h2>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="danger" size="lg" />
            <p className="mt-3">Loading Pending Reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <p className="text-center text-muted">No pending reports available.</p>
        ) : (
          <div className="table-responsive">
            <Table striped bordered hover className="text-center">
              <thead className="table-danger text-white">
                <tr>
                  <th>#</th>
                  <th>Farmer Name</th>
                  <th>Moisture</th>
                  <th>pH Level</th>
                  <th>Temperature</th>
                  <th>Humidity</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={report._id}>
                    <td>{index + 1}</td>
                    <td>{report.farmerName}</td>
                    <td>{report.moisture}</td>
                    <td>{report.pH}</td>
                    <td>{report.temperature}</td>
                    <td>{report.humidity}</td>
                    <td>
                      <Badge bg="danger">Pending</Badge>
                    </td>
                    <td>
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => markAsCompleted(report._id)}
                      >
                        ✅ Mark as Completed
                      </Button>
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

export default PendingReports;
