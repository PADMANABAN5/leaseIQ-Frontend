import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { X } from "lucide-react";
import "../styles/addTenant.css";

const AddTenant = ({ onClose }) => {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center add-tenant-page"
    >
      <Card className="add-tenant-card shadow-sm">
        <Card.Body>
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h5 className="mb-1">Add New Tenant</h5>
              <p className="text-muted small mb-0">
                Enter the tenant name to create a new tenant profile.
              </p>
            </div>

            <X
              className="cursor-pointer text-muted"
              onClick={onClose}
            />
          </div>

          {/* FORM */}
          <Form>
            <Form.Group className="mb-4">
              <Form.Label>Tenant Name</Form.Label>
              <Form.Control placeholder="e.g., Acme Corporation" />
            </Form.Group>

            <Button className="w-100 add-tenant-submit">
              Add Tenant
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddTenant;
