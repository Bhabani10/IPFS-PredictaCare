import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/logo.png";


const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
        <h1>HumDiseasePredictor</h1>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/add-patient">Add Patient</Link>
        <Link to="/check-disease">Check Disease</Link>
      </div>
    </nav>
  );
};

export default Navbar;
