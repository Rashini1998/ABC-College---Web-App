import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, FloatingLabel, Alert } from "react-bootstrap";
import "../CSS/Login.css";

const Login = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleLogin();

    const response = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      navigate("/home"); // Redirect to home page
    } else {
      setShowAlert(true);
    }
  };

  return (
    <>
      <div className="login-container">
        <h1 className="page-heading">ABC College</h1>
        <div className={`login-form ${showAlert ? "wide-form" : ""}`}>
          {showAlert && (
            <Alert
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              Invalid username or password
            </Alert>
          )}
          <Form onSubmit={handleSubmit}>
            <FloatingLabel
              controlId="floatingInput"
              label="Username"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FloatingLabel>
            <Button variant="primary" type="submit" className="btn-login">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
