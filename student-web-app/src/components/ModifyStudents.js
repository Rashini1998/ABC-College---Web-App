import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import "../CSS/ModifyStudents.css";
import NavigationBar from "./NavigationBar";

const ModifyStudent = () => {
  const { id } = useParams(); // Extract student ID from route parameters

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isAlertShown, setIsAlertShown] = useState(false);
  const [formHeight, setFormHeight] = useState("auto");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    // Update form height based on alert visibility
    setFormHeight(isAlertShown ? "500px" : "auto");
  }, [isAlertShown]);
  // Fetch student data based on the extracted ID
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/students/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const data = await response.json();
        if (data && data.data) {
          const { name, email, phone, address } = data.data;
          setName(name || "");
          setEmail(email || "");
          setPhone(phone || "");
          setAddress(address || "");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudent(); // Call fetchStudent function when component mounts
  }, [id]); // Include id in the dependency array to refetch data when id changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if the email field is empty
    if (!email) {
      alert("Email is required");
      return;
    }
    // Check if the phone field is empty
    if (!phone) {
      alert("Phone is required");
      return;
    }
    // Check if the address field is empty
    if (!address) {
      alert("Address is required");
      return;
    }

    const response = await fetch(`http://localhost:3001/api/students/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, email, phone, address }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (data.success) {
      setIsAlertShown(true);
      setShowSuccessAlert(true);
      setTimeout(() => {
        setIsAlertShown(false);
        setShowSuccessAlert(false);
      }, 3000);
      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="updateContainer">
        <div className="updateForm" style={{ height: formHeight }}>
          <Form onSubmit={handleSubmit}>
            <Alert
              variant="success"
              show={showSuccessAlert}
              onClose={() => setShowSuccessAlert(false)}
              dismissible
            >
              Student Updated successfully
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
                <Button type="submit" className="btnModify">
                  Update Student
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ModifyStudent;
