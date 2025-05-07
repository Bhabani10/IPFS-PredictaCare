import { Link } from "react-router-dom";
import "../styles/Body.css";

const Body: React.FC = () => {
  return (
    <div className="body-container">
      <h2>Welcome to HumDiseasePredictor</h2>
      <p>Your reliable companion in predicting diseases with ease and accuracy.</p>
      <div className="btn-group">
        <Link to="/add-patient" className="btn">Add Patient</Link>
        <Link to="/check-disease" className="btn">Check Disease</Link>
      </div>
    </div>
  );
};

export default Body;

