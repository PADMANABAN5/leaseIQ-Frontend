import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    organization: "",
  });

  const isFormValid =
    formData.username && formData.password && formData.organization;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-page">
      <div className="login-header">
        <h1 className="logo">LeaseIQ</h1>
        <p className="subtitle">AI-Powered Lease Management Platform</p>
      </div>

      <div className="login-card">
        <h2 className="title">Sign In</h2>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Username/Email</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter your username or email"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Organization Name</Form.Label>
            <Form.Control
              type="text"
              name="organization"
              placeholder="Enter your organization name"
              value={formData.organization}
              onChange={handleChange}
            />
          </Form.Group>

          <Button className="login-btn" type="submit" disabled={!isFormValid}>
            Login
          </Button>
        </Form>
      </div>

      <div className="login-footer">
        <p>
          Need help? Contact <span>support@leaseabstract.com</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
