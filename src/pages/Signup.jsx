import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { showError,showSuccess } from "../service/toast";
import "../styles/signup.css";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Signup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name_user: "",
    email: "",
    username: "",
    password: "",
  });

  const isFormValid =
    formData.name_user.trim() &&
    formData.email.trim() &&
    formData.username.trim() &&
    formData.password.trim();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `${BASE_URL}/api/auth/signup`,
        {
          name: formData.name_user,
          email: formData.email,
          username: formData.username,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      showSuccess("Signup successful! Please log in.");
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.message || "Signup failed";
      showError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-header">
        <h1 className="logo">LeaseIQ</h1>
        <p className="subtitle">AI-Powered Lease Management Platform</p>
      </div>

      <div className="signup-card">
        <h2 className="title text-center">Sign Up</h2>

        <Form onSubmit={handleSignup}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name_user"
              placeholder="Enter your name"
              value={formData.name_user}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
  <Form.Label>Password</Form.Label>

  <InputGroup>
    <Form.Control
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="Enter your password"
      value={formData.password}
      onChange={handleChange}
    />

    <InputGroup.Text
      style={{ cursor: "pointer" }}
      onClick={() => setShowPassword(!showPassword)}
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </InputGroup.Text>
  </InputGroup>
</Form.Group>


          <Button
            className="login-btn"
            type="submit"
            disabled={!isFormValid || loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>

          <div className="signup-link mt-3 text-center">
            <p>
              Already have an account?{" "}
              <span
                className="text-primary sign-up"
                onClick={() => navigate("/")}
                style={{ cursor: "pointer" }}
              >
                Sign In
              </span>
            </p>
          </div>
        </Form>
      </div>

      {/* <div className="signup-footer">
        <p>
          Need help? Contact <span>support@leaseabstract.com</span>
        </p>
      </div> */}
    </div>
  );
}

export default Signup;
