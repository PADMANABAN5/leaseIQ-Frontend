import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge
} from "react-bootstrap";
import { ArrowLeft, Building, Plus, CalendarDays, MapPin, DollarSign,TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FloatingSignOut from "../components/FloatingSingout";
import "../styles/unit.css";

const getStatusVariant = (status) => {
  switch (status) {
    case "Active":
      return "success";   // green
    case "Expiring Soon":
      return "warning";   // yellow/orange
    case "Expired":
      return "danger";    // red
    default:
      return "secondary"; // gray
  }
};

const Unit = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* NAVBAR / HEADER */}
      <div className="tenant-navbar">
        <FloatingSignOut />
        <Container fluid>
          {/* Back */}
          <div className="back-link d-flex align-items-center gap-2 mb-3" onClick={() => navigate("/dashboard")}>
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </div>

          {/* Title */}
          <div className="d-flex align-items-center gap-3">
            <div className="tenant-icon">
              <Building size={22} />
            </div>
            <div>
              <div className="tenant-title">Tenant</div>
              <div className="tenant-subtitle">Tenant Dashboard</div>
            </div>
          </div>
        </Container>
      </div>

      {/* PAGE CONTENT */}
      <Container fluid className="unit-page p-4">

        {/* STATS */}
       <Row className="g-4 mb-4">
  {/* TOTAL UNITS */}
  <Col md={3}>
    <Card className="stat-card">
      <Card.Body>
        <div className="stat-header">
          <span>Total Units</span>
          <Building className="stat-icon text-primary" />
        </div>

        <h2>3</h2>
        <small className="text-muted">Occupied units</small>
      </Card.Body>
    </Card>
  </Col>

  {/* TOTAL SQ FT */}
  <Col md={3}>
    <Card className="stat-card">
      <Card.Body>
        <div className="stat-header">
          <span>Total Sq Ft</span>
          <MapPin className="stat-icon text-purple" />
        </div>

        <h2>15,000</h2>
        <small className="text-muted">Square footage</small>
      </Card.Body>
    </Card>
  </Col>

  {/* MONTHLY RENT */}
  <Col md={3}>
    <Card className="stat-card">
      <Card.Body>
        <div className="stat-header">
          <span>Monthly Rent</span>
          <DollarSign className="stat-icon text-success" />
        </div>

        <h2>$45,000</h2>
        <small className="text-muted">Total monthly</small>
      </Card.Body>
    </Card>
  </Col>

  {/* AVG RENT */}
  <Col md={3}>
    <Card className="stat-card">
      <Card.Body>
        <div className="stat-header">
          <span>Avg Rent/Sq Ft</span>
          <TrendingUp className="stat-icon text-info" />
        </div>

        <h2>$3.00</h2>
        <small className="text-muted">Per square foot</small>
      </Card.Body>
    </Card>
  </Col>
</Row>


        {/* UNITS HEADER */}
        <Row className="align-items-center mb-3">
          <Col>
            <h5>Units</h5>
          </Col>
          <Col className="text-end">
            <button className="add-unit-btn">
              <Plus size={16} /> Add Unit
            </button>
          </Col>
        </Row>

        {/* UNIT CARDS */}
        {[
          {
            unit: "Unit 101",
            status: "Active",
            statusType: "success",
            building: "Downtown Plaza",
            address: "123 Main St, Suite 101, New York, NY 10001",
            rent: "$15,000",
            sqft: "5,000 sq ft",
            start: "2023-01-01",
            end: "2025-12-31"
          },
          {
            unit: "Unit 205",
            status: "Expiring Soon",
            statusType: "warning",
            building: "Westside Tower",
            address: "456 Oak Ave, Suite 205, New York, NY 10002",
            rent: "$22,500",
            sqft: "7,500 sq ft",
            start: "2022-06-01",
            end: "2025-05-31"
          },
          {
            unit: "Unit 303",
            status: "Active",
            statusType: "secondary",
            building: "Eastside Center",
            address: "789 Pine Rd, Suite 303, New York, NY 10003",
            rent: "$7,500",
            sqft: "2,500 sq ft",
            start: "2021-03-01",
            end: "2024-02-28"
          }
        ].map((u, i) => (
          <Card key={i} className="unit-card mb-3">
            <Card.Body>
              <Row>
                <Col md={8}>
                  <div className="d-flex align-items-center gap-2">
                    <strong>{u.unit}</strong>
                    <Badge bg={getStatusVariant(u.status)} pill>
                      {u.status}
                    </Badge>
                  </div>
                  <p className="mb-1">{u.building}</p>
                  <small className="text-muted">{u.address}</small>
                </Col>

                <Col md={4} className="text-end">
                  <strong>{u.rent}</strong>
                  <div className="text-muted">{u.sqft}</div>
                </Col>
              </Row>

              <hr />

              <div className="d-flex align-items-center gap-2 text-muted">
                <CalendarDays size={16} />
                <small>
                  Start: {u.start} • End: {u.end}
                </small>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default Unit;
