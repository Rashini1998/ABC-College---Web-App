import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import "../CSS/AddStudent.css";
import NavigationBar from "./NavigationBar";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [formHeight, setFormHeight] = useState("auto");

  useEffect(() => {
    // Update form height based on alert visibility
    setFormHeight(isAlertShown ? "500px" : "auto");
  }, [isAlertShown]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (!name || !email || !phone || !address) {
      setError("All fields are required");
      setShowErrorAlert(true);
      setIsAlertShown(true);
      return;
    }

    // Validate email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      setShowErrorAlert(true);
      setIsAlertShown(true);
      return;
    }

    // Validate phone number format (10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setError("Phone number should be 10 digits");
      setShowErrorAlert(true);
      setIsAlertShown(true);
      return;
    }

    // Validate name format (no digits)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) {
      setError("Name should not include digits");
      setShowErrorAlert(true);
      setIsAlertShown(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/students", {
        method: "POST",
        body: JSON.stringify({ name, email, phone, address }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add student");
      }

      const data = await response.json();

      if (data.success) {
        // Clear form fields
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        // Show success alert
        setShowSuccessAlert(true);
        setShowErrorAlert(false);
        setIsAlertShown(true);
        setTimeout(() => {
          setIsAlertShown(false);
          setShowSuccessAlert(false);
          setShowErrorAlert(false);
        }, 3000);
      } else {
        // Show error alert
        setError(data.message || "Failed to add student");
        setShowErrorAlert(true);
        setShowSuccessAlert(false);
        setIsAlertShown(true);
        setTimeout(() => {
          setIsAlertShown(false);
          setShowErrorAlert(false);
          setShowSuccessAlert(false);
        }, 3000);
      }
    } catch (error) {
      // Show error alert
      setError(error.message || "Failed to add student");
      setShowErrorAlert(true);
      setShowSuccessAlert(false);
      setIsAlertShown(true);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="addContainer">
        <div className="addForm" style={{ height: formHeight }}>
          <Form onSubmit={handleSubmit}>
            <Alert
              variant="success"
              show={showSuccessAlert}
              onClose={() => setShowSuccessAlert(false)}
              dismissible
            >
              Student added successfully
            </Alert>
            <Alert
              variant="danger"
              show={showErrorAlert}
              onClose={() => setShowErrorAlert(false)}
              dismissible
            >
              {error}
            </Alert>
            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formHorizontalName"
            >
              <Form.Label column sm={2} className="formLabel">
                Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formHorizontalEmail"
            >
              <Form.Label column sm={2} className="formLabel">
                Email
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formHorizontalPhone"
            >
              <Form.Label column sm={2} className="formLabel">
                Phone
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formHorizontalAddress"
            >
              <Form.Label column sm={2} className="formLabel">
                Address
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-4">
              <Col sm={{ span: 10, offset: 1 }}>
                <Button type="submit" className="btnAdd">
                  Add Student
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default AddStudent;
