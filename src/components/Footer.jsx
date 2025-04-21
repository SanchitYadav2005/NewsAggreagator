import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {currentYear} News Aggregator. All rights reserved.</p>
        <ul className="footer-links">
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <div className="social-icons">
          <a href="#" className="icon">🔵</a>
          <a href="#" className="icon">🐦</a>
          <a href="#" className="icon">📸</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
