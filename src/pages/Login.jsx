import React,{ useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const isFormValid = formData.username && formData.password;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      `${BASE_URL}/api/auth/login`,
      {
        email: formData.username,
        password: formData.password
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    localStorage.setItem("token", res.data.token);

    navigate("/landing");
  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};


  return (
    <div className="login-page">
      <div className="login-header">
        <h1 className="logo">LeaseIQ</h1>
        <p className="subtitle">AI-Powered Lease Management Platform</p>
      </div>

      <div className="login-card">
        <h2 className="title">Sign In</h2>

        {error && <p className="error-message">{error}</p>}

        <Form onSubmit={handleLogin}>
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

          {/* <Form.Group className="mb-4">
            <Form.Label>Organization Name</Form.Label>
            <Form.Control
              type="text"
              name="organization"
              placeholder="Enter your organization name"
              value={formData.organization}
              onChange={handleChange}
            />
          </Form.Group> */}

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
