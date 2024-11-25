import React from "react";
import "./../styles/Team.css";
import hooftly from "../assets/hooftly.png";

function Team() {
  return (
    <section id="team" className="team">
      <h2>Meet the Team</h2>
      <div className="team-members">
        <div className="team-member">
          <img src={hooftly} alt="Matt Hooft" />
          <h3>Matt Hooft</h3>
          <p>Founder/Developer</p>
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/matthew-hooft-54a05798" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://reddit.com/u/hooftly" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-reddit"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
