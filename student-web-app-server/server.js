const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("dotenv").config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

const db = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPassword,
  database: dbName,
  port: dbPort,
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");
});

const serverPort = 3001;
app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}`);
});

//Login functionality
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  //check if the username and password are valid
  if (username == "admin" && password == "pass") {
    res.json({
      success: true,
      message: "Logged in successfully",
    });
  } else {
    res.json({
      success: false,
      message: "Invalid Username or password",
    });
  }
});

// Add Student functionality
app.post("/api/students", (req, res) => {
  const { name, email, phone, address } = req.body;

  const sql =
    "INSERT INTO students (name, email, phone, address) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, phone, address], (err, result) => {
    if (err) {
      console.error("Error adding student:", err);
      return res.status(500).json({
        success: false,
        message: "An error occurred while adding the student.",
      });
    }

    console.log("Student added successfully");
    res.json({
      success: true,
      message: "Student added successfully",
    });
  });
});

//View Student Information functionality
app.get("/api/students", (req, res) => {
  const sql = "SELECT * FROM students";

  db.query(sql, (err, result) => {
    if (err) throw err;

    res.json({
      success: true,
      data: result,
    });
  });
});

//Modify Student Information functionality
app.put("/api/students/:id", (req, res) => {
  const { name, email, phone, address } = req.body;
  const id = req.params.id;

  const sql =
    "UPDATE students SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?";

  db.query(sql, [name, email, phone, address, id], (err, result) => {
    if (err) throw err;

    res.json({
      success: true,
      message: "Student information updated successfully",
    });
  });
});

//Delete Student Information functionality
app.delete("/api/students/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM students WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) throw err;

    res.json({
      success: true,
      message: "Student deleted successfully",
    });
  });
});

// View Student Information by ID functionality
app.get("/api/students/:id", (req, res) => {
  const id = req.params.id; // Extract student ID from request parameters

  const sql = "SELECT * FROM students WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error fetching student data:", err);
      return res.status(500).json({
        success: false,
        message: "An error occurred while fetching student data.",
      });
    }

    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      data: result[0], // Assuming only one student is returned
    });
  });
});
