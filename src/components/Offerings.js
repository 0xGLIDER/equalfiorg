import React from "react";
import "./../styles/Offerings.css";

function Offerings() {
  return (
    <section className="offerings">
      <h2>Our Offerings</h2>
      <div className="offerings-content">
        <div className="offering-card">
          <h3>Staking</h3>
          <p>Stake your EqualFi tokens to earn passive rewards.</p>
        </div>
        <div className="offering-card">
          <h3>Borrowing</h3>
          <p>Deposit and Borrow assets with competitive interest rates.</p>
        </div>
      </div>
    </section>
  );
}

export default Offerings;
