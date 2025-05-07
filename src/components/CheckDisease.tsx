import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/CheckDisease.css";
import axios from "axios";

const CheckDisease: React.FC = () => {
  const [patient, setPatient] = useState({
    name: "abcdef",
    age: "31",
    gender: "Male",
    symptoms: ["a", "b", "c", "d", "e", "f"],
    predicted: ["z", "x", "c"],
  });
  const [havePatient, setHavePatient] = useState<boolean>(false);
  const [patientId, setPatientId] = useState<string>("");
  const [showMessage, setShowMessage] = useState<boolean>(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPatientId(e.target.value);
  }

  async function handleSearch() {
    const response = await axios.get(`http://127.0.0.1:5000/searchPatient/${patientId}`);
    if (response.data.status === 200) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setPatient(response.data.patientData);
        setHavePatient(true);
      }, 5000);
    } else {
      alert(`${response.data.message}`);
    }
  }

  if (showMessage) {
    return (
      <div className="success-message">
        <h2>✔ Data Fetch Successful!</h2>
        <p>Fetching patient details... Please wait.</p>
      </div>
    );
  }

  if (!havePatient) {
    return (
      <div id="container">
        <br />
        <label htmlFor="patientId">Patient ID</label>
        <input
          type="text"
          id="inputSearch"
          name="patientId"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={handleChange}
          required
        />
        <button id="searchButton" onClick={handleSearch}>Search</button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="content">
        <div className="patient-details">
          <h2>Patient Details</h2>
          <p><strong>Name:</strong> {patient.name} </p>
          <p><strong>Age:</strong> {patient.age}</p>
          <p><strong>Gender:</strong> {patient.gender}</p>
          <p><strong>Symptom:</strong></p>
          <p>{patient.symptoms[0]}</p>
          <p>{patient.symptoms[1]}</p>
          <p>{patient.symptoms[2]}</p>
          <p>{patient.symptoms[3]}</p>
          <p>{patient.symptoms[4]}</p>
        </div>

        <div className="predicted-disease">
          <h2>Predicted Disease</h2>
          <p>Based on the provided symptoms, the predicted disease is:</p>
          <p><strong>Decision Tree Result:</strong> {patient.predicted[0]}</p>
          <p><strong>Random Forest Result:</strong> {patient.predicted[1]}</p>
          <p><strong>Naive Bayes Result:</strong> {patient.predicted[2]}</p>
        </div>
      </div>

      <div className="buttons">
        <Link to="/" className="back-btn">Back to Home</Link>
        <Link to="/add-patient" className="add-btn">Add Another Patient</Link>
      </div>
    </div>
  );
};

export default CheckDisease;
