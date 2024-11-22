import React from "react";
import "./../styles/Header.css";
import logo from "../assets/logo_dark.png"; // Import your logo file

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <img src={logo} alt="EqualFi Logo" className="header-logo" />
      </div>
    </header>
  );
}

export default Header;
