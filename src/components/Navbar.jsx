import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

const Navbar = ({ setCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const menuItems = [
    "general",
    "world",
    "technology",
    "sports",
    "business",
    "entertainment",
  ];

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsOpen(false); // Close mobile menu on larger screens
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">News Aggregator</h1>

        {/* Desktop Menu and Signup Button */}
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
            <button className="signup-btn">Sign Up</button>
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
          <button className="signup-btn mobile-signup-btn">Sign Up</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
