import React from "react";
import "./../styles/Mission.css";

function Mission() {
  return (
    <section id="mission" className="mission">
      <h2>Our Mission</h2>
      <p className="mission-intro">
        We strive to empower users with predictable and verifiable yields while providing a worry-free lending and borrowing experience. Set it and forget it!
      </p>
      <div className="mission-values">
        <div className="mission-card">
          <div className="icon">
            <i className="fas fa-shield-alt"></i>
          </div>
          <h3>Simplicity</h3>
          <p>Our contracts are designed with simplicty in mind. Complexity isn't bad but by keeping it simple we allow for verifiable rewards and fees while
            lowering risks for users.
          </p>
        </div>
        <div className="mission-card">
          <div className="icon">
            <i className="fas fa-balance-scale"></i>
          </div>
          <h3>Transparency</h3>
          <p>Clear, verifiable processes for lending, borrowin and staking.  It should not take a computer scientist to understand how things work.</p>
        </div>
        <div className="mission-card">
          <div className="icon">
            <i className="fas fa-chart-line"></i>
          </div>
          <h3>Yield</h3>
          <p>Helping users create sustainable, stable yield. We want users to be able to set it and forget it. No impermanent loss or constantly monitoring
            positions.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Mission;
