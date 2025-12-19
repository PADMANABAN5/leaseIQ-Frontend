import React from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { X } from "lucide-react";
import "../styles/addUnit.css";

const AddUnit = ({ onClose }) => {

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center add-unit-page"
    >
      <Card className="add-unit-card shadow-sm">
        <Card.Body>
          {/* HEADER */}
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h5 className="mb-1">Add New Unit</h5>
              <p className="text-muted small mb-0">
                Enter the unit details to create a new unit profile.
              </p>
            </div>

            <X
            className="cursor-pointer text-muted"
            onClick={onClose}
            />

          </div>

          {/* FORM */}
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Property Name</Form.Label>
              <Form.Control placeholder="e.g., Main Building" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Unit Number</Form.Label>
              <Form.Control placeholder="e.g., 101" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Square Feet</Form.Label>
              <Form.Control placeholder="e.g., 1500" />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Monthly Rent</Form.Label>
              <Form.Control placeholder="e.g., 4500" />
            </Form.Group>

            <Button className="w-100 add-unit-submit">
              Add Unit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddUnit;
