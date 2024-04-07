import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { useState, useEffect } from "react";
import AddStudent from "./components/AddStudent";
import ModifyStudent from "./components/ModifyStudents";
import Students from "./components/ViewStudent";
import Login from "./components/Login";
import NavigationBar from "./components/NavigationBar";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggedIn(true);
    console.log("isLoggedIn state:", isLoggedIn);
  };

  useEffect(() => {
    console.log("isLoggedIn state:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <div>
        {isLoggedIn && <NavigationBar />}
        <Routes>
          <Route exact path="/" element={<Login handleLogin={handleLogin} />} />
          <Route path="/home" element={<Home isLoggedIn={isLoggedIn} />} />
          <Route path="/addStudent" element={<AddStudent />} />
          <Route path="/modifyStudents/:id" element={<ModifyStudent />} />
          <Route path="/students" element={<Students />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
