import React from "react";
import "./../styles/Mission.css";

function Mission() {
  return (
    <section className="mission">
      <h2>Our Mission</h2>
      <p className="mission-intro">
        We strive to empower users with predictable and verifiable yields while providing a worry-free borrowing experience. Set it and forget it!
      </p>
      <div className="mission-values">
        <div className="mission-card">
          <div className="icon">
            <i className="fas fa-shield-alt"></i>
          </div>
          <h3>Security</h3>
          <p>Your funds are safe with our robust and audited smart contracts.</p>
        </div>
        <div className="mission-card">
          <div className="icon">
            <i className="fas fa-balance-scale"></i>
          </div>
          <h3>Transparency</h3>
          <p>Clear, verifiable processes for lending and staking.</p>
        </div>
        <div className="mission-card">
          <div className="icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <h3>Growth</h3>
          <p>Helping users grow their wealth sustainably.</p>
        </div>
      </div>
      <div className="cta">
        <button className="cta-button">Learn More</button>
      </div>
    </section>
  );
}

export default Mission;
