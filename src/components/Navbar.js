import React, { useState } from "react";
import "./../styles/Navbar.css";
import brand from "../assets/brand.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false); // Closes the menu when a link is clicked
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="#">
          <img src={brand} alt="EqualFi Logo" className="logo" />
        </a>
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`nav-menu ${isOpen ? "show" : ""}`}>
        <li onClick={closeMenu}>
          <a href="#offerings">Offerings</a>
        </li>
        <li onClick={closeMenu}>
          <a href="#tokenomics">Tokenomics</a>
        </li>
        <li onClick={closeMenu}>
          <a href="#team">Team</a>
        </li>
        <li onClick={closeMenu}>
          <a href="#mission">Mission</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
