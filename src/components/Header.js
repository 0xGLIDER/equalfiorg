import React from "react";
import "./../styles/Header.css";
import logo from "../assets/logo_dark.png"; // Import your logo file

function Header() {
  return (
    <header className="header">
      <div className="header-content pad">
        <img src={logo} alt="EqualFi Logo" className="header-logo" />
        <p className="tagline">Empowering Users with Transparency and Control</p>
        <a href="#mission"><button className="cta-button">Get Started</button></a>
      </div>
    </header>
  );
}

export default Header;
