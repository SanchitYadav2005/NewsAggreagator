import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ setCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuItems = [
    "general",
    "world",
    "technology",
    "sports",
    "business",
    "entertainment",
  ];

  // Check if user is logged in from localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">News Aggregator</h1>

        {/* Desktop Menu */}
        {!isMobile && (
          <div className="menu-container">
            <ul className="menu">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className="menu-item"
                  onClick={() => setCategory(item)}
                >
                  {item.toUpperCase()}
                </li>
              ))}
            </ul>
            
            {/* ✅ Conditional User Icon or Signup Button */}
            {isLoggedIn ? (
              <Link to="/dashboard">
                <button className="user-btn">
                  <User size={20} />
                </button>
              </Link>
            ) : (
              <Link to="/signup">
                <button className="signup-btn">Sign Up</button>
              </Link>
            )}
          </div>
        )}

        {/* Mobile Menu Toggle */}
        {isMobile && (
          <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobile && isOpen && (
        <div className="mobile-menu">
          <ul>
            {menuItems.map((item, index) => (
              <li
                key={index}
                className="mobile-menu-item"
                onClick={() => {
                  setCategory(item);
                  setIsOpen(false);
                }}
              >
                {item.toUpperCase()}
              </li>
            ))}
          </ul>
          
          {/* ✅ Mobile User Icon or Signup Button */}
          {isLoggedIn ? (
            <Link to="/dashboard">
              <button className="user-btn mobile-signup-btn">
                <User size={20} />
              </button>
            </Link>
          ) : (
            <Link to="/signup">
              <button className="signup-btn mobile-signup-btn">Sign Up</button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
