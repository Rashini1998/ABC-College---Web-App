import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import { Link } from "react-router-dom";
import "../CSS/ViewStudent.css";
import NavigationBar from "./NavigationBar";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(8);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/students");
      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }
      const data = await response.json();
      setStudents(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Get current students
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to delete a student
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/students/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete student");
      }
      // Remove the deleted student from the list
      setStudents(students.filter((student) => student.id !== id));
      alert("Student deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete student");
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="page-container">
        <Container>
          <h1 className="text-center mt-4 mb-4 page-heading">Students</h1>
          <Table striped bordered hover className="tableData">
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th style={{ width: "200px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((student) => (
                <tr key={student.id} style={{ textAlign: "center" }}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{student.address}</td>
                  <td style={{ textAlign: "center" }}>
                    <Link to={`/modifyStudents/${student.id}`}>
                      <Button variant="success" className="mr-3 action-btn">
                        Modify
                      </Button>
                    </Link>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(student.id)}
                      className="action-btn"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <div className="pagination-container">
          <Pagination className="justify-content-center ">
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {Array.from(
              { length: Math.ceil(students.length / studentsPerPage) },
              (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
            <Pagination.Next
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(students.length / studentsPerPage)
              }
            />
          </Pagination>
        </div>
      </div>
    </>
  );
};

export default Students;
