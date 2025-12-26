import React from "react";
import {Building2,MapPin,DollarSign,TrendingUp} from "lucide-react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom"
import AddUnit from "../components/AddUnit";
import FloatingSignOut from "./FloatingSingout";
import "../styles/tenantDashboard.css";

const TenantDashboard = () => {
  const navigate = useNavigate();
  const { tenantName } = useParams();
  const [showAddUnit, setShowAddUnit] = React.useState(false);


  // Replace the single hardcoded card with this leases array
  const leases = [
  {
    unit: "Unit 101",
    status: "Active",
    building: "Downtown Plaza",
    address: "123 Main St, Suite 101, New York, NY 10001",
    startDate: "2023-01-01",
    endDate: "2025-12-31",
    rent: "$15,000",
    sqft: "5,000"
  },
  {
    unit: "Unit 205",
    status: "Expiring Soon",
    building: "Westside Tower",
    address: "456 Oak Ave, Suite 205, New York, NY 10002",
    startDate: "2022-06-01",
    endDate: "2025-05-31",
    rent: "$22,500",
    sqft: "7,500"
  },
  {
    unit: "Unit 310",
    status: "Active",
    building: "Metro Center",
    address: "789 Park Blvd, Suite 310, New York, NY 10003",
    startDate: "2024-01-01",
    endDate: "2027-12-31",
    rent: "$7,500",
    sqft: "2,500"
  }
];


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
                  <Building2 size={22} />
                </div>
                <div>
                  <div className="tenant-title">{tenantName}</div>
                  <div className="tenant-subtitle">Tenant Dashboard</div>
                </div>
              </div>
            </Container>
          </div>
    
    <Container fluid className="tenant-dashboard p-4">
      
      

      {/* KPI CARDS */}
      <Row className="mb-4">
        <Col md={3}>
            <Card className="kpi-card">
            <Card.Body className="kpi-body">
                <div className="kpi-header">
                <small>Total Units</small>
                <Building2 size={18} className="kpi-icon purple" />
                </div>
                <h4>3</h4>
                <span className="kpi-sub">Occupied units</span>
            </Card.Body>
            </Card>
        </Col>

        <Col md={3}>
            <Card className="kpi-card">
            <Card.Body className="kpi-body">
                <div className="kpi-header">
                <small>Total Sq Ft</small>
                <MapPin size={18} className="kpi-icon purple" />
                </div>
                <h4>15,000</h4>
                <span className="kpi-sub">Square footage</span>
            </Card.Body>
            </Card>
        </Col>

        <Col md={3}>
            <Card className="kpi-card">
            <Card.Body className="kpi-body">
                <div className="kpi-header">
                <small>Monthly Rent</small>
                <DollarSign size={18} className="kpi-icon green" />
                </div>
                <h4>$45,000</h4>
                <span className="kpi-sub">Total monthly</span>
            </Card.Body>
            </Card>
        </Col>

        <Col md={3}>
            <Card className="kpi-card">
            <Card.Body className="kpi-body">
                <div className="kpi-header">
                <small>Avg Rent / Sq Ft</small>
                <TrendingUp size={18} className="kpi-icon blue" />
                </div>
                <h4>$3.00</h4>
                <span className="kpi-sub">Per square foot</span>
            </Card.Body>
            </Card>
        </Col>
        </Row>


      {/* UNITS HEADER */}
      <div className="units-header d-flex justify-content-between align-items-center mb-3">
        <h5>Units</h5>
        <Button 
            className="add-unit-btn"
            onClick={() => setShowAddUnit(true)}>
          <Plus size={16} /> Add Unit
        </Button>
      </div>

      {/* DYNAMIC UNIT CARDS */}
      
    <div className="leases-list">
    {leases.map((lease, index) => (
        <Card key={index} className="unit-card mb-3">
        <Card.Body className="unit-card-body">

            {/* TOP ROW */}
            <div className="unit-header">
            {/* LEFT COLUMN */}
            <div className="unit-left">
                <div className="unit-title">
                <h6>{lease.unit}</h6>
                <span
                    className={`status-badge ${
                    lease.status === "Active" ? "active" : "expiring"
                    }`}
                >
                    {lease.status}
                </span>
                </div>

                <p className="building">{lease.building}</p>
                <p className="address">{lease.address}</p>
            </div>

        {/* RIGHT COLUMN */}
        <div className="unit-rent text-end">
            <small>Monthly Rent</small>
            <h6>{lease.rent}</h6>
            <span className="sqft">{lease.sqft} sq ft</span>
        </div>
        </div>

        {/* DATES */}
        <div className="unit-dates">
          <span>📅 Start: {lease.startDate}</span>
          <span>•</span>
          <span>📅 End: {lease.endDate}</span>
        </div>

      </Card.Body>
    </Card>
  ))}
</div>
{showAddUnit && (
  <AddUnit onClose={() => setShowAddUnit(false)} />
)}


    </Container>
    </>
    
  );
};

export default TenantDashboard;
