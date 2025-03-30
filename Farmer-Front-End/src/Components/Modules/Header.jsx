import React, { useContext } from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import { AuthContext } from "../Context/AuthContext"; // ✅ Import Auth Context

const Header = () => {
  const { farmer, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // ✅ Use navigate inside component

  // ✅ Handle Logout & Redirect
  const handleLogout = () => {
    logout();
    navigate("/"); // ✅ Redirect to Home Page after logout
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* ✅ Always Show Home Link */}
        <Navbar.Brand as={Link} to="/">🌱 TerraSense</Navbar.Brand>

        <Nav className="ms-auto">
          {farmer ? (
            <>
              <Button variant="primary" as={Link} to="/farmerdashboard" className="me-2">
                Dashboard
              </Button>
              <Button variant="danger" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <Button variant="success" as={Link} to="/farmerlogin">
              Login
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
