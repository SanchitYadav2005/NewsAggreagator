import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

const Navbar = ({ setCategory = () => {} }) => {
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

  // Handle screen resize efficiently
  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 768;
      if (mobileView !== isMobile) {
        setIsMobile(mobileView);
        if (!mobileView) setIsOpen(false); // Close mobile menu when switching to desktop
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo">News Aggregator</h1>

        {/* Desktop Menu */}
        {!isMobile && (
          <ul className="menu">
            {menuItems.map((item) => (
              <li
                key={item}
                className="menu-item"
                onClick={() => setCategory(item)}
              >
                {item.toUpperCase()}
              </li>
            ))}
          </ul>
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
            {menuItems.map((item) => (
              <li
                key={item}
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
