import React, { useCallback, useEffect, useState } from "react";
import { Form, Button, Modal, Row, Col } from "react-bootstrap";
import api from "../service/api";
import "../styles/addUnit.css";
import { showError, showSuccess } from "../service/toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AddToportfolio({ show, onClose, onSuccess }) {
  const token = sessionStorage.getItem("token");
  const [properties, setProperties] = useState([]);
  const [tenants, setTenants] = useState([]);

  const [useExistingProperty, setUseExistingProperty] = useState(true);
  const [useExistingTenant, setUseExistingTenant] = useState(false);

  const [tenantId, setTenantId] = useState("");
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(false);
  const leaseDetail = JSON.parse(
    sessionStorage.getItem("quickLeaseAnalysis") || "{}"
  ).leaseDetails || {};
  const [form, setForm] = useState({
    property_id: "",
    property_name: "",
    address: "",
    tenant_name: "",
    unit_number: "",
    square_ft: "",
    monthly_rent: "",
  });

  const [errors, setErrors] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const resetState = useCallback(() => {
    setUseExistingProperty(true);
    setUseExistingTenant(false);
    setTenantId("");
    setDocument(null);
    setErrors({});
    setSubmitAttempted(false);
    setForm({
      property_id: "",
      property_name: "",
      address: "",
      tenant_name: "",
      unit_number: "",
      square_ft: "",
      monthly_rent: "",
    });
  }, []);

  useEffect(() => {
    if (!show) return;

    api.get(`${BASE_URL}/api/properties`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setProperties(res.data.data || []));

    api.get(`${BASE_URL}/api/tenants`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then(res => setTenants(res.data.data || []));
  }, [show, token]);

  useEffect(() => {
    if (!show) resetState();
  }, [show, resetState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const e = {};

    if (useExistingProperty) {
      if (!form.property_id) e.property_id = "Select property";
    } else {
      if (!form.property_name) e.property_name = "Property name required";
    }

    if (useExistingTenant) {
      if (!tenantId) e.tenant_id = "Select tenant";
    } else {
      if (!form.tenant_name) e.tenant_name = "Tenant name required";
    }

    if (!form.unit_number) e.unit_number = "Unit number required";
    if (+form.square_ft <= 0) e.square_ft = "Invalid sqft";
    if (+form.monthly_rent <= 0) e.monthly_rent = "Invalid rent";

    if (!document) e.document = "Upload lease PDF";

    return e;
  };

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async () => {
    setSubmitAttempted(true);
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      showError("Fix highlighted fields");
      return;
    }

    try {
      setLoading(true);

      const analysisForm = new FormData();
      analysisForm.append("assets", document);

      const leaseDetails = leaseDetail;

      const payload = new FormData();

      payload.append("unit_number", form.unit_number);
      payload.append("square_ft", form.square_ft);
      payload.append("monthly_rent", form.monthly_rent);

      if (useExistingTenant) {
        payload.append("tenant_id", tenantId);
      } else {
        payload.append("tenant_name", form.tenant_name);
      }

      if (useExistingProperty) {
        payload.append("property_id", form.property_id);
      } else {
        payload.append("property_name", form.property_name);
        payload.append("address", form.address);
      }

      payload.append("document_type", "main lease");
      payload.append("lease_details", JSON.stringify(leaseDetails));
      payload.append("assets", document);

      await api.post(`${BASE_URL}/api/units/with-lease`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      showSuccess("Portfolio added successfully");
      onSuccess?.();
      onClose();
    } catch (err) {
      showError(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Add To Portfolio</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>

         <Row className="mb-3">
  {/* PROPERTY COLUMN */}
  <Col md={6}>
    <h6>Property</h6>

    <Form.Check
      className="mb-2"
      label="Use Existing Property"
      checked={useExistingProperty}
      onChange={(e) => setUseExistingProperty(e.target.checked)}
    />

    {useExistingProperty ? (
      <Form.Select
        name="property_id"
        value={form.property_id}
        onChange={handleChange}
        isInvalid={submitAttempted && errors.property_id}
      >
        <option value="">Select Property</option>
        {properties.map((p) => (
          <option key={p._id} value={p._id}>
            {p.property_name}
          </option>
        ))}
      </Form.Select>
    ) : (
      <>
        <Form.Control
          className="mb-2"
          name="property_name"
          placeholder="Property name"
          onChange={handleChange}
        />
        <Form.Control
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />
      </>
    )}
  </Col>

  {/* TENANT COLUMN */}
  <Col md={6}>
    <h6>Tenant</h6>

    <Form.Check
      className="mb-2"
      label="Use Existing Tenant"
      checked={useExistingTenant}
      onChange={(e) => {
        setUseExistingTenant(e.target.checked);
        setTenantId("");
        setForm((prev) => ({ ...prev, tenant_name: "" }));
      }}
    />

    {useExistingTenant ? (
      <Form.Select
        value={tenantId}
        onChange={(e) => setTenantId(e.target.value)}
        isInvalid={submitAttempted && errors.tenant_id}
      >
        <option value="">Select Tenant</option>
        {tenants.map((t) => (
          <option key={t._id} value={t._id}>
            {t.tenant_name}
          </option>
        ))}
      </Form.Select>
    ) : (
      <Form.Control
        name="tenant_name"
        placeholder="Tenant name"
        onChange={handleChange}
        value={form.tenant_name}
        isInvalid={submitAttempted && errors.tenant_name}
      />
    )}
  </Col>
</Row>

          {/* UNIT */}
          <Row>
            <Col>
              <Form.Control name="unit_number" placeholder="Unit No" onChange={handleChange} />
            </Col>
            <Col>
              <Form.Control type="number" name="square_ft" placeholder="Sqft" onChange={handleChange} />
            </Col>
            <Col>
              <Form.Control type="number" name="monthly_rent" placeholder="Rent" onChange={handleChange} />
            </Col>
          </Row>

        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Adding..." : "Add Portfolio"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddToportfolio;
