import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "../CSS/Home.css";

const Home = ({ isLoggedIn }) => {
  return (
    <>
      <div className="home-container">
        {isLoggedIn}
        <h1 className="home-heading">Welcome to ABC College!</h1>
        <div className="cards-container">
          <Card className="card text-center" style={{ width: "18rem" }}>
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title className="cardTitle">Add Students</Card.Title>
              <Card.Text className="cardText">
                Click below to add new students.
              </Card.Text>
              <Link to="/addStudent">
                <Button className="btnTxt">Add Students</Button>
              </Link>
            </Card.Body>
          </Card>
          <Card className="card text-center " style={{ width: "18rem" }}>
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title className="cardTitle">View Students</Card.Title>
              <Card.Text className="cardText">
                Click below to view existing students.
              </Card.Text>
              <Link to="/students">
                <Button className="btnTxt">View Students</Button>
              </Link>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Home;
