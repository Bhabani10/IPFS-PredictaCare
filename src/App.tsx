import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddPatient from "./components/AddPatient";
import Body from "./components/Body";
import CheckDisease from "./components/CheckDisease";
import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/add-patient" element={<AddPatient />} />
        <Route path="/check-disease" element={<CheckDisease />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
