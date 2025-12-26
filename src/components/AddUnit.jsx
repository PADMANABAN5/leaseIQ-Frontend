import React, { useEffect, useState } from "react";
import { Card, Form, Button, Modal, Row, Col } from "react-bootstrap";
import { X } from "lucide-react";
import axios from "axios";
import "../styles/addUnit.css";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const AddUnit = ({ show, onClose }) => {
  const token = sessionStorage.getItem("token");

  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);

  const [useExistingProperty, setUseExistingProperty] = useState(true);
  const [useExistingTenant, setUseExistingTenant] = useState(false);

  const [form, setForm] = useState({
    property_id: "",
    property_name: "",
    address: "",
    tenant_id: "",
    tenant_name: "",
    unit_number: "",
    square_ft: "",
    monthly_rent: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      fetchProperties();
      fetchTenants();
    }
  }, [show]);

  const fetchProperties = async () => {
    const res = await axios.get(`${BASE_URL}/api/properties`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProperties(res.data.data || []);
  };

  const fetchTenants = async () => {
    const res = await axios.get(`${BASE_URL}/api/tenants`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTenants(res.data.data || []);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const buildPayload = () => {
    const payload = {
      unit_number: form.unit_number,
      square_ft: form.square_ft,
      monthly_rent: form.monthly_rent,
    };

    useExistingProperty
      ? (payload.property_id = form.property_id)
      : ((payload.property_name = form.property_name),
        (payload.address = form.address));

    useExistingTenant
      ? (payload.tenant_id = form.tenant_id)
      : (payload.tenant_name = form.tenant_name);

    return payload;
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await axios.post(`${BASE_URL}/api/units/with-lease`, buildPayload(), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Unit and lease created successfully");
      onClose();
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
     <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add New Unit</Modal.Title>
      </Modal.Header>

      <Modal.Body>
  <Form>

    {/* CHECKBOX ROW */}
    <Row className="mb-3">
      <Col md={6}>
        <Form.Check
          type="checkbox"
          label="Use Existing Property"
          checked={useExistingProperty}
          onChange={(e) => setUseExistingProperty(e.target.checked)}
        />
      </Col>
      <Col md={6}>
        <Form.Check
          type="checkbox"
          label="Use Existing Tenant"
          checked={useExistingTenant}
          onChange={(e) => setUseExistingTenant(e.target.checked)}
        />
      </Col>
    </Row>

    <Row>
      {/* PROPERTY COLUMN */}
      <Col md={6}>
        <h6 className="mb-2">Property</h6>

        {useExistingProperty ? (
          <Form.Group className="mb-3">
            <Form.Label>Select Property</Form.Label>
            <Form.Select name="property_id" onChange={handleChange}>
              <option value="">Select</option>
              {properties.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.property_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        ) : (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Property Name</Form.Label>
              <Form.Control
                name="property_name"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                onChange={handleChange}
              />
            </Form.Group>
          </>
        )}
      </Col>

      {/* TENANT COLUMN */}
      <Col md={6}>
        <h6 className="mb-2">Tenant</h6>

        {useExistingTenant ? (
          <Form.Group className="mb-3">
            <Form.Label>Select Tenant</Form.Label>
            <Form.Select name="tenant_id" onChange={handleChange}>
              <option value="">Select</option>
              {tenants.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.tenant_name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        ) : (
          <Form.Group className="mb-3">
            <Form.Label>Tenant Name</Form.Label>
            <Form.Control
              name="tenant_name"
              onChange={handleChange}
            />
          </Form.Group>
        )}
      </Col>
    </Row>

    <hr />

    {/* UNIT DETAILS – FULL WIDTH */}
    <Row>
      <Col md={4}>
        <Form.Group className="mb-3">
          <Form.Label>Unit Number</Form.Label>
          <Form.Control
            name="unit_number"
            onChange={handleChange}
          />
        </Form.Group>
      </Col>

      <Col md={4}>
        <Form.Group className="mb-3">
          <Form.Label>Square Feet</Form.Label>
          <Form.Control
            name="square_ft"
            onChange={handleChange}
          />
        </Form.Group>
      </Col>

      <Col md={4}>
        <Form.Group className="mb-3">
          <Form.Label>Monthly Rent</Form.Label>
          <Form.Control
            name="monthly_rent"
            onChange={handleChange}
          />
        </Form.Group>
      </Col>
    </Row>

  </Form>
</Modal.Body>


      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Creating..." : "Add Unit"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUnit;
