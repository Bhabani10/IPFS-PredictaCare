import { useState, useEffect } from "react";
import "../styles/AddPatient.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddPatient: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phoneNo: "",
    symptoms: ["", "", "", "", ""], 
  });
  const [showModal, setShowModal] = useState(false);
  const [patientId, setPatientId] = useState("");
  const navigate = useNavigate();

  const symptomArray = ['back_pain','constipation','abdominal_pain','diarrhoea','mild_fever','yellow_urine',
  'yellowing_of_eyes','acute_liver_failure','fluid_overload','swelling_of_stomach',
  'swelled_lymph_nodes','malaise','blurred_and_distorted_vision','phlegm','throat_irritation',
  'redness_of_eyes','sinus_pressure','runny_nose','congestion','chest_pain','weakness_in_limbs',
  'fast_heart_rate','pain_during_bowel_movements','pain_in_anal_region','bloody_stool',
  'irritation_in_anus','neck_pain','dizziness','cramps','bruising','obesity','swollen_legs',
  'swollen_blood_vessels','puffy_face_and_eyes','enlarged_thyroid','brittle_nails',
  'swollen_extremeties','excessive_hunger','extra_marital_contacts','drying_and_tingling_lips',
  'slurred_speech','knee_pain','hip_joint_pain','muscle_weakness','stiff_neck','swelling_joints',
  'movement_stiffness','spinning_movements','loss_of_balance','unsteadiness',
  'weakness_of_one_body_side','loss_of_smell','bladder_discomfort','foul_smell_of urine',
  'continuous_feel_of_urine','passage_of_gases','internal_itching','toxic_look_(typhos)',
  'depression','irritability','muscle_pain','altered_sensorium','red_spots_over_body','belly_pain',
  'abnormal_menstruation','dischromic _patches','watering_from_eyes','increased_appetite','polyuria','family_history','mucoid_sputum',
  'rusty_sputum','lack_of_concentration','visual_disturbances','receiving_blood_transfusion',
  'receiving_unsterile_injections','coma','stomach_bleeding','distention_of_abdomen',
  'history_of_alcohol_consumption','fluid_overload','blood_in_sputum','prominent_veins_on_calf',
  'palpitations','painful_walking','pus_filled_pimples','blackheads','scurring','skin_peeling',
  'silver_like_dusting','small_dents_in_nails','inflammatory_nails','blister','red_sore_around_nose',
  'yellow_crust_ooze'];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
    if (index !== undefined) {
      const updatedSymptoms = [...formData.symptoms];
      updatedSymptoms[index] = e.target.value;
      setFormData({ ...formData, symptoms: updatedSymptoms });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    const response = await axios.post('http://127.0.0.1:5000/addPatient', { ...formData });
    
    if (response.status === 200) {
      setPatientId(response.data.patientId);
      setShowModal(true);
      setTimeout(() => {
        navigate("/check-disease");
      }, 10000);
    } else {
      alert("Patient add error: " + response.data.message);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Patient</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input type="text" name="name" placeholder="Enter full name" value={formData.name} onChange={handleChange} required />

        <label>Age</label>
        <select name="age" value={formData.age} onChange={handleChange} required>
          <option value="">Select Age</option>
          {Array.from({ length: 100 }, (_, i) => (
            <option key={i} value={i + 1}>{i + 1}</option>
          ))}
        </select>

        <label>Gender</label>
        <div className="gender">
          <input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male
          <input type="radio" name="gender" value="Female" onChange={handleChange} required /> Female
        </div>

        <label>Phone No</label>
        <input type="text" name="phoneNo" placeholder="Phone No" value={formData.phoneNo} onChange={handleChange} required />

        <label>Symptoms</label>
        {formData.symptoms.map((symptom, index) => (
          <select key={index} name={`symptom${index}`} value={symptom} onChange={(e) => handleChange(e, index)} required>
            <option value="">Select a symptom</option>
            {symptomArray.map((symptomOption, i) => (
              <option key={i} value={symptomOption}>{symptomOption.replace("_", " ")}</option>
            ))}
          </select>
        ))}

        <button type="submit">Add Patient</button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Patient Added Successfully!</h3>
            <p>Patient ID: {patientId}</p>
            <p>Redirecting to Check Disease page in 10 seconds...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPatient;
