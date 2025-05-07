import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/privacy-policy">Privacy Policy</Link>
        <Link to="/terms-of-service">Terms of Service</Link>
        <Link to="/contact-us">Contact Us</Link>
      </div>
      <p>&copy; 2025 HumDiseasePredictor. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
