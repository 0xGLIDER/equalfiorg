import React, { useState } from "react";
import "./../styles/Navbar.css";
import brand from "../assets/brand.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={brand} alt="EqualFi Logo" className="logo" />
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`nav-menu ${isOpen ? "show" : ""}`}>
        <li>Offerings</li>
        <li>Tokenomics</li>
        <li>Team</li>
        <li>Mission</li>
      </ul>
    </nav>
  );
}

export default Navbar;
